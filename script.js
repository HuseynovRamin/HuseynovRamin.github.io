/* ========= Utilities ========= */
const $ = (sel) => document.querySelector(sel);
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const toFixedSmart = (num, digits=3) => {
  const s = Number(num).toFixed(digits);
  return s.replace(/\.?0+$/,'');
};

/* ========= i18n (AZ + EN) ========= */
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

let currentLang = localStorage.getItem('lang') || 'az';

/* ========= Dark Mode ========= */
const darkToggle = $('#darkToggle');
if (localStorage.getItem('dark') === '1') {
  darkToggle.checked = true;
  document.documentElement.classList.add('dark');
}
darkToggle.addEventListener('change', () => {
  document.documentElement.classList.toggle('dark', darkToggle.checked);
  localStorage.setItem('dark', darkToggle.checked ? '1' : '0');
});

/* ========= Language Switch ========= */
function applyLang(lang){
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
document.querySelectorAll('.chip[data-lang]').forEach(btn=>{
  btn.addEventListener('click', ()=> applyLang(btn.dataset.lang));
});
applyLang(currentLang);

/* ========= Year in footer ========= */
$('#year').textContent = new Date().getFullYear();

/* ========= Weights / Scheme ========= */
const schemeSelect = $('#schemeSelect');
const customWeights = $('#customWeights');
const kqsWeight = $('#kqsWeight');
const bsqWeight = $('#bsqWeight');
const kqsWeightVal = $('#kqsWeightVal');
const bsqWeightVal = $('#bsqWeightVal');

function updateWeightLabels(){
  kqsWeightVal.textContent = kqsWeight.value;
  const complement = 100 - Number(kqsWeight.value);
  bsqWeight.value = complement;
  bsqWeightVal.textContent = complement;
}
kqsWeight.addEventListener('input', updateWeightLabels);
updateWeightLabels();

schemeSelect.addEventListener('change', () => {
  customWeights.classList.toggle('hidden', schemeSelect.value !== 'custom');
});

/* ========= Parsing ========= */
function parseKQS(input){
  return input
    .split(',')
    .map(s => parseFloat(s.trim()))
    .filter(v => !isNaN(v));
}

/* ========= Base AZ Calculation (PRESERVED) =========
   final = KQS_avg*0.4 + BSQ*0.6
*/
function calcAZ(ksqArray, bsq){
  const kAvg = ksqArray.length
    ? ksqArray.reduce((a,b)=>a+b,0) / ksqArray.length
    : 0;
  const b = isNaN(bsq) ? 0 : bsq;
  const final = kAvg * 0.4 + b * 0.6;
  return {kAvg, final};
}

/* ========= Custom Weighting ========= */
function calcCustom(ksqArray, bsq, kWeightPercent){
  const kAvg = ksqArray.length
    ? ksqArray.reduce((a,b)=>a+b,0) / ksqArray.length
    : 0;
  const b = isNaN(bsq) ? 0 : bsq;
  const kw = clamp(kWeightPercent, 0, 100)/100;
  const bw = 1 - kw;
  const final = kAvg * kw + b * bw;
  return {kAvg, final};
}

/* ========= Conversions (Display Only) =========
 We compute a 0–100 final score, then display the chosen scheme mapping.
*/
function toUSGPA(final){
  // Simple mapping: 93–100 A (4.0), 90–92 A- (3.7), 87–89 B+ (3.3), etc.
  let grade, gpa;
  if (final >= 93) { grade='A'; gpa=4.0; }
  else if (final >= 90){ grade='A-'; gpa=3.7; }
  else if (final >= 87){ grade='B+'; gpa=3.3; }
  else if (final >= 83){ grade='B'; gpa=3.0; }
  else if (final >= 80){ grade='B-'; gpa=2.7; }
  else if (final >= 77){ grade='C+'; gpa=2.3; }
  else if (final >= 73){ grade='C'; gpa=2.0; }
  else if (final >= 70){ grade='C-'; gpa=1.7; }
  else if (final >= 67){ grade='D+'; gpa=1.3; }
  else if (final >= 65){ grade='D'; gpa=1.0; }
  else { grade='F'; gpa=0.0; }
  return {grade, gpa};
}
function toUKClass(final){
  // Typical UK undergrad bands
  if (final >= 70) return {percent: final, class:'First Class (1st)'};
  if (final >= 60) return {percent: final, class:'Upper Second (2:1)'};
  if (final >= 50) return {percent: final, class:'Lower Second (2:2)'};
  if (final >= 40) return {percent: final, class:'Third'};
  return {percent: final, class:'Fail'};
}
function toECTS(final){
  // Example mapping
  if (final >= 90) return {grade:'A'};
  if (final >= 80) return {grade:'B'};
  if (final >= 70) return {grade:'C'};
  if (final >= 60) return {grade:'D'};
  if (final >= 50) return {grade:'E'};
  return {grade:'F'};
}

/* ========= UI Elements ========= */
const btnCalc = $('#btn-calc');
const btnSave = $('#btn-save');
const btnClear = $('#btn-clear');
const resultEl = $('#result');
const convertedEl = $('#converted');
const tipsBox = $('#tipsBox');
const ksqInput = $('#ksq');
const bsqInput = $('#bsq');

/* ========= History & Chart ========= */
let history = JSON.parse(localStorage.getItem('history') || '[]');
let chart;
function initChart(){
  const ctx = $('#historyChart');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: history.map(h => h.date),
      datasets: [{
        label: 'Final',
        data: history.map(h => h.final),
        tension: 0.25
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { suggestedMin: 0, suggestedMax: 100 }
      }
    }
  });
}
function updateChart(){
  if (!chart) return;
  chart.data.labels = history.map(h => h.date);
  chart.data.datasets[0].data = history.map(h => h.final);
  chart.update();
}

