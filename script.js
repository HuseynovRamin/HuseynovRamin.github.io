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
    calcTitle: "📊 Enter Scores",
    ksq: "📊 Assignment / Exam scores (comma-separated):",
    bsq: "📝 Final Exam score (if applicable):",
    scheme: "🎯 Grading scheme:",
    result: "Result:",
    history: "📈 Score history",
    exam: "⏳ Exam countdown",
    azBadge: "🇦🇿 40/60",
    weightNote: "AZ default 40/60 preserved. Choose Custom to adjust.",
    needKQS: "Enter at least one score.",
    saved: "Result saved.",
    cleared: "History cleared.",
    tipHigh: "Excellent! Keep a weekly routine to stay consistent.",
    tipImproveK: "Assignment/exam average is lower than final: add drills and practice.",
    tipImproveB: "Final exam score is lower: focus on exam strategy and timed mocks.",
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

schemeSelect.addEventListener('change', () => {
  customWeights.classList.toggle('hidden', schemeSelect.value !== 'custom');
  updateKQSBSQLabels();
  computeAndDisplay();
});

/* --------- KQS/BSQ label adjustment --------- */
function updateKQSBSQLabels() {
  const t = I18N[currentLang] || I18N.az;
  if (schemeSelect.value === 'az' || schemeSelect.value === 'custom') {
    $('#label-ksq').innerHTML = `<strong>${t.ksq}</strong>`;
    $('#label-bsq').innerHTML = `<strong>${t.bsq}</strong>`;
    $('#bsq').parentElement.style.display = 'block';
  } else {
    // For US, UK, ECTS
    $('#label-ksq').innerHTML = `<strong>${currentLang === 'az' ? '📊 Tapşırıqlar / İmtahanlar' : '📊 Assignment / Exam scores'}</strong>`;
    $('#label-bsq').innerHTML = `<strong>${currentLang === 'az' ? '📝 Final qiymət (əgər varsa)' : '📝 Final Exam (if any)'}</strong>`;
    $('#bsq').parentElement.style.display = 'block'; // keep visible, but you can hide if irrelevant
  }
}

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
  if(final>=70) return {percent:final,class:'First Class (1st)'};
  if(final>=60) return {percent:final,class:'Upper Second (2:1)'};
  if(final>=50) return {percent:final,class:'Lower Second (2:2)'};
  if(final>=40) return {percent:final,class:'Third'};
  return {percent:final,class:'Fail'};
}

function toECTS(final){
  if(final>=90) return {grade:'A'};
  if(final>=80) return {grade:'B'};
  if(final>=70) return {grade:'C'};
  if(final>=60) return {grade:'D'};
  if(final>=50) return {grade:'E'};
  return {grade:'F'};
}

/* --------- Chart & history --------- */
function initChart() {
  const canvas = document.getElementById('historyChart');
  if(!canvas) return;
  if(window.Chart && !chart){
    chart = new Chart(canvas.getContext('2d'),{
      type:'line',
      data:{
        labels: history.map(h=>h.date),
        datasets:[{
          label:'Final',
          data: history.map(h=>h.final),
          tension:0.25,
          borderColor:'#0d6efd',
          backgroundColor:'rgba(13,110,253,0.15)',
          fill:true
        }]
      },
      options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{suggestedMin:0,suggestedMax:100}}}
    });
  }
}

function updateChart(){
  if(!chart){ initChart(); return; }
  chart.data.labels = history.map(h=>h.date);
  chart.data.datasets[0].data = history.map(h=>h.final);
  chart.update();
}

/* --------- Result display --------- */
function showTips(kAvg, bsq, final){
  const t = I18N[currentLang] || I18N.az;
  let msg = '';
  if(final >= 90) msg = t.tipHigh;
  else if(kAvg < bsq) msg = t.tipImproveK;
  else msg = t.tipImproveB;
  tipsBox.textContent = msg;
}

function computeAndDisplay(){
  const t = I18N[currentLang] || I18N.az;
  const ksqArr = parseKQS(ksqInput.value||'');
  if(ksqArr.length===0){
    resultEl.textContent='—';
    convertedEl.textContent='';
    tipsBox.textContent=t.needKQS;
    return null;
  }

  const bsqRaw = bsqInput.value;
  const bsq = (bsqRaw === '' || bsqRaw === null)?NaN:parseFloat(bsqRaw);

  let base;
  if(schemeSelect.value==='custom'){
    base=calcCustom(ksqArr, bsq, Number(kqsWeight.value));
  }else{
    base=calcAZ(ksqArr, bsq);
  }

  const finalNum = Number(toFixedSmart(base.final,3));
  resultEl.textContent = toFixedSmart(finalNum,3);

  let convertText='';
  if(schemeSelect.value==='az' || schemeSelect.value==='custom'){
    convertText=`AZ: ${toFixedSmart(finalNum,2)}/100`;
  }else if(schemeSelect.value==='us'){
    const u = toUSGPA(finalNum);
    convertText=`US: ${u.grade} (GPA ${u.gpa.toFixed(1)}) · ${toFixedSmart(finalNum,2)}/100`;
  }else if(schemeSelect.value==='uk'){
    const u = toUKClass(finalNum);
    convertText=`UK: ${u.class} · ${toFixedSmart(u.percent,2)}%`;
  }else if(schemeSelect.value==='ects'){
    const e = toECTS(finalNum);
    convertText=`ECTS: ${e.grade} · ${toFixedSmart(finalNum,2)}/100`;
  }
  convertedEl.textContent = convertText;

  showTips(base.kAvg, Number.isFinite(bsq)?bsq:0, finalNum);

  return finalNum;
}

/* --------- Save / Clear --------- */
function saveResult(){
  const now = new Date().toLocaleDateString();
  const ksqArr = parseKQS(ksqInput.value||'');
  const bsqRaw = bsqInput.value;
  const bsq = (bsqRaw === '' || bsqRaw === null)?NaN:parseFloat(bsqRaw);
  const final = computeAndDisplay();
  if(final===null) return;

  history.push({date:now,kAvg:ksqArr.length?kqsArr.reduce((a,b)=>a+b,0)/ksqArr.length:0,bsq:bsq||0,final:final,scheme:schemeSelect.value});
  localStorage.setItem('history',JSON.stringify(history));
  updateChart();
  tipsBox.textContent = I18N[currentLang].saved;
}
function clearHistory(){
  history=[];
  localStorage.setItem('history',JSON.stringify(history));
  updateChart();
  tipsBox.textContent = I18N[currentLang].cleared;
}

/* --------- Event listeners --------- */
btnCalc.addEventListener('click', computeAndDisplay);
btnSave.addEventListener('click', saveResult);
btnClear.addEventListener('click', clearHistory);

/* --------- Initialize --------- */
updateKQSBSQLabels();
computeAndDisplay();
initChart();
