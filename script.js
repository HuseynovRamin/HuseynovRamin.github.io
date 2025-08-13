/* ===========================
   script.js — Full final JS
   =========================== */

/* --------- Utilities --------- */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const toFixedSmart = (num, d = 3) => {
  if (typeof num !== 'number' || Number.isNaN(num)) return '0';
  const s = Number(num).toFixed(d);
  return s.replace(/\.?0+$/, '');
};

/* --------- i18n strings --------- */
const I18N = {
  az: {
    title: "Akademik Qiymət Hesablama",
    calcTitle: "📊 KQS və BSQ daxil edin",
    ksq: "📊 KQS qiymətləri (vergüllə ayırın):",
    bsq: "📝 BSQ qiyməti (əgər varsa):",
    scheme: "🎯 Qiymətləndirmə sistemi:",
    result: "Nəticə:",
    history: "📈 Nəticə tarixi",
    exam: "⏳ İmtahana geri sayım",
    azBadge: "🇦🇿 40/60",
    weightNote: "AZ default 40/60 saxlanılıb. Custom seçsən, sürüşdür.",
    needKQS: "Ən azı bir KQS qiyməti daxil edin.",
    saved: "Nəticə yadda saxlandı.",
    cleared: "Tarix təmizləndi.",
    tipHigh: "Möhtəşəm! Sabit performans üçün həftəlik planını qoruyub saxla.",
    tipImproveK: "KQS ortalamanız BSQ-dan aşağıdır: həftəlik test və praktikanı artır.",
    tipImproveB: "BSQ aşağıdır: imtahan strategiyası və sınaq testlərinə fokuslan.",
    countdown: "Geri sayım:",
    days: "gün",
    pdfTitle: "Akademik Hesabat",
    shareText: "Mənim akademik nəticəm:",
    csvHeader: "Tarix,KQS Orta,BSQ,Nəticə,Sxem"
  },
  en: {
    title: "Academic Grade Calculator",
    calcTitle: "📊 Enter KQS and BSQ",
    ksq: "📊 KQS scores (comma-separated):",
    bsq: "📝 BSQ score (if any):",
    scheme: "🎯 Grading scheme:",
    result: "Result:",
    history: "📈 Score history",
    exam: "⏳ Exam countdown",
    azBadge: "🇦🇿 40/60",
    weightNote: "AZ default 40/60 preserved. Choose Custom to adjust.",
    needKQS: "Enter at least one KQS value.",
    saved: "Result saved.",
    cleared: "History cleared.",
    tipHigh: "Excellent! Keep a weekly routine to stay consistent.",
    tipImproveK: "KQS average is lower than BSQ: add drills and practice.",
    tipImproveB: "BSQ is lower: focus on exam strategy and timed mocks.",
    countdown: "Countdown:",
    days: "days",
    pdfTitle: "Academic Report",
    shareText: "My academic result:",
    csvHeader: "Date,KQS Avg,BSQ,Final,Scheme"
  }
};

/* --------- App state & elements --------- */
let currentLang = localStorage.getItem('lang') || 'az';
const darkToggle = $('#darkToggle');

const schemeSelect = $('#schemeSelect');
const customWeights = $('#customWeights');
const kqsWeight = $('#kqsWeight');
const bsqWeight = $('#bsqWeight');
const kqsWeightVal = $('#kqsWeightVal');
const bsqWeightVal = $('#bsqWeightVal');

const ksqInput = $('#ksq');
const bsqInput = $('#bsq');
const btnCalc = $('#btn-calc');
const btnSave = $('#btn-save');
const btnClear = $('#btn-clear');
const btnCSV = $('#btn-csv');
const btnPDF = $('#btn-pdf');
const btnShare = $('#btn-share');

const resultEl = $('#result');
const convertedEl = $('#converted');
const tipsBox = $('#tipsBox');

const yearEl = $('#year');

/* Chart / history */
let history = JSON.parse(localStorage.getItem('history') || '[]');
let chart = null;

/* --------- Helpers: translations & UI --------- */
function applyLang(lang) {
  currentLang = lang;
  const t = I18N[lang] || I18N.az;
  $('#title-text').textContent = t.title;
  $('#calc-title').textContent = t.calcTitle;
  $('#label-ksq').innerHTML = `<strong>${t.ksq}</strong>`;
  $('#label-bsq').innerHTML = `<strong>${t.bsq}</strong>`;
  $('#label-scheme').innerHTML = `<strong>${t.scheme}</strong>`;
  $('#label-result').textContent = t.result;
  $('#history-title').textContent = t.history;
  $('#exam-title').textContent = t.exam;
  $('#az-badge').textContent = t.azBadge;
  $('#weight-note').textContent = t.weightNote;
  localStorage.setItem('lang', lang);
}
$$('.chip[data-lang]').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});
applyLang(currentLang);

/* Footer year */
yearEl.textContent = new Date().getFullYear();

/* Dark mode */
if (localStorage.getItem('dark') === '1') {
  darkToggle.checked = true;
  document.documentElement.classList.add('dark');
}
darkToggle.addEventListener('change', () => {
  document.documentElement.classList.toggle('dark', darkToggle.checked);
  localStorage.setItem('dark', darkToggle.checked ? '1' : '0');
});

