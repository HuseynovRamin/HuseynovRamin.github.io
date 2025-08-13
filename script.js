// --- DOM Elements ---
const ksqInput = document.getElementById('ksq');
const bsqInput = document.getElementById('bsq');
const schemeSelect = document.getElementById('schemeSelect');
const kqsWeight = document.getElementById('kqsWeight');
const bsqWeight = document.getElementById('bsqWeight');
const kqsWeightVal = document.getElementById('kqsWeightVal');
const bsqWeightVal = document.getElementById('bsqWeightVal');
const customWeights = document.getElementById('customWeights');

const btnCalc = document.getElementById('btn-calc');
const btnSave = document.getElementById('btn-save');
const btnClear = document.getElementById('btn-clear');

const resultEl = document.getElementById('result');
const convertedEl = document.getElementById('converted');
const tipsBox = document.getElementById('tipsBox');

const historyChartEl = document.getElementById('historyChart');
let historyData = [];
let historyChart;

// --- Helper Functions ---
function parseKQS(str) {
  return str.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
}
function clamp(val, min, max) { return Math.min(Math.max(val, min), max); }
function toFixedSmart(value, decimals) { return parseFloat(value.toFixed(decimals)); }

// --- US GPA Conversion ---
function toUSGPA(score) {
  if (score > 100) score = 100;
  if (score < 0) score = 0;
  let gpa = 0;
  if (score >= 93) gpa = 4.0;
  else if (score >= 90) gpa = 3.7;
  else if (score >= 87) gpa = 3.3;
  else if (score >= 83) gpa = 3.0;
  else if (score >= 80) gpa = 2.7;
  else if (score >= 77) gpa = 2.3;
  else if (score >= 73) gpa = 2.0;
  else if (score >= 70) gpa = 1.7;
  else if (score >= 67) gpa = 1.3;
  else if (score >= 65) gpa = 1.0;
  else gpa = 0.0;
  return { gpa, grade: gpa>=3.7?'A':gpa>=3.0?'B':gpa>=2.0?'C':gpa>=1.0?'D':'F' };
}

// --- UK Class ---
function toUKClass(score) {
  if (score >= 70) return { class: 'First', percent: score };
  if (score >= 60) return { class: 'Upper Second (2:1)', percent: score };
  if (score >= 50) return { class: 'Lower Second (2:2)', percent: score };
  if (score >= 40) return { class: 'Third', percent: score };
  return { class: 'Fail', percent: score };
}

// --- ECTS ---
function toECTS(score) {
  if (score >= 90) return { grade: 'A' };
  if (score >= 80) return { grade: 'B' };
  if (score >= 70) return { grade: 'C' };
  if (score >= 60) return { grade: 'D' };
  if (score >= 50) return { grade: 'E' };
  return { grade: 'F' };
}

// --- Custom Weights Slider ---
kqsWeight.addEventListener('input', () => {
  kqsWeightVal.textContent = kqsWeight.value;
  bsqWeight.value = 100 - kqsWeight.value;
  bsqWeightVal.textContent = bsqWeight.value;
});

// --- Switch Scheme ---
schemeSelect.addEventListener('change', () => {
  customWeights.classList.toggle('hidden', schemeSelect.value !== 'custom');

  if(schemeSelect.value === 'az' || schemeSelect.value === 'custom'){
    ksqInput.parentElement.style.display = 'block';
    bsqInput.parentElement.style.display = 'block';
  } else {
    ksqInput.parentElement.style.display = 'none';
    bsqInput.parentElement.style.display = 'block';
    bsqInput.placeholder = schemeSelect.value==='us'?'Enter numeric score (0-100)':schemeSelect.value==='uk'?'Enter numeric %':'Enter numeric score';
  }

  resultEl.textContent = '-';
  convertedEl.textContent = '';
  tipsBox.textContent = '';
});

