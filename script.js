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
const resultEl = document.getElementById('result');
const convertedEl = document.getElementById('converted');
const tipsBox = document.getElementById('tipsBox');

// --- Helper Functions ---
function parseKQS(str) {
  return str.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function toFixedSmart(value, decimals) {
  let str = value.toFixed(decimals);
  return parseFloat(str);
}

// US GPA conversion (simple scale)
function toUSGPA(score) {
  let gpa = 0, grade = '';
  if (score >= 90) { gpa = 4.0; grade = 'A'; }
  else if (score >= 80) { gpa = 3.0; grade = 'B'; }
  else if (score >= 70) { gpa = 2.0; grade = 'C'; }
  else if (score >= 60) { gpa = 1.0; grade = 'D'; }
  else { gpa = 0; grade = 'F'; }
  return { gpa, grade };
}

// UK Class conversion
function toUKClass(score) {
  if (score >= 70) return { class: 'First', percent: score };
  if (score >= 60) return { class: 'Upper Second (2:1)', percent: score };
  if (score >= 50) return { class: 'Lower Second (2:2)', percent: score };
  if (score >= 40) return { class: 'Third', percent: score };
  return { class: 'Fail', percent: score };
}

// ECTS
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

// --- Show/Hide custom weights ---
schemeSelect.addEventListener('change', () => {
  if (schemeSelect.value === 'custom') {
    customWeights.classList.remove('hidden');
  } else {
    customWeights.classList.add('hidden');
  }
  // clear previous converted text
  convertedEl.textContent = '';
  resultEl.textContent = '-';
});

// --- Main Calculation ---
function computeAndDisplay() {
  const ksqArr = parseKQS(ksqInput.value || '');
  const bsqRaw = bsqInput.value;
  const bsq = (bsqRaw === '' || bsqRaw === null) ? NaN : parseFloat(bsqRaw);

  let finalNum = 0;
  let kAvg = ksqArr.length ? (ksqArr.reduce((a,b)=>a+b,0)/ksqArr.length) : 0;

  switch (schemeSelect.value) {
    case 'az':
      if (ksqArr.length === 0) { 
        resultEl.textContent = '—'; 
        convertedEl.textContent = ''; 
        tipsBox.textContent = 'Ən azı bir KQS qiyməti daxil edin.'; 
        return;
      }
      finalNum = kAvg * 0.4 + (Number.isFinite(bsq) ? bsq : 0) * 0.6;
      convertedEl.textContent = `AZ: ${toFixedSmart(finalNum,2)}/100`;
      break;

    case 'custom':
      if (ksqArr.length === 0) { 
        resultEl.textContent = '—'; 
        convertedEl.textContent = ''; 
        tipsBox.textContent = 'Ən azı bir KQS qiyməti daxil edin.'; 
        return;
      }
      const kw = clamp(Number(kqsWeight.value)/100,0,1);
      const bw = 1 - kw;
      finalNum = kAvg * kw + (Number.isFinite(bsq) ? bsq : 0) * bw;
      convertedEl.textContent = `Custom: ${toFixedSmart(finalNum,2)}/100`;
      break;

    case 'us':
      finalNum = Number.isFinite(bsq) ? bsq : kAvg;
      const u = toUSGPA(finalNum);
      convertedEl.textContent = `US: ${u.grade} (GPA ${u.gpa.toFixed(1)}) · ${toFixedSmart(finalNum,2)}/100`;
      break;

    case 'uk':
      finalNum = Number.isFinite(bsq) ? bsq : kAvg;
      const uk = toUKClass(finalNum);
      convertedEl.textContent = `UK: ${uk.class} · ${toFixedSmart(uk.percent,2)}%`;
      break;

    case 'ects':
      finalNum = Number.isFinite(bsq) ? bsq : kAvg;
      const e = toECTS(finalNum);
      convertedEl.textContent = `ECTS: ${e.grade} · ${toFixedSmart(finalNum,2)}/100`;
      break;

    default:
      finalNum = 0;
      convertedEl.textContent = '-';
  }

  resultEl.textContent = toFixedSmart(finalNum, 3);
  tipsBox.textContent = '';
}

// --- Event Listener ---
btnCalc.addEventListener('click', computeAndDisplay);

// --- Built-in Calculator ---
const calcInput = document.getElementById('resultCalc');
document.querySelectorAll('.horizontal-buttons button').forEach(btn => {
  btn.addEventListener('click', () => {
    const c = btn.dataset.c;
    if (c === 'C') { calcInput.value = ''; }
    else if (c === 'B') { calcInput.value = calcInput.value.slice(0,-1); }
    else if (c === '=') {
      try { calcInput.value = eval(calcInput.value); } 
      catch { calcInput.value = 'Xəta'; }
    } else { calcInput.value += c; }
  });
});

// --- Dark Mode Toggle ---
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', darkToggle.checked);
});

// --- Year Update ---
document.getElementById('year').textContent = new Date().getFullYear();