/* --------- Weight sliders handling --------- */
function updateWeightLabels() {
  kqsWeightVal.textContent = kqsWeight.value;
  const comp = 100 - Number(kqsWeight.value);
  bsqWeight.value = comp;
  bsqWeightVal.textContent = comp;
}
kqsWeight.addEventListener('input', () => {
  updateWeightLabels();
  if (schemeSelect.value === 'custom') computeAndDisplay();
});
updateWeightLabels();

/* --------- Parsing KQS --------- */
function parseKQS(input) {
  if (!input) return [];
  return input.split(',')
    .map(s => parseFloat(s.trim()))
    .filter(n => !Number.isNaN(n));
}

/* --------- Core Calculations --------- */
function calcAZ(ksqArray, bsq) {
  const kAvg = ksqArray.length ? (ksqArray.reduce((a,b)=>a+b,0) / ksqArray.length) : 0;
  const b = Number.isFinite(bsq) ? bsq : 0;
  const final = kAvg * 0.4 + b * 0.6;
  return { kAvg, final };
}

function calcCustom(ksqArray, bsq, kWeightPercent) {
  const kAvg = ksqArray.length ? (ksqArray.reduce((a,b)=>a+b,0) / ksqArray.length) : 0;
  const b = Number.isFinite(bsq) ? bsq : 0;
  const kw = clamp(Number(kWeightPercent)/100, 0, 1);
  const bw = 1 - kw;
  const final = kAvg * kw + b * bw;
  return { kAvg, final };
}

/* --------- Converters --------- */
function toUSGPA(final) {
  let grade, gpa;
  if (final >= 93) { grade='A'; gpa=4.0; }
  else if (final >= 90) { grade='A-'; gpa=3.7; }
  else if (final >= 87) { grade='B+'; gpa=3.3; }
  else if (final >= 83) { grade='B'; gpa=3.0; }
  else if (final >= 80) { grade='B-'; gpa=2.7; }
  else if (final >= 77) { grade='C+'; gpa=2.3; }
  else if (final >= 73) { grade='C'; gpa=2.0; }
  else if (final >= 70) { grade='C-'; gpa=1.7; }
  else if (final >= 67) { grade='D+'; gpa=1.3; }
  else if (final >= 65) { grade='D'; gpa=1.0; }
  else { grade='F'; gpa=0.0; }
  return { grade, gpa };
}

function toUKClass(final) {
  if (final >= 70) return { percent: final, class: 'First Class (1st)' };
  if (final >= 60) return { percent: final, class: 'Upper Second (2:1)' };
  if (final >= 50) return { percent: final, class: 'Lower Second (2:2)' };
  if (final >= 40) return { percent: final, class: 'Third' };
  return { percent: final, class: 'Fail' };
}

function toECTS(final) {
  if (final >= 90) return { grade: 'A' };
  if (final >= 80) return { grade: 'B' };
  if (final >= 70) return { grade: 'C' };
  if (final >= 60) return { grade: 'D' };
  if (final >= 50) return { grade: 'E' };
  return { grade: 'F' };
}

/* --------- Switch Scheme & Inputs --------- */
function updateInputsByScheme() {
  const scheme = schemeSelect.value;
  if (scheme === 'az' || scheme === 'custom') {
    ksqInput.parentElement.style.display = 'block';
    bsqInput.parentElement.style.display = 'block';
    bsqInput.placeholder = I18N[currentLang].bsq;
  } else {
    ksqInput.parentElement.style.display = 'none';
    bsqInput.parentElement.style.display = 'block';
    bsqInput.placeholder = 'Enter numeric score (0–100)';
  }
  customWeights.classList.toggle('hidden', scheme !== 'custom');
  computeAndDisplay();
}

schemeSelect.addEventListener('change', updateInputsByScheme);
ksqInput.addEventListener('input', computeAndDisplay);
bsqInput.addEventListener('input', computeAndDisplay);

/* --------- Compute & Display --------- */
function showTips(kAvg, bsq, final) {
  const t = I18N[currentLang] || I18N.az;
  if (final >= 90) tipsBox.textContent = t.tipHigh;
  else if (kAvg < bsq) tipsBox.textContent = t.tipImproveK;
  else tipsBox.textContent = t.tipImproveB;
}

