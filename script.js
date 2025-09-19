const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const toFixedSmart = (num, d = 3) => {
  if (typeof num !== 'number' || Number.isNaN(num)) return '0';
  const s = Number(num).toFixed(d);
  return s.replace(/\.?0+$/, '');
};

const I18N = { 
  az: { 
    title: "Akademik Qiymət Hesablama",
    calcTitle: "📊 KQS və BSQ daxil edin",
    ksq: "📊 KQS qiymətləri (vergüllə ayırın):",
    bsq: "📝 BSQ qiyməti (əgər varsa):",
    scheme: "🎯 Qiymətləndirmə sistemi:",
    result: "Nəticə:",
    btnCalc: "Hesabla",
    btnSave: "Yadda saxla",
    btnClear: "Tarixi sil",
    btnPDF: "📄 PDF Yüklə",
    btnCSV: "🧾 CSV Yüklə",
    btnShare: "🔗 Paylaş",
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
    begins: "Başlat",
    pdfTitle: "Akademik Hesabat",
    shareText: "Mənim akademik nəticəm:",
    csvHeader: "Tarix,KQS Orta,BSQ,Nəticə,Sxem"
  }, 
  en: { 
    title: "Academic Grade Calculator",
    calcTitle: "📊 Enter Scores",
    ksq: "📊 Assignment / Exam scores (comma-separated):",
    bsq: "📝 Final Exam score (if applicable):",
    scheme: "🎯 Grading scheme:",
    result: "Result:",
    btnCalc: "Calculate",
    btnSave: "Save",
    btnClear: "Clear History",
    btnPDF: "📄 Download PDF",
    btnCSV: "🧾 Download CSV",
    btnShare: "🔗 Share",
    history: "📈 Score history",
    exam: "⏳ Exam countdown",
    azBadge: "🇦🇿 40/60",
    weightNote: "AZ default 40/60 preserved. Choose Custom to adjust.",
    needKQS: "Enter at least one KQS score.",
    saved: "Result saved.",
    cleared: "History cleared.",
    tipHigh: "Excellent! Keep a weekly routine to stay consistent.",
    tipImproveK: "Assignment/exam average is lower than final: add drills and practice.",
    tipImproveB: "Final exam score is lower: focus on exam strategy and timed mocks.",
    countdown: "Countdown:",
    days: "days",
    begins: "Start the timer"
    pdfTitle: "Academic Report",
    shareText: "My academic result:",
    csvHeader: "Date,KQS Avg,BSQ,Final,Scheme"
  } 
};

let currentLang = localStorage.getItem('lang') || 'az';
const darkToggle = $('#darkToggle');
const schemeSelect = $('#schemeSelect');
const begins = $('#begins');
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
let history = JSON.parse(localStorage.getItem('history') || '[]');
let chart = null;

function applyLang(lang) {
  currentLang = lang;
  const t = I18N[lang] || I18N.az;
  $('#title-text').textContent = t.title;
  $('#calc-title').textContent = t.calcTitle;
  $('#label-ksq').innerHTML = `<strong>${t.ksq}</strong>`;
  $('#label-bsq').innerHTML = `<strong>${t.bsq}</strong>`;
  $('#label-scheme').innerHTML = `<strong>${t.scheme}</strong>`;
  $('#label-result').textContent = t.result;
  $('#begins').textContent = t.begins;
  $('#history-title').textContent = t.history;
  $('#exam-title').textContent = t.exam;
  $('#az-badge').textContent = t.azBadge;
  $('#weight-note').textContent = t.weightNote;
  $('#btn-calc').textContent = t.btnCalc;
  $('#btn-save').textContent = t.btnSave;
  $('#btn-clear').textContent = t.btnClear;
  $('#btn-pdf').textContent = t.btnPDF;
  $('#btn-csv').textContent = t.btnCSV;
  $('#btn-share').textContent = t.btnShare;
  localStorage.setItem('lang', lang);
}
$$('.chip[data-lang]').forEach(btn => btn.addEventListener('click', () => applyLang(btn.dataset.lang)));
applyLang(currentLang);
yearEl.textContent = new Date().getFullYear();
if (localStorage.getItem('dark') === '1') { darkToggle.checked = true; document.documentElement.classList.add('dark'); }
darkToggle.addEventListener('change', () => { document.documentElement.classList.toggle('dark', darkToggle.checked); localStorage.setItem('dark', darkToggle.checked ? '1' : '0'); });

function updateWeightLabels() {
  kqsWeightVal.textContent = kqsWeight.value;
  const comp = 100 - Number(kqsWeight.value);
  bsqWeight.value = comp;
  bsqWeightVal.textContent = comp;
}
kqsWeight.addEventListener('input', () => { updateWeightLabels(); if (schemeSelect.value === 'custom') computeAndDisplay(); });
updateWeightLabels();
schemeSelect.addEventListener('change', () => { customWeights.classList.toggle('hidden', schemeSelect.value !== 'custom'); updateKQSBSQLabels(); computeAndDisplay(); });

function updateKQSBSQLabels() {
  const t = I18N[currentLang] || I18N.az;
  $('#label-ksq').innerHTML = `<strong>📊 Scores or letters A-F (comma-separated):</strong>`;
  $('#label-bsq').innerHTML = `<strong>📝 Final score / letter:</strong>`;
  $('#bsq').parentElement.style.display = 'block';
}

function parseKQS(input) {
  if (!input) return [];
  return input.split(',').map(s => {
    s = s.trim().toUpperCase();
    if (s === 'A') return 95;
    if (s === 'A-') return 91;
    if (s === 'B+') return 88;
    if (s === 'B') return 85;
    if (s === 'B-') return 81;
    if (s === 'C+') return 78;
    if (s === 'C') return 75;
    if (s === 'C-') return 71;
    if (s === 'D+') return 68;
    if (s === 'D') return 65;
    if (s === 'F') return 50;
    const n = parseFloat(s); return Number.isNaN(n) ? 0 : n;
  }).filter(n => !Number.isNaN(n));
}

function toUSGPA(score){
  let grade,gpa;
  if(score>=93){grade='A';gpa=4;}
  else if(score>=90){grade='A-';gpa=3.7;}
  else if(score>=87){grade='B+';gpa=3.3;}
  else if(score>=83){grade='B';gpa=3;}
  else if(score>=80){grade='B-';gpa=2.7;}
  else if(score>=77){grade='C+';gpa=2.3;}
  else if(score>=73){grade='C';gpa=2;}
  else if(score>=70){grade='C-';gpa=1.7;}
  else if(score>=67){grade='D+';gpa=1.3;}
  else if(score>=65){grade='D';gpa=1;}
  else{grade='F';gpa=0;}
  return {grade,gpa};
}

function computeAndDisplay() {
  const t = I18N[currentLang] || I18N.az;
  const ksqArr = parseKQS(ksqInput.value || '');
  if(ksqArr.length===0){ resultEl.textContent='—'; convertedEl.textContent=''; tipsBox.textContent=t.needKQS; return null; }
  const bsqRaw = bsqInput.value; 
  const bsq=parseKQS(bsqRaw)[0]||0;
  const allScores=[...ksqArr]; if(Number.isFinite(bsq)) allScores.push(bsq);
  const avg=allScores.reduce((a,b)=>a+b,0)/allScores.length;
  resultEl.textContent=toFixedSmart(avg,3);
  const u=toUSGPA(avg);
  convertedEl.textContent=`US: ${u.grade} · GPA ${u.gpa.toFixed(2)} · ${toFixedSmart(avg,2)}/100`;
  return avg;
}

btnCalc.addEventListener('click',computeAndDisplay);
