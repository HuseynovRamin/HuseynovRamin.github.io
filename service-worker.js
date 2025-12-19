<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MyWater</title>

<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#060b18">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

<style>
:root{
  --bg:#060b18;
  --card:#121a2f;
  --accent:#4fd1ff;
  --accent2:#6b7cff;
  --text:#fff;
  --muted:#9aa4bf;
  --success:#4dffb8;
  --warning:#ffb84d;
}
*{box-sizing:border-box;font-family:Poppins}
body{margin:0;background:radial-gradient(circle at top,#162044,#060b18);color:var(--text)}
.app{max-width:420px;margin:auto;padding:14px;padding-bottom:90px}

/* CARD */
.card{
  background:linear-gradient(180deg,#151f3f,#0f1630);
  border-radius:26px;
  padding:18px;
  margin-bottom:16px;
  box-shadow:0 10px 30px rgba(0,0,0,0.3);
}

/* BOTTLE */
.bottle{
  width:150px;height:280px;margin:16px auto;
  border-radius:36px;border:3px solid rgba(255,255,255,.25);
  position:relative;overflow:hidden;
  box-shadow:0 0 30px rgba(79,209,255,0.2);
}
.water{
  position:absolute;bottom:0;width:100%;height:0%;
  background:linear-gradient(180deg,#7be7ff,#3fa9f5);
  transition:height .6s ease;
}

/* BUTTON */
button{
  width:100%;padding:14px;
  border:none;border-radius:18px;
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  font-weight:700;color:#000;
  cursor:pointer;
  transition:transform 0.2s, box-shadow 0.2s;
}
button:hover{transform:translateY(-2px);box-shadow:0 5px 15px rgba(79,209,255,0.4)}
button.secondary{
  background:rgba(255,255,255,0.1);
  color:var(--text);
  margin-top:10px;
}
button.small{
  padding:8px 16px;
  width:auto;
  font-size:14px;
}

/* NAV */
.nav{
  position:fixed;bottom:0;left:0;right:0;
  background:#0b1228;
  display:flex;justify-content:space-around;
  padding:12px 0;
  border-top:1px solid rgba(255,255,255,0.1);
  z-index:100;
}
.nav i{color:var(--muted);font-size:1.3rem;cursor:pointer;transition:color 0.3s}
.nav i.active{color:var(--accent);text-shadow:0 0 10px rgba(79,209,255,0.7)}
.nav i:hover{color:var(--accent)}

/* MODAL */
.modal{
  position:fixed;inset:0;
  background:rgba(0,0,0,.85);
  display:none;align-items:center;justify-content:center;
  z-index:1000;
  backdrop-filter:blur(5px);
}
.modal-content{
  width:90%;max-width:380px;
  animation:modalSlide 0.3s ease-out;
  max-height:90vh;
  overflow-y:auto;
}
@keyframes modalSlide{from{transform:translateY(50px);opacity:0}to{transform:translateY(0);opacity:1}}

/* GENDER */
.gender-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:16px;margin-top:24px;
}
.gender-grid button{
  padding:20px;font-size:18px;
}

/* RULER FIX */
.rwrap{
  position:relative;
  height:140px;
  overflow:hidden;
  margin:20px 0;
  background:rgba(255,255,255,0.05);
  border-radius:15px;
  padding:10px 0;
}
.ruler-container{
  width:100%;
  height:120px;
  position:relative;
  touch-action:pan-x;
}
.ruler{
  display:flex;
  height:100px;
  align-items:flex-end;
  overflow-x:scroll;
  scrollbar-width:none;
  padding:0 calc(50% - 5.5px); /* Half of tick width (11px/2) */
  scroll-behavior:smooth;
  -webkit-overflow-scrolling:touch;
}
.ruler::-webkit-scrollbar{display:none}
.tick{
  width:11px; /* Changed from 22px to 11px for 1-unit increments */
  flex-shrink:0;
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-end;
}
.tick::after{
  content:"";
  position:absolute;
  bottom:20px;
  left:50%;
  transform:translateX(-50%);
  width:1px;
  background:rgba(255,255,255,.2);
  z-index:1;
}
.tick.minor::after{height:15px;}
.tick.major::after{
  height:30px;
  background:#fff;
  width:2px;
}
.tick.major5::after{
  height:40px;
  background:var(--accent);
  width:3px;
}
.tick span{
  position:absolute;
  bottom:-25px;
  left:50%;
  transform:translateX(-50%);
  font-size:11px;
  color:var(--muted);
  white-space:nowrap;
}
.center-line{
  position:absolute;
  top:0;
  bottom:20px;
  left:50%;
  transform:translateX(-50%);
  width:4px;
  background:var(--accent);
  z-index:2;
  box-shadow:0 0 10px var(--accent);
}
.ruler-value{
  text-align:center;
  font-size:28px;
  font-weight:700;
  margin:10px 0;
  color:var(--accent);
  text-shadow:0 0 10px rgba(79,209,255,0.5);
}
.manual-input-container{
  display:flex;
  gap:10px;
  margin-top:15px;
}
.manual-input{
  flex:1;
  padding:12px;
  background:rgba(255,255,255,0.05);
  border:2px solid rgba(79,209,255,0.3);
  border-radius:12px;
  color:var(--text);
  font-size:16px;
  text-align:center;
  outline:none;
}
.manual-input:focus{
  border-color:var(--accent);
  box-shadow:0 0 10px rgba(79,209,255,0.3);
}
.manual-input-btn{
  padding:0 20px;
  background:rgba(79,209,255,0.3);
  border:none;
  border-radius:12px;
  color:var(--accent);
  cursor:pointer;
  font-weight:600;
}
.manual-controls{
  display:flex;
  justify-content:center;
  gap:10px;
  margin-top:10px;
}
.manual-controls button{
  width:50px;
  height:50px;
  border-radius:50%;
  font-size:20px;
  display:flex;
  align-items:center;
  justify-content:center;
}

/* AGE WHEEL FIX */
.age-wheel-container{
  width:100%;
  height:140px;
  position:relative;
  margin:20px 0;
  background:rgba(255,255,255,0.05);
  border-radius:15px;
  overflow:hidden;
}
.age-wheel{
  display:flex;
  height:100%;
  align-items:center;
  overflow-x:scroll;
  scrollbar-width:none;
  scroll-behavior:smooth;
  padding:0 calc(50% - 15px);
  -webkit-overflow-scrolling:touch;
  touch-action:pan-x;
}
.age-wheel::-webkit-scrollbar{display:none}
.age-item{
  width:30px; /* Reduced from 60px for 1-year increments */
  height:60px;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
  font-size:16px;
  color:var(--muted);
  cursor:pointer;
  transition:all 0.3s;
  border-radius:8px;
  margin:0 1px;
}
.age-item:hover{
  background:rgba(79,209,255,0.1);
}
.age-item.active{
  color:var(--accent);
  font-weight:700;
  font-size:20px;
  background:rgba(79,209,255,0.2);
  transform:scale(1.2);
  box-shadow:0 0 15px rgba(79,209,255,0.4);
}
.age-item.major{
  font-size:14px;
  font-weight:600;
}
.age-center-line{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:3px;
  height:80%;
  background:var(--accent);
  z-index:1;
  box-shadow:0 0 10px var(--accent);
}

/* DRINK AMOUNT GRID */
.amount-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:12px;
  margin:20px 0;
}
.amount-btn{
  padding:16px 8px;
  font-size:14px;
  background:rgba(255,255,255,0.1);
  border:2px solid transparent;
  border-radius:12px;
  color:var(--text);
  cursor:pointer;
  transition:all 0.2s;
  display:flex;
  flex-direction:column;
  align-items:center;
}
.amount-btn:hover{
  background:rgba(79,209,255,0.2);
  transform:translateY(-2px);
}
.amount-btn.active{
  background:rgba(79,209,255,0.3);
  border-color:var(--accent);
  color:var(--accent);
  box-shadow:0 0 15px rgba(79,209,255,0.3);
}
.amount-detail{
  font-size:11px;
  color:var(--muted);
  margin-top:3px;
}
.custom-input{
  grid-column:span 3;
  padding:15px;
  background:rgba(255,255,255,0.05);
  border:2px solid rgba(79,209,255,0.3);
  border-radius:12px;
  color:var(--text);
  font-size:16px;
  text-align:center;
  outline:none;
}
.custom-input:focus{
  border-color:var(--accent);
  box-shadow:0 0 10px rgba(79,209,255,0.3);
}

/* GOAL DISPLAY */
.goal-display{
  position:fixed;
  top:20px;
  right:20px;
  width:120px;
  padding:15px;
  background:linear-gradient(135deg,var(--card),#1a2545);
  border-radius:20px;
  text-align:center;
  box-shadow:0 8px 25px rgba(0,0,0,0.4);
  border:2px solid rgba(79,209,255,0.3);
  z-index:50;
}
.goal-progress{
  width:60px;
  height:60px;
  margin:10px auto;
  position:relative;
}
.goal-circle{
  width:100%;
  height:100%;
  border-radius:50%;
  background:conic-gradient(var(--accent) 0%, transparent 0%);
  position:relative;
}
.goal-circle-inner{
  position:absolute;
  top:10px;
  left:10px;
  right:10px;
  bottom:10px;
  background:var(--card);
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
  font-size:14px;
}

/* NOTIFICATION */
.notification{
  position:fixed;
  top:20px;
  left:50%;
  transform:translateX(-50%) translateY(-100px);
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  color:#000;
  padding:15px 25px;
  border-radius:15px;
  font-weight:600;
  box-shadow:0 10px 30px rgba(79,209,255,0.4);
  z-index:1000;
  transition:transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  text-align:center;
}
.notification.show{
  transform:translateX(-50%) translateY(0);
}

/* DRINK HISTORY */
.drink-history{
  margin-top:20px;
  max-height:200px;
  overflow-y:auto;
}
.drink-item{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:12px;
  margin:8px 0;
  background:rgba(255,255,255,0.05);
  border-radius:12px;
  border-left:4px solid var(--accent);
}
.drink-item i{margin-right:10px;color:var(--accent)}
.drink-time{
  font-size:12px;
  color:var(--muted);
}

/* INFO CARD */
.info-card{
  background:rgba(79,209,255,0.1);
  border-radius:15px;
  padding:15px;
  margin:15px 0;
  border-left:4px solid var(--accent);
}
.info-card h4{
  margin:0 0 10px 0;
  color:var(--accent);
  display:flex;
  align-items:center;
  gap:10px;
}
.water-info{
  font-size:12px;
  color:var(--muted);
  margin-top:5px;
  text-align:center;
  padding:5px;
  background:rgba(0,0,0,0.2);
  border-radius:8px;
}
</style>
</head>

<body>

<div class="app">
  <!-- Goal Display -->
  <div class="goal-display">
    <div>Daily Goal</div>
    <div class="goal-progress">
      <div class="goal-circle" id="goalCircle">
        <div class="goal-circle-inner" id="goalPercent">0%</div>
      </div>
    </div>
    <div style="font-size:12px;color:var(--muted)">Stay Hydrated!</div>
  </div>

  <!-- Main Card -->
  <div class="card">
    <h2 style="text-align:center;margin-bottom:10px">Today's Hydration</h2>
    <div style="text-align:center;color:var(--muted);font-size:14px;margin-bottom:20px">
      <i class="fas fa-tint"></i> Track your water intake
    </div>
    
    <div class="bottle">
      <div class="water" id="water"></div>
    </div>
    
    <div id="consumed" style="text-align:center;font-size:32px;font-weight:700;margin:15px 0;color:var(--accent)">0 ml</div>
    <div id="goal" style="text-align:center;font-weight:600;margin-bottom:20px;color:var(--muted)"></div>
    
    <div class="info-card">
      <h4><i class="fas fa-info-circle"></i> Did you know?</h4>
      <div id="hydrationTip" style="font-size:14px;color:var(--muted)">Loading tip...</div>
    </div>
    
    <button onclick="openDrink()" style="display:flex;align-items:center;justify-content:center;gap:10px">
      <i class="fas fa-plus-circle"></i> Add Drink
    </button>
    
    <button onclick="resetToday()" class="secondary">
      <i class="fas fa-redo"></i> Reset Today
    </button>

    <!-- Drink History -->
    <div class="drink-history" id="drinkHistory"></div>
  </div>
</div>

<!-- Notification -->
<div class="notification" id="notification">
  <i class="fas fa-check-circle"></i> Drink added successfully!
</div>

<!-- ONBOARDING -->
<div class="modal" id="onboarding">
  <div class="modal-content card" id="stepBox"></div>
</div>

<!-- DRINK SELECTION -->
<div class="modal" id="drinkModal">
  <div class="modal-content card">
    <h3 style="display:flex;align-items:center;gap:10px"><i class="fas fa-wine-bottle"></i> Select Drink</h3>
    <div class="gender-grid">
      <button onclick="selectDrinkType('water')" style="display:flex;flex-direction:column;align-items:center;gap:5px">
        <i class="fas fa-tint" style="font-size:24px"></i>Water
      </button>
      <button onclick="selectDrinkType('coffee')" style="display:flex;flex-direction:column;align-items:center;gap:5px">
        <i class="fas fa-coffee" style="font-size:24px"></i>Coffee
      </button>
      <button onclick="selectDrinkType('tea')" style="display:flex;flex-direction:column;align-items:center;gap:5px">
        <i class="fas fa-mug-hot" style="font-size:24px"></i>Tea
      </button>
      <button onclick="selectDrinkType('soda')" style="display:flex;flex-direction:column;align-items:center;gap:5px">
        <i class="fas fa-glass-whiskey" style="font-size:24px"></i>Soda
      </button>
      <button onclick="selectDrinkType('juice')" style="display:flex;flex-direction:column;align-items:center;gap:5px">
        <i class="fas fa-apple-alt" style="font-size:24px"></i>Juice
      </button>
      <button onclick="selectDrinkType('milk')" style="display:flex;flex-direction:column;align-items:center;gap:5px">
        <i class="fas fa-wine-bottle" style="font-size:24px"></i>Milk
      </button>
    </div>
    <button onclick="drinkModal.style.display='none'" class="secondary">
      Cancel
    </button>
  </div>
</div>

<!-- AMOUNT SELECTION -->
<div class="modal" id="amountModal">
  <div class="modal-content card">
    <h3 id="amountTitle" style="display:flex;align-items:center;gap:10px"></h3>
    <div class="water-info" id="waterContentInfo"></div>
    <div class="amount-grid" id="amountGrid"></div>
    <button onclick="confirmDrink()" style="margin-top:20px">
      <i class="fas fa-check"></i> Confirm
    </button>
    <button onclick="amountModal.style.display='none'" class="secondary">
      Cancel
    </button>
  </div>
</div>

<div class="nav">
  <i class="fa-solid fa-droplet active"></i>
  <i class="fa-solid fa-user" onclick="startOnboarding()"></i>
  <i class="fa-solid fa-chart-line" onclick="showStats()"></i>
</div>

<script>
/* STATE */
let profile = JSON.parse(localStorage.getItem("profile")) || {};
let data = JSON.parse(localStorage.getItem("data")) || {};
let today = new Date().toDateString();
if(!data[today]) data[today]={consumed:0, drinks:[]};

// Updated with ACTUAL WATER CONTENT percentages (not hydration factors)
const DRINKS = {
  water:{
    waterContent:100, // 100% water
    hydrationFactor:1.0, // Full hydration value
    icon:"fa-tint", 
    color:"#4fd1ff", 
    name:"Water",
    description: "Pure water - 100% hydration"
  },
  coffee:{
    waterContent:98, // 98% water (actual water content in brewed coffee)
    hydrationFactor:0.8, // Reduced due to caffeine's diuretic effect
    icon:"fa-coffee", 
    color:"#8B4513", 
    name:"Coffee",
    description: "Brewed coffee - contains caffeine"
  },
  tea:{
    waterContent:99, // 99% water (actual water content in brewed tea)
    hydrationFactor:0.9, // Slightly reduced due to minimal caffeine
    icon:"fa-mug-hot", 
    color:"#D2691E", 
    name:"Tea",
    description: "Brewed tea - minimal caffeine"
  },
  soda:{
    waterContent:90, // 90% water (actual water content in soda)
    hydrationFactor:0.7, // Reduced due to sugar and caffeine
    icon:"fa-glass-whiskey", 
    color:"#FF6B6B", 
    name:"Soda",
    description: "Carbonated soft drink"
  },
  juice:{
    waterContent:88, // 88% water (actual water content in fruit juice)
    hydrationFactor:0.85, // Good hydration but contains sugars
    icon:"fa-apple-alt", 
    color:"#FFB84D", 
    name:"Juice",
    description: "Fruit juice - contains natural sugars"
  },
  milk:{
    waterContent:87, // 87% water (actual water content in milk)
    hydrationFactor:0.95, // Very good hydration with nutrients
    icon:"fa-wine-bottle", 
    color:"#FFFFFF", 
    name:"Milk",
    description: "Cow's milk - contains nutrients"
  }
};

let selectedDrink = null;
let selectedAmount = 250;

// Hydration tips
const HYDRATION_TIPS = [
  "Drink a glass of water first thing in the morning",
  "Carry a water bottle with you throughout the day",
  "Drink water before, during, and after exercise",
  "Eat water-rich foods like fruits and vegetables",
  "Set hourly reminders to drink water",
  "Your urine color should be pale yellow",
  "Drink more water in hot weather or when ill",
  "Listen to your body's thirst signals"
];

/* HAPTIC */
const haptic=()=>navigator.vibrate&&navigator.vibrate(10);

/* NOTIFICATION */
function showNotification(message){
  const notif=document.getElementById("notification");
  notif.innerHTML=`<i class="fas fa-check-circle"></i> ${message}`;
  notif.classList.add("show");
  setTimeout(()=>notif.classList.remove("show"),3000);
}

/* IMPROVED GOAL CALCULATION */
function calcGoal(){
  if(!profile.weight || !profile.age || !profile.height) {
    return 2000; // Default goal
  }
  
  // Base calculation: 30-35 ml per kg of body weight
  let base = profile.weight * 33;
  
  // Adjust for gender
  if(profile.gender==="male") base *= 1.1;
  if(profile.gender==="female") base *= 0.9;
  
  // Adjust for age (older people need slightly less)
  if(profile.age > 60) base *= 0.9;
  if(profile.age < 18) base *= 0.8;
  
  // Adjust for height (taller people need more)
  if(profile.height > 180) base *= 1.1;
  if(profile.height < 160) base *= 0.9;
  
  // Adjust for activity level (if we had that data)
  // Round to nearest 50ml
  return Math.max(1500, Math.round(base/50)*50);
}

/* UI */
function updateUI(){
  let g=calcGoal(), c=data[today].consumed;
  goal.innerText=`Daily Goal: ${g} ml`;
  consumed.innerText=Math.round(c)+" ml";
  let percent=Math.min(Math.round(c/g*100),100);
  water.style.height=percent+"%";
  
  // Update goal circle
  goalCircle.style.background=`conic-gradient(var(--accent) ${percent}%, transparent ${percent}%)`;
  goalPercent.innerText=percent+"%";
  
  // Update drink history
  updateDrinkHistory();
  
  // Update hydration tip
  updateHydrationTip();
  
  // Save data
  localStorage.setItem("data",JSON.stringify(data));
}

function updateDrinkHistory(){
  const history=document.getElementById("drinkHistory");
  history.innerHTML="<h4 style='margin-bottom:10px'><i class='fas fa-history'></i> Recent Drinks</h4>";
  
  if(!data[today].drinks || data[today].drinks.length===0){
    history.innerHTML+="<div style='text-align:center;color:var(--muted);padding:20px'>No drinks added yet</div>";
    return;
  }
  
  data[today].drinks.slice(-5).reverse().forEach(drink=>{
    const item=document.createElement("div");
    item.className="drink-item";
    item.innerHTML=`
      <div>
        <i class="fas ${DRINKS[drink.type].icon}" style="color:${DRINKS[drink.type].color}"></i>
        ${drink.type.charAt(0).toUpperCase()+drink.type.slice(1)}
        <div class="drink-time">${drink.time} • ${drink.waterContent}ml water</div>
      </div>
      <div>${drink.amount} ml</div>
    `;
    history.appendChild(item);
  });
}

function updateHydrationTip(){
  const tipElement = document.getElementById('hydrationTip');
  const randomTip = HYDRATION_TIPS[Math.floor(Math.random() * HYDRATION_TIPS.length)];
  tipElement.textContent = randomTip;
}

/* ONBOARDING */
let step=0;
function startOnboarding(){
  onboarding.style.display="flex";
  step=0;renderStep();
}
function renderStep(){
  const box=stepBox;
  if(step===0){
    box.innerHTML=`
      <h2 style="display:flex;align-items:center;gap:10px"><i class="fas fa-venus-mars"></i> Select Gender</h2>
      <div class="gender-grid">
        <button onclick="setGender('male')" style="display:flex;flex-direction:column;align-items:center;gap:5px">
          <i class="fas fa-male" style="font-size:24px"></i>Male
        </button>
        <button onclick="setGender('female')" style="display:flex;flex-direction:column;align-items:center;gap:5px">
          <i class="fas fa-female" style="font-size:24px"></i>Female
        </button>
      </div>`;
  }
  if(step===1){
    box.innerHTML=`
      <h2 style="display:flex;align-items:center;gap:10px"><i class="fas fa-weight"></i> Select Weight (kg)</h2>
      <div class="ruler-value" id="wv">${profile.weight||70} kg</div>
      <div class="rwrap">
        <div class="center-line"></div>
        <div class="ruler-container">
          <div class="ruler" id="wr"></div>
        </div>
      </div>
      <div class="manual-input-container">
        <input type="number" class="manual-input" id="weightInput" placeholder="Enter weight" value="${profile.weight||70}" min="30" max="200" step="1">
        <button class="manual-input-btn" onclick="setWeightManual()">Set</button>
      </div>
      <div class="manual-controls">
        <button onclick="adjustWeight(-1)" class="small"><i class="fas fa-minus"></i></button>
        <button onclick="adjustWeight(1)" class="small"><i class="fas fa-plus"></i></button>
      </div>
      <button onclick="next()" style="margin-top:20px">Next</button>`;
    buildRuler(wr,30,200,profile.weight||70,v=>wv.innerText=v+" kg",v=>profile.weight=v);
    setTimeout(() => wr.scrollLeft = ((profile.weight||70) - 30) * 11, 100);
  }
  if(step===2){
    box.innerHTML=`
      <h2 style="display:flex;align-items:center;gap:10px"><i class="fas fa-ruler-vertical"></i> Select Height (cm)</h2>
      <div class="ruler-value" id="hv">${profile.height||170} cm</div>
      <div class="rwrap">
        <div class="center-line"></div>
        <div class="ruler-container">
          <div class="ruler" id="hr"></div>
        </div>
      </div>
      <div class="manual-input-container">
        <input type="number" class="manual-input" id="heightInput" placeholder="Enter height" value="${profile.height||170}" min="100" max="220" step="1">
        <button class="manual-input-btn" onclick="setHeightManual()">Set</button>
      </div>
      <div class="manual-controls">
        <button onclick="adjustHeight(-1)" class="small"><i class="fas fa-minus"></i></button>
        <button onclick="adjustHeight(1)" class="small"><i class="fas fa-plus"></i></button>
      </div>
      <button onclick="next()" style="margin-top:20px">Next</button>`;
    buildRuler(hr,100,220,profile.height||170,v=>hv.innerText=v+" cm",v=>profile.height=v);
    setTimeout(() => hr.scrollLeft = ((profile.height||170) - 100) * 11, 100);
  }
  if(step===3){
    box.innerHTML=`
      <h2 style="display:flex;align-items:center;gap:10px"><i class="fas fa-birthday-cake"></i> Select Age</h2>
      <div class="ruler-value" id="av">${profile.age||25} years</div>
      <div class="age-wheel-container">
        <div class="age-center-line"></div>
        <div class="age-wheel" id="age"></div>
      </div>
      <div class="manual-input-container">
        <input type="number" class="manual-input" id="ageInput" placeholder="Enter age" value="${profile.age||25}" min="10" max="80" step="1">
        <button class="manual-input-btn" onclick="setAgeManual()">Set</button>
      </div>
      <div class="manual-controls">
        <button onclick="adjustAge(-1)" class="small"><i class="fas fa-minus"></i></button>
        <button onclick="adjustAge(1)" class="small"><i class="fas fa-plus"></i></button>
      </div>
      <button onclick="finish()" style="margin-top:20px">Finish Setup</button>`;
    buildAge();
    setTimeout(() => {
      if(age.scrollTo) {
        age.scrollTo({left: ((profile.age||25) - 10) * 31, behavior: 'smooth'});
      } else {
        age.scrollLeft = ((profile.age||25) - 10) * 31;
      }
    }, 100);
  }
}
function setGender(g){
  profile.gender=g;
  haptic();
  next();
}
function setWeightManual(){
  const input = document.getElementById('weightInput');
  const value = parseInt(input.value);
  if(value >= 30 && value <= 200){
    profile.weight = value;
    wv.innerText = value + " kg";
    wr.scrollLeft = (value - 30) * 11;
    haptic();
  }
}
function setHeightManual(){
  const input = document.getElementById('heightInput');
  const value = parseInt(input.value);
  if(value >= 100 && value <= 220){
    profile.height = value;
    hv.innerText = value + " cm";
    hr.scrollLeft = (value - 100) * 11;
    haptic();
  }
}
function setAgeManual(){
  const input = document.getElementById('ageInput');
  const value = parseInt(input.value);
  if(value >= 10 && value <= 80){
    profile.age = value;
    av.innerText = value + " years";
    buildAge();
    if(age.scrollTo) {
      age.scrollTo({left: (value - 10) * 31, behavior: 'smooth'});
    } else {
      age.scrollLeft = (value - 10) * 31;
    }
    haptic();
  }
}
function adjustWeight(change){
  const current = profile.weight || 70;
  const newValue = Math.min(200, Math.max(30, current + change));
  profile.weight = newValue;
  const wv = document.getElementById('wv');
  if(wv) wv.innerText = newValue + " kg";
  const weightInput = document.getElementById('weightInput');
  if(weightInput) weightInput.value = newValue;
  if(wr) wr.scrollLeft = (newValue - 30) * 11;
  haptic();
}
function adjustHeight(change){
  const current = profile.height || 170;
  const newValue = Math.min(220, Math.max(100, current + change));
  profile.height = newValue;
  const hv = document.getElementById('hv');
  if(hv) hv.innerText = newValue + " cm";
  const heightInput = document.getElementById('heightInput');
  if(heightInput) heightInput.value = newValue;
  if(hr) hr.scrollLeft = (newValue - 100) * 11;
  haptic();
}
function adjustAge(change){
  const current = profile.age || 25;
  const newValue = Math.min(80, Math.max(10, current + change));
  profile.age = newValue;
  const av = document.getElementById('av');
  if(av) av.innerText = newValue + " years";
  const ageInput = document.getElementById('ageInput');
  if(ageInput) ageInput.value = newValue;
  buildAge();
  if(age.scrollTo) {
    age.scrollTo({left: (newValue - 10) * 31, behavior: 'smooth'});
  } else {
    age.scrollLeft = (newValue - 10) * 31;
  }
  haptic();
}
function next(){
  step++;
  renderStep();
}
function finish(){
  localStorage.setItem("profile",JSON.stringify(profile));
  onboarding.style.display="none";
  updateUI();
  showNotification("Profile setup completed! Your daily goal is " + calcGoal() + "ml");
}

/* FIXED RULER - 1 unit increments */
function buildRuler(el,min,max,val,show,set){
  el.innerHTML="";
  for(let i=min;i<=max;i++){
    let t=document.createElement("div");
    let tickClass = "tick minor";
    if(i % 5 === 0) tickClass = "tick major5";
    if(i % 10 === 0) tickClass = "tick major";
    t.className = tickClass;
    
    // Show labels for every 10 units
    if(i % 10 === 0){
      let s=document.createElement("span");
      s.innerText=i;
      t.appendChild(s);
    }
    el.appendChild(t);
  }
  
  // Set initial scroll position (11px per unit)
  setTimeout(() => {
    el.scrollLeft = (val - min) * 11;
  }, 50);
  
  let isScrolling;
  el.onscroll=()=>{
    clearTimeout(isScrolling);
    isScrolling=setTimeout(()=>{
      let scrollLeft = el.scrollLeft;
      let v=min+Math.round(scrollLeft/11);
      if(v<min) v=min;
      if(v>max) v=max;
      set(v);
      show(v);
      haptic();
    },50);
  };
  
  // Enable touch scrolling
  el.style.touchAction = 'pan-x';
}

/* FIXED AGE WHEEL - 1 year increments */
function buildAge(){
  const ageElement = document.getElementById('age');
  if(!ageElement) return;
  
  ageElement.innerHTML="";
  const currentAge=profile.age||25;
  
  for(let i=10;i<=80;i++){
    let d=document.createElement("div");
    d.className="age-item"+(i===currentAge?" active":"")+(i % 5 === 0 ? " major" : "");
    d.innerText=i;
    d.onclick=()=>{
      profile.age=i;
      const av = document.getElementById('av');
      if(av) av.innerText=i+" years";
      const ageInput = document.getElementById('ageInput');
      if(ageInput) ageInput.value = i;
      buildAge();
      haptic();
    };
    ageElement.appendChild(d);
  }
  
  // Set initial scroll position (31px per year)
  setTimeout(() => {
    if(ageElement.scrollTo) {
      ageElement.scrollTo({left: (currentAge - 10) * 31, behavior: 'auto'});
    } else {
      ageElement.scrollLeft = (currentAge - 10) * 31;
    }
  }, 50);
  
  // Update active item on scroll
  let ageScrollTimeout;
  ageElement.onscroll = () => {
    clearTimeout(ageScrollTimeout);
    ageScrollTimeout = setTimeout(() => {
      const scrollLeft = ageElement.scrollLeft;
      const newAge = Math.round(10 + scrollLeft / 31);
      if(newAge >= 10 && newAge <= 80){
        profile.age = newAge;
        const av = document.getElementById('av');
        if(av) av.innerText = newAge + " years";
        const ageInput = document.getElementById('ageInput');
        if(ageInput) ageInput.value = newAge;
        buildAge();
        haptic();
      }
    }, 100);
  };
}

/* DRINK SELECTION */
function openDrink(){
  drinkModal.style.display="flex";
}

function selectDrinkType(type){
  selectedDrink=type;
  drinkModal.style.display="none";
  amountModal.style.display="flex";
  
  const drinkInfo=DRINKS[type];
  amountTitle.innerHTML=`<i class="fas ${drinkInfo.icon}" style="color:${drinkInfo.color}"></i> Select ${drinkInfo.name} Amount`;
  
  // Update water content info - NOW SHOWING ACTUAL WATER CONTENT
  const waterInfo = document.getElementById('waterContentInfo');
  waterInfo.innerHTML = `${drinkInfo.description} • Contains ${drinkInfo.waterContent}% water`;
  
  const amounts=[50,100,150,200,250,300,400,500,700,1000];
  const grid=document.getElementById("amountGrid");
  grid.innerHTML="";
  
  amounts.forEach(ml=>{
    const btn=document.createElement("button");
    btn.className="amount-btn"+(ml===selectedAmount?" active":"");
    
    // Calculate ACTUAL WATER CONTENT for this amount (not hydration)
    const actualWater = Math.round(ml * drinkInfo.waterContent / 100);
    
    btn.innerHTML=`
      <div>${ml===1000?"1 Liter":ml+" ml"}</div>
      <div class="amount-detail">${actualWater}ml of water</div>
    `;
    
    btn.onclick=()=>{
      document.querySelectorAll(".amount-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      selectedAmount=ml;
      customInput.value="";
    };
    grid.appendChild(btn);
  });
  
  const customInput=document.createElement("input");
  customInput.type="number";
  customInput.placeholder="Enter custom amount (ml)";
  customInput.className="custom-input";
  customInput.oninput=()=>{
    if(customInput.value){
      selectedAmount=parseInt(customInput.value)||0;
      document.querySelectorAll(".amount-btn").forEach(b=>b.classList.remove("active"));
    }
  };
  grid.appendChild(customInput);
}

function confirmDrink(){
  if(!selectedDrink||!selectedAmount||selectedAmount<=0){
    showNotification("Please select a valid amount");
    return;
  }
  
  const drinkInfo=DRINKS[selectedDrink];
  
  // Calculate ACTUAL WATER CONTENT
  const actualWater = Math.round(selectedAmount * drinkInfo.waterContent / 100);
  
  // Calculate EFFECTIVE HYDRATION (water content adjusted by hydration factor)
  const effectiveHydration = Math.round(actualWater * drinkInfo.hydrationFactor);
  
  data[today].consumed+=effectiveHydration;
  data[today].drinks.push({
    type:selectedDrink,
    amount:selectedAmount,
    waterContent: actualWater, // Store actual water content
    effective:effectiveHydration,
    time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
  });
  
  amountModal.style.display="none";
  updateUI();
  
  // Show clear message about water content vs hydration
  if(selectedDrink === 'water') {
    showNotification(`Added ${selectedAmount}ml of water (${actualWater}ml water → ${effectiveHydration}ml hydration)`);
  } else {
    showNotification(`Added ${selectedAmount}ml ${drinkInfo.name} (${actualWater}ml water → ${effectiveHydration}ml hydration)`);
  }
  haptic();
  
  // Check if goal reached
  if(data[today].consumed>=calcGoal()){
    setTimeout(()=>showNotification("🎉 Daily goal achieved! Great job!"),500);
  }
}

/* STATS */
function showStats(){
  const totalDrinks = data[today]?.drinks?.length || 0;
  const totalWater = data[today]?.drinks?.filter(d => d.type === 'water').length || 0;
  const waterPercentage = totalDrinks > 0 ? Math.round((totalWater / totalDrinks) * 100) : 0;
  
  showNotification(`Today: ${totalDrinks} drinks, ${waterPercentage}% water`);
}

/* RESET FUNCTION */
function resetToday(){
  if(confirm("Are you sure you want to reset today's progress?")){
    data[today] = {consumed:0, drinks:[]};
    localStorage.setItem("data",JSON.stringify(data));
    updateUI();
    showNotification("Today's progress reset successfully");
  }
}

/* INIT */
if(!profile.gender){
  setTimeout(startOnboarding,1000);
}else{
  updateUI();
}
</script>

</body>
</html>