/* ========= Result Animation + Confetti ========= */
function animateResult(fromVal, toVal){
  // If anime.js loaded:
  if (window.anime) {
    anime({
      targets: { val: fromVal },
      val: toVal,
      round: 1000,
      easing: 'easeOutQuad',
      duration: 700,
      update: (a) => {
        resultEl.textContent = toFixedSmart(a.animations[0].currentValue/1000, 3);
      }
    });
  } else {
    resultEl.textContent = toFixedSmart(toVal, 3);
  }
  if (window.confetti && toVal >= 90) {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

/* ========= Tips ========= */
function showTips(kAvg, bsq, final){
  const t = I18N[currentLang] || I18N.az;
  let msg = '';
  if (final >= 90) msg = t.tipHigh;
  else if (kAvg < bsq) msg = t.tipImproveK;
  else msg = t.tipImproveB;
  tipsBox.textContent = msg;
}

/* ========= Compute & Display ========= */
function computeAndDisplay(){
  const t = I18N[currentLang] || I18N.az;
  const ksqArr = parseKQS(ksqInput.value || '');
  if (ksqArr.length === 0) {
    resultEl.textContent = '—';
    convertedEl.textContent = '';
    tipsBox.textContent = t.needKQS;
    return null;
  }
  const bsq = parseFloat(bsqInput.value);
  let base;
  if (schemeSelect.value === 'custom') {
    base = calcCustom(ksqArr, bsq, Number(kqsWeight.value));
  } else {
    // Always preserve AZ formula as the base numeric score
    base = calcAZ(ksqArr, bsq);
  }

  const fromVal = parseFloat(resultEl.textContent.replace(',', '.')) || 0;
  animateResult(fromVal, base.final);

  // Converted display for selected scheme
  let convertText = '';
  const finalRounded = toFixedSmart(base.final, 3);
  if (schemeSelect.value === 'az' || schemeSelect.value === 'custom') {
    convertText = `AZ: ${finalRounded}/100`;
  } else if (schemeSelect.value === 'us') {
    const u = toUSGPA(base.final);
    convertText = `US: ${u.grade} (GPA ${u.gpa.toFixed(1)}) · ${finalRounded}/100`;
  } else if (schemeSelect.value === 'uk') {
    const u = toUKClass(base.final);
    convertText = `UK: ${u.class} · ${toFixedSmart(u.percent, 2)}%`;
  } else if (schemeSelect.value === 'ects') {
    const e = toECTS(base.final);
    convertText = `ECTS: ${e.grade} · ${finalRounded}/100`;
  }
  convertedEl.textContent = convertText;

  showTips(base.kAvg, isNaN(bsq) ? 0 : bsq, base.final);

  return { kAvg: base.kAvg, bsq: isNaN(bsq)?0:bsq, final: Number(finalRounded) };
}

/* ========= Buttons ========= */
btnCalc.addEventListener('click', computeAndDisplay);

btnSave.addEventListener('click', () => {
  const t = I18N[currentLang] || I18N.az;
  const res = computeAndDisplay();
  if (!res) return;
  const entry = {
    date: new Date().toLocaleString(),
    kAvg: Number(toFixedSmart(res.kAvg,3)),
    bsq: res.bsq,
    final: res.final,
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

/* ========= CSV Export ========= */
$('#btn-csv').addEventListener('click', ()=>{
  const t = I18N[currentLang] || I18N.az;
  const header = t.csvHeader;
  const rows = history.map(h => [h.date, h.kAvg, h.bsq, h.final, h.scheme].join(','));
  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'grades_history.csv';
  a.click();
  URL.revokeObjectURL(url);
});

/* ========= PDF Export ========= */
$('#btn-pdf').addEventListener('click', async ()=>{
  const t = I18N[currentLang] || I18N.az;
  if (!window.jspdf || !window.html2canvas) return;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:'pt', format:'a4' });

  // Title
  doc.setFontSize(18);
  doc.text(t.pdfTitle, 40, 40);

  // Screenshot the main container
  const node = document.querySelector('main.container');
  const canvas = await html2canvas(node, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const imgWidth = pageWidth - 80;
  const imgHeight = canvas.height * (imgWidth / canvas.width);
  let y = 70;

  if (imgHeight < pageHeight - 100) {
    doc.addImage(imgData, 'PNG', 40, y, imgWidth, imgHeight);
  } else {
    // Multi-page if needed
    let remaining = imgHeight;
    let position = y;
    let imgY = 0;
    while (remaining > 0) {
      doc.addImage(imgData, 'PNG', 40, position, imgWidth, imgHeight, undefined, 'FAST');
      remaining -= (pageHeight - 100);
      if (remaining > 0) {
        doc.addPage();
        position = 40;
      }
    }
  }

  doc.save('academic_report.pdf');
});

/* ========= Share ========= */
$('#btn-share').addEventListener('click', async ()=>{
  const t = I18N[currentLang] || I18N.az;
  const text = `${t.shareText} ${resultEl.textContent} (${convertedEl.textContent})`;
  if (navigator.share) {
    try { await navigator.share({ text }); } catch(e){}
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    tipsBox.textContent = 'Copied to clipboard.';
  }
});

/* ========= Exam Countdown ========= */
let countdownTimer = null;
$('#btn-countdown').addEventListener('click', ()=>{
  const dateStr = $('#examDate').value;
  const out = $('#countdown');
  if (!dateStr) { out.textContent = '—'; return; }
  const target = new Date(dateStr + 'T00:00:00');
  clearInterval(countdownTimer);
  countdownTimer = setInterval(()=>{
    const now = new Date();
    const diff = target - now;
    if (diff <= 0){
      clearInterval(countdownTimer);
      out.textContent = '0d 0h 0m 0s';
      return;
    }
    const d = Math.floor(diff/86400000);
    const h = Math.floor((diff%86400000)/3600000);
    const m = Math.floor((diff%3600000)/60000);
    const s = Math.floor((diff%60000)/1000);
    out.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }, 1000);
});

/* ========= Calculator ========= */
const resultCalc = $('#resultCalc');
document.querySelectorAll('.horizontal-buttons button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const c = btn.dataset.c;
    if (c === 'C') resultCalc.value = '';
    else if (c === 'B') resultCalc.value = resultCalc.value.slice(0,-1);
    else if (c === '=') {
      // Safe-ish eval: allow digits, + - * / . %
      const expr = resultCalc.value;
      if (!/^[0-9+\-*/.%() ]+$/.test(expr)) { resultCalc.value = 'Xəta'; return; }
      try {
        // eslint-disable-next-line no-new-func
        const val = Function(`"use strict"; return (${expr})`)();
        resultCalc.value = String(val);
      } catch { resultCalc.value = 'Xəta'; }
    } else {
      resultCalc.value += c;
    }
  });
});

/* ========= Init ========= */
document.addEventListener('DOMContentLoaded', ()=>{
  initChart();
  // Recompute once if fields are prefilled
  computeAndDisplay();
});

/* Optional: compute on Enter */
[ksqInput, bsqInput].forEach(inp=>{
  inp.addEventListener('keydown', (e)=> { if (e.key === 'Enter') computeAndDisplay(); });
});