function computeAndDisplay() {
  const scheme = schemeSelect.value;
  const t = I18N[currentLang] || I18N.az;
  let finalNum = 0;
  let convertText = '';
  
  const kqs = parseKQS(ksqInput.value || '');
  const bsqVal = parseFloat(bsqInput.value);

  if (scheme === 'az') {
    if (!kqs.length) { resultEl.textContent='—'; convertedEl.textContent=''; tipsBox.textContent=t.needKQS; return; }
    const { kAvg, final } = calcAZ(kqs, bsqVal);
    finalNum = final;
    convertText = `AZ: ${toFixedSmart(finalNum,2)}/100`;
    showTips(kAvg, Number.isFinite(bsqVal)?bsqVal:0, finalNum);
  } else if (scheme === 'custom') {
    if (!kqs.length) { resultEl.textContent='—'; convertedEl.textContent=''; tipsBox.textContent=t.needKQS; return; }
    const { kAvg, final } = calcCustom(kqs, bsqVal, Number(kqsWeight.value));
    finalNum = final;
    convertText = `Custom: ${toFixedSmart(finalNum,2)}/100`;
    showTips(kAvg, Number.isFinite(bsqVal)?bsqVal:0, finalNum);
  } else if (scheme === 'us') {
    if (!Number.isFinite(bsqVal)) { resultEl.textContent='—'; convertedEl.textContent='Enter numeric score'; return; }
    finalNum = bsqVal;
    const u = toUSGPA(finalNum);
    convertText = `US: ${u.grade} / GPA ${u.gpa.toFixed(2)} · ${toFixedSmart(finalNum,2)}/100`;
    tipsBox.textContent = '';
  } else if (scheme === 'uk') {
    if (!Number.isFinite(bsqVal)) { resultEl.textContent='—'; convertedEl.textContent='Enter numeric score'; return; }
    finalNum = bsqVal;
    const uk = toUKClass(finalNum);
    convertText = `UK: ${uk.class} · ${toFixedSmart(uk.percent,2)}%`;
    tipsBox.textContent = '';
  } else if (scheme === 'ects') {
    if (!Number.isFinite(bsqVal)) { resultEl.textContent='—'; convertedEl.textContent='Enter numeric score'; return; }
    finalNum = bsqVal;
    const e = toECTS(finalNum);
    convertText = `ECTS: ${e.grade} · ${toFixedSmart(finalNum,2)}/100`;
    tipsBox.textContent = '';
  }

  resultEl.textContent = toFixedSmart(finalNum,3);
  convertedEl.textContent = convertText;

  return finalNum;
}

/* --------- Chart & history --------- */
function initChart() {
  const canvas = $('#historyChart');
  if (!canvas) return;
  if (window.Chart && !chart) {
    chart = new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: history.map(h => h.date),
        datasets: [{
          label: 'Final',
          data: history.map(h => h.final),
          tension: 0.25,
          borderColor: '#0d6efd',
          backgroundColor: 'rgba(13,110,253,0.15)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { suggestedMin: 0, suggestedMax: 100 } }
      }
    });
  }
}

function updateChart() {
  if (!chart) { initChart(); return; }
  chart.data.labels = history.map(h => h.date);
  chart.data.datasets[0].data = history.map(h => h.final);
  chart.update();
}

/* --------- Buttons: Hesabla, Save, Clear --------- */
btnCalc.addEventListener('click', computeAndDisplay);

btnSave.addEventListener('click', () => {
  const t = I18N[currentLang] || I18N.az;
  const res = computeAndDisplay();
  if (res === null) return;
  const entry = {
    date: new Date().toLocaleString(),
    kAvg: parseFloat(ksqInput.value) || 0,
    bsq: parseFloat(bsqInput.value) || 0,
    final: parseFloat(resultEl.textContent) || 0,
    scheme: schemeSelect.value
  };
  history.push(entry);
  localStorage.setItem('history', JSON.stringify(history));
  updateChart();
  tipsBox.textContent = t.saved;
});

btnClear.addEventListener('click', () => {
  const t = I18N[currentLang] || I18N.az;
  history = [];
  localStorage.removeItem('history');
  updateChart();
  tipsBox.textContent = t.cleared;
});

/* --------- CSV Export --------- */
if (btnCSV) {
  btnCSV.addEventListener('click', () => {
    const t = I18N[currentLang] || I18N.az;
    const header = t.csvHeader;
    const rows = history.map(h => `${h.date},${h.kAvg},${h.bsq},${h.final},${h.scheme}`);
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grades_history.csv';
    a.click();
    URL.revokeObjectURL(url);
  });
}

/* --------- PDF Export --------- */
if (btnPDF) {
  btnPDF.addEventListener('click', async () => {
    const t = I18N[currentLang] || I18N.az;
    if (!window.jspdf || !window.html2canvas) {
      tipsBox.textContent = 'PDF tools not loaded.';
      return;
    }
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      doc.setFontSize(18);
      doc.text(t.pdfTitle, 40, 40);

      const node = document.querySelector('main.container');
      const canvas = await html2canvas(node, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pageWidth = doc.internal.pageSize.getWidth();
      const imgWidth = pageWidth - 80;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      doc.addImage(imgData, 'PNG', 40, 70, imgWidth, imgHeight);
      doc.save('academic_report.pdf');
    } catch (err) {
      console.error(err);
      tipsBox.textContent = 'PDF export failed.';
    }
  });
}

/* --------- Share --------- */
if (btnShare) {
  btnShare.addEventListener('click', async () => {
    const t = I18N[currentLang] || I18N.az;
    const text = `${t.shareText} ${resultEl.textContent} (${convertedEl.textContent})`;
    if (navigator.share) {
      try { await navigator.share({ text }); } catch {}
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        tipsBox.textContent = 'Copied to clipboard.';
      }