// --- Compute Function ---
function computeAndDisplay() {
  let finalNum = 0;
  let kqsArr = parseKQS(ksqInput.value);
  let kAvg = kqsArr.length ? kqsArr.reduce((a,b)=>a+b,0)/kqsArr.length : 0;
  let bsq = parseFloat(bsqInput.value);

  switch(schemeSelect.value){
    case 'az':
      if(!kqsArr.length){ tipsBox.textContent='Ən azı bir KQS qiyməti daxil edin.'; resultEl.textContent='—'; return;}
      finalNum = kAvg*0.4 + (Number.isFinite(bsq)?bsq:0)*0.6;
      convertedEl.textContent = `AZ: ${toFixedSmart(finalNum,2)}/100`;
      break;
    case 'custom':
      if(!kqsArr.length){ tipsBox.textContent='Ən azı bir KQS qiyməti daxil edin.'; resultEl.textContent='—'; return;}
      let kw = clamp(Number(kqsWeight.value)/100,0,1);
      let bw = 1-kw;
      finalNum = kAvg*kw + (Number.isFinite(bsq)?bsq:0)*bw;
      convertedEl.textContent = `Custom: ${toFixedSmart(finalNum,2)}/100`;
      break;
    case 'us':
      if(!Number.isFinite(bsq)){ resultEl.textContent='—'; convertedEl.textContent='Enter numeric score'; return;}
      finalNum = bsq;
      const u = toUSGPA(finalNum);
      convertedEl.textContent = `US: ${u.grade} · GPA ${u.gpa.toFixed(2)} · ${toFixedSmart(finalNum,2)}/100`;
      break;
    case 'uk':
      if(!Number.isFinite(bsq)){ resultEl.textContent='—'; convertedEl.textContent='Enter numeric score'; return;}
      finalNum = bsq;
      const uk = toUKClass(finalNum);
      convertedEl.textContent = `UK: ${uk.class} · ${toFixedSmart(uk.percent,2)}%`;
      break;
    case 'ects':
      if(!Number.isFinite(bsq)){ resultEl.textContent='—'; convertedEl.textContent='Enter numeric score'; return;}
      finalNum = bsq;
      const e = toECTS(finalNum);
      convertedEl.textContent = `ECTS: ${e.grade} · ${toFixedSmart(finalNum,2)}/100`;
      break;
    default: finalNum=0; convertedEl.textContent='—';
  }

  resultEl.textContent = toFixedSmart(finalNum,3);
  tipsBox.textContent='';

  // --- Save history for chart ---
  historyData.push({time:new Date(), score:finalNum});
  updateChart();
}

// --- Chart.js for History ---
function updateChart(){
  const labels = historyData.map(d=>d.time.toLocaleTimeString());
  const data = historyData.map(d=>d.score);
  if(historyChart) historyChart.destroy();
  historyChart = new Chart(historyChartEl,{
    type:'line',
    data:{labels, datasets:[{label:'Nəticə',data,borderColor:'#007bff',backgroundColor:'rgba(0,123,255,0.2)',tension:0.3}]},
    options:{responsive:true,plugins:{legend:{display:false}}}
  });
}

// --- Buttons ---
btnCalc.addEventListener('click', computeAndDisplay);
btnSave.addEventListener('click', ()=>{ alert('Saved in history'); });
btnClear.addEventListener('click', ()=>{ historyData=[]; updateChart(); });

// --- Countdown Timer ---
const examDateInput = document.getElementById('examDate');
const btnCountdown = document.getElementById('btn-countdown');
const countdownEl = document.getElementById('countdown');
let countdownInterval;

btnCountdown.addEventListener('click',()=>{
  clearInterval(countdownInterval);
  const target = new Date(examDateInput.value);
  if(isNaN(target)){ countdownEl.textContent='—'; return; }
  countdownInterval = setInterval(()=>{
    const diff = target - new Date();
    if(diff<=0){ countdownEl.textContent='İmtahan başladı!'; clearInterval(countdownInterval); return;}
    const d = Math.floor(diff/86400000);
    const h = Math.floor((diff%86400000)/3600000);
    const m = Math.floor((diff%3600000)/60000);
    const s = Math.floor((diff%60000)/1000);
    countdownEl.textContent=`${d}d ${h}h ${m}m ${s}s`;
  },1000);
});

// --- Built-in Calculator ---
const calcInput = document.getElementById('resultCalc');
document.querySelectorAll('.horizontal-buttons button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const c = btn.dataset.c;
    if(c==='C') calcInput.value='';
    else if(c==='B') calcInput.value = calcInput.value.slice(0,-1);
    else if(c==='='){
      try{ calcInput.value=eval(calcInput.value);}
      catch{calcInput.value='Xəta';}
    } else calcInput.value+=c;
  });
});

// --- Dark Mode ---
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('change',()=>{ document.body.classList.toggle('dark', darkToggle.checked); });

// --- Year ---
document.getElementById('year').textContent = new Date().getFullYear();
