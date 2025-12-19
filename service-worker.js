<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HydroTrack Pro</title>

<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#060b18">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

<style>
:root {
  --bg: #060b18;
  --card: #121a2f;
  --accent: #4fd1ff;
  --accent2: #6b7cff;
  --text: #fff;
  --muted: #9aa4bf;
  --success: #4dffb8;
  --warning: #ffb84d;
  --danger: #ff4d6d;
  --secondary: #8b5cf6;
  --grid-bg: rgba(79, 209, 255, 0.05);
  --glass: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
}

* {
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  -webkit-tap-highlight-color: transparent;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  position: relative;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(79, 209, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(107, 124, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: -1;
}

.app {
  max-width: 480px;
  margin: auto;
  padding: 16px;
  padding-bottom: 100px;
  min-height: 100vh;
  position: relative;
}

/* Floating Particles Background */
.particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.particle {
  position: absolute;
  background: var(--accent);
  border-radius: 50%;
  opacity: 0.1;
  animation: float 20s infinite linear;
}

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(-100vh) rotate(360deg); }
}

/* Enhanced Card */
.card {
  background: linear-gradient(145deg, rgba(18, 26, 47, 0.95), rgba(12, 18, 34, 0.95));
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}

/* Enhanced Bottle with Animation */
.bottle-container {
  position: relative;
  width: 160px;
  height: 320px;
  margin: 24px auto;
  perspective: 1000px;
}

.bottle {
  width: 100%;
  height: 100%;
  border-radius: 40px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 
    inset 0 0 20px rgba(0, 0, 0, 0.5),
    0 10px 30px rgba(79, 209, 255, 0.2);
  transform-style: preserve-3d;
  animation: floatBottle 4s ease-in-out infinite;
}

@keyframes floatBottle {
  0%, 100% { transform: translateY(0) rotateX(5deg); }
  50% { transform: translateY(-10px) rotateX(5deg); }
}

.water {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0%;
  background: linear-gradient(180deg, 
    rgba(123, 231, 255, 0.9) 0%,
    rgba(63, 169, 245, 0.9) 100%);
  transition: height 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  border-radius: 0 0 38px 38px;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.3);
}

.water-wave {
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 20px;
  background: rgba(123, 231, 255, 0.5);
  filter: blur(10px);
  animation: wave 3s infinite linear;
}

@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(50px); }
}

/* Enhanced Buttons */
.btn {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  font-weight: 600;
  color: #000;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(79, 209, 255, 0.4);
}

.btn:hover::before {
  left: 100%;
}

.btn-secondary {
  background: var(--glass);
  color: var(--text);
  border: 1px solid var(--glass-border);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.btn-small {
  padding: 8px 16px;
  width: auto;
  font-size: 14px;
}

/* Enhanced Navigation */
.nav {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(11, 18, 40, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 50px;
  display: flex;
  justify-content: space-around;
  padding: 12px 24px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  z-index: 100;
}

.nav-item {
  position: relative;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 60px;
}

.nav-item i {
  font-size: 20px;
  transition: all 0.3s ease;
}

.nav-item span {
  font-size: 11px;
  font-weight: 500;
  opacity: 0.8;
}

.nav-item.active {
  color: var(--accent);
  background: rgba(79, 209, 255, 0.1);
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent);
}

.nav-item:hover:not(.active) {
  color: var(--text);
  background: rgba(255, 255, 255, 0.05);
}

/* Enhanced Modals */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--glass-border);
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.close-btn {
  background: none;
  border: none;
  color: var(--muted);
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.1);
}

/* Enhanced Rulers with Manual Input */
.input-group {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  margin-bottom: 8px;
  color: var(--muted);
  font-size: 14px;
  font-weight: 500;
}

.input-with-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.manual-input {
  flex: 1;
  padding: 14px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  color: var(--text);
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  outline: none;
  transition: all 0.3s ease;
}

.manual-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(79, 209, 255, 0.2);
}

.unit-btn {
  padding: 10px 16px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  color: var(--text);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 60px;
}

.unit-btn:hover {
  background: rgba(79, 209, 255, 0.1);
  border-color: var(--accent);
}

.ruler-section {
  margin: 30px 0;
}

.ruler-value-display {
  text-align: center;
  font-size: 42px;
  font-weight: 700;
  margin: 20px 0;
  color: var(--accent);
  text-shadow: 0 0 20px rgba(79, 209, 255, 0.5);
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ruler-container {
  position: relative;
  height: 120px;
  margin: 30px -20px;
  overflow: hidden;
}

.ruler-track {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent 10%, 
    var(--glass-border) 10%, 
    var(--glass-border) 90%, 
    transparent 90%);
  transform: translateY(-50%);
}

.ruler-scroll {
  display: flex;
  height: 100%;
  overflow-x: scroll;
  scrollbar-width: none;
  scroll-behavior: smooth;
  padding: 0 50%;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
}

.ruler-scroll::-webkit-scrollbar {
  display: none;
}

.ruler-tick {
  width: 40px;
  flex-shrink: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  scroll-snap-align: center;
}

.tick-line {
  width: 2px;
  background: var(--glass-border);
  transition: all 0.3s ease;
}

.tick-label {
  position: absolute;
  bottom: 25px;
  font-size: 12px;
  color: var(--muted);
  font-weight: 500;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.ruler-tick.active .tick-line {
  height: 40px !important;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
}

.ruler-tick.active .tick-label {
  color: var(--accent);
  opacity: 1;
  font-weight: 600;
  font-size: 14px;
}

.center-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 60px;
  background: var(--accent);
  box-shadow: 0 0 20px var(--accent);
  border-radius: 2px;
  z-index: 2;
}

/* Enhanced Age Selector */
.age-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
}

.age-display {
  font-size: 48px;
  font-weight: 800;
  color: var(--accent);
  margin: 20px 0;
  text-shadow: 0 0 30px rgba(79, 209, 255, 0.5);
}

.age-controls {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 30px;
}

.age-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  color: var(--text);
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.age-btn:hover {
  background: rgba(79, 209, 255, 0.1);
  border-color: var(--accent);
  transform: scale(1.1);
}

/* Stats & Calendar */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 20px 0;
}

.stat-card {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.calendar-container {
  margin: 20px 0;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.calendar-day:hover {
  background: rgba(79, 209, 255, 0.1);
}

.calendar-day.active {
  background: var(--accent);
  color: #000;
  border-color: var(--accent);
  box-shadow: 0 0 20px rgba(79, 209, 255, 0.4);
}

.calendar-day.water-day::after {
  content: '';
  position: absolute;
  bottom: 4px;
  width: 4px;
  height: 4px;
  background: var(--accent);
  border-radius: 50%;
}

/* Settings */
.settings-section {
  margin-bottom: 30px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.setting-item:hover {
  border-color: var(--accent);
  background: rgba(79, 209, 255, 0.05);
}

.setting-label {
  font-weight: 500;
}

.setting-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--glass);
  border: 1px solid var(--glass-border);
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: var(--muted);
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--accent);
  border-color: var(--accent);
}

input:checked + .slider:before {
  transform: translateX(22px);
  background-color: #000;
}

/* Drink Selection */
.drink-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 20px 0;
}

.drink-item {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.drink-item:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.drink-icon {
  font-size: 32px;
  margin-bottom: 5px;
}

.drink-name {
  font-weight: 600;
  font-size: 14px;
}

.drink-percentage {
  font-size: 12px;
  color: var(--muted);
}

/* Amount Selection */
.amount-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 20px 0;
}

.amount-btn {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 16px 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.amount-btn:hover {
  background: rgba(79, 209, 255, 0.1);
  border-color: var(--accent);
}

.amount-btn.active {
  background: var(--accent);
  color: #000;
  border-color: var(--accent);
  box-shadow: 0 0 20px rgba(79, 209, 255, 0.3);
}

.amount-value {
  font-weight: 600;
  font-size: 16px;
}

.amount-water {
  font-size: 11px;
  color: var(--muted);
}

.custom-amount {
  grid-column: span 4;
  padding: 16px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  color: var(--text);
  font-size: 16px;
  text-align: center;
  outline: none;
  transition: all 0.3s ease;
}

.custom-amount:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(79, 209, 255, 0.2);
}

/* Achievements */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 20px 0;
}

.achievement-card {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.achievement-card.locked {
  opacity: 0.5;
  filter: grayscale(1);
}

.achievement-card.earned {
  border-color: var(--accent);
  box-shadow: 0 0 20px rgba(79, 209, 255, 0.2);
}

.achievement-icon {
  font-size: 32px;
  margin-bottom: 10px;
  color: var(--accent);
}

.achievement-name {
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 5px;
}

.achievement-desc {
  font-size: 10px;
  color: var(--muted);
}

/* Progress Indicators */
.progress-container {
  margin: 20px 0;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.progress-bar {
  height: 8px;
  background: var(--glass);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  border-radius: 4px;
  transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Animations */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.pulse {
  animation: pulse 2s infinite;
}

.shimmer {
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.1), 
    transparent);
  background-size: 200% 100%;
  animation: shimmer 3s infinite;
}

/* Mobile Optimizations */
@media (max-width: 480px) {
  .app {
    padding: 12px;
    padding-bottom: 100px;
  }
  
  .card {
    padding: 20px;
    border-radius: 20px;
  }
  
  .drink-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .amount-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .amount-btn {
    padding: 14px 6px;
  }
  
  .nav {
    padding: 10px 20px;
    border-radius: 40px;
  }
  
  .nav-item {
    min-width: 50px;
    padding: 8px;
  }
  
  .nav-item i {
    font-size: 18px;
  }
  
  .nav-item span {
    font-size: 10px;
  }
}

/* Dark Mode Toggle */
.dark-mode-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s ease;
}

.dark-mode-toggle:hover {
  background: rgba(79, 209, 255, 0.1);
  transform: rotate(30deg);
}

/* Loading Animation */
.loading {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--glass-border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Tooltip */
.tooltip {
  position: relative;
}

.tooltip:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  font-size: 12px;
  border-radius: 6px;
  white-space: nowrap;
  z-index: 1000;
  margin-bottom: 8px;
}

.tooltip:hover::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.9);
  margin-bottom: 2px;
  z-index: 1000;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--glass);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent2);
}

/* Selection */
::selection {
  background: rgba(79, 209, 255, 0.3);
  color: var(--text);
}

/* Focus States */
:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}
</style>
</head>

<body>
<!-- Floating Particles -->
<div class="particles" id="particles"></div>

<!-- Dark Mode Toggle -->
<div class="dark-mode-toggle" onclick="toggleDarkMode()">
  <i class="fas fa-moon"></i>
</div>

<div class="app">
  <!-- Main Dashboard -->
  <div id="dashboard" class="screen">
    <!-- Header with Profile -->
    <div class="card" style="position: relative;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div>
          <h1 style="margin: 0; font-size: 28px; font-weight: 700; background: linear-gradient(135deg, var(--accent), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">HydroTrack Pro</h1>
          <p style="margin: 5px 0 0 0; color: var(--muted); font-size: 14px;">Stay Hydrated, Stay Healthy</p>
        </div>
        <div class="btn-small" onclick="openProfile()" style="background: var(--glass); border: 1px solid var(--glass-border); color: var(--text);">
          <i class="fas fa-user"></i>
          <span id="userName">Profile</span>
        </div>
      </div>

      <!-- Goal Progress -->
      <div style="text-align: center; margin-bottom: 30px;">
        <div class="progress-container">
          <div class="progress-header">
            <span style="font-weight: 600; color: var(--accent);">Daily Progress</span>
            <span style="font-weight: 600;" id="progressText">0%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
          </div>
        </div>
      </div>

      <!-- Water Bottle -->
      <div class="bottle-container">
        <div class="bottle">
          <div class="water" id="waterLevel"></div>
          <div class="water-wave"></div>
        </div>
      </div>

      <!-- Stats Display -->
      <div style="text-align: center; margin: 30px 0;">
        <div id="consumedDisplay" style="font-size: 48px; font-weight: 800; color: var(--accent); margin-bottom: 10px; text-shadow: 0 0 20px rgba(79, 209, 255, 0.5);">0 ml</div>
        <div id="goalDisplay" style="color: var(--muted); font-size: 16px;">of 0 ml goal</div>
        <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
          <div style="text-align: center;">
            <div style="font-size: 24px; font-weight: 700; color: var(--accent);" id="drinksCount">0</div>
            <div style="font-size: 12px; color: var(--muted);">Drinks</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 24px; font-weight: 700; color: var(--accent);" id="streakCount">0</div>
            <div style="font-size: 12px; color: var(--muted);">Day Streak</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 24px; font-weight: 700; color: var(--accent);" id="avgHydration">0%</div>
            <div style="font-size: 12px; color: var(--muted);">Avg. Hydration</div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px;">
        <button class="btn" onclick="openDrinkModal()">
          <i class="fas fa-plus"></i> Add Drink
        </button>
        <button class="btn-secondary" onclick="openStats()">
          <i class="fas fa-chart-line"></i> Stats
        </button>
      </div>

      <!-- Recent Activity -->
      <div style="margin-top: 30px;">
        <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600;"><i class="fas fa-history" style="color: var(--accent); margin-right: 10px;"></i>Recent Activity</h3>
        <div id="recentActivity" style="max-height: 200px; overflow-y: auto; padding-right: 10px;">
          <!-- Activity items will be added here -->
        </div>
      </div>
    </div>

    <!-- Today's Summary -->
    <div class="card">
      <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600;"><i class="fas fa-calendar-day" style="color: var(--accent); margin-right: 10px;"></i>Today's Summary</h3>
      <div id="todaySummary">
        <!-- Summary will be added here -->
      </div>
    </div>

    <!-- Quick Tips -->
    <div class="card">
      <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600;"><i class="fas fa-lightbulb" style="color: var(--accent); margin-right: 10px;"></i>Hydration Tip</h3>
      <div id="hydrationTip" style="color: var(--muted); font-size: 14px; line-height: 1.6;">
        Loading tip...
      </div>
    </div>
  </div>

  <!-- Statistics Screen -->
  <div id="statsScreen" class="screen" style="display: none;">
    <div class="card">
      <div class="modal-header">
        <h3><i class="fas fa-chart-line"></i> Statistics</h3>
        <button class="close-btn" onclick="closeStats()"><i class="fas fa-times"></i></button>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value" id="totalConsumed">0</div>
          <div class="stat-label">Total ml</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="avgDaily">0</div>
          <div class="stat-label">Avg Daily</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="bestDay">0</div>
          <div class="stat-label">Best Day</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="completionRate">0%</div>
          <div class="stat-label">Completion</div>
        </div>
      </div>

      <div class="calendar-container">
        <div class="calendar-header">
          <button class="btn-small" onclick="prevMonth()"><i class="fas fa-chevron-left"></i></button>
          <h4 id="currentMonth">January 2024</h4>
          <button class="btn-small" onclick="nextMonth()"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="calendar-grid" id="calendar">
          <!-- Calendar will be generated here -->
        </div>
      </div>

      <div style="margin-top: 30px;">
        <h4 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Weekly Trend</h4>
        <canvas id="weeklyChart" style="width: 100%; height: 200px;"></canvas>
      </div>
    </div>

    <div class="card">
      <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600;"><i class="fas fa-trophy" style="color: var(--accent); margin-right: 10px;"></i>Achievements</h3>
      <div class="achievements-grid" id="achievementsGrid">
        <!-- Achievements will be added here -->
      </div>
    </div>
  </div>

  <!-- Profile Screen -->
  <div id="profileScreen" class="screen" style="display: none;">
    <div class="card">
      <div class="modal-header">
        <h3><i class="fas fa-user-cog"></i> Profile Settings</h3>
        <button class="close-btn" onclick="closeProfile()"><i class="fas fa-times"></i></button>
      </div>

      <div class="input-group">
        <label class="input-label">Your Name</label>
        <input type="text" class="manual-input" id="userNameInput" placeholder="Enter your name">
      </div>

      <div class="ruler-section">
        <label class="input-label">Weight (kg)</label>
        <div class="ruler-value-display" id="weightValue">70</div>
        <div class="input-with-controls">
          <input type="number" class="manual-input" id="weightInput" min="30" max="200" step="0.1" value="70">
          <button class="unit-btn" onclick="adjustWeight(-1)">-1</button>
          <button class="unit-btn" onclick="adjustWeight(1)">+1</button>
        </div>
        <div class="ruler-container">
          <div class="ruler-track"></div>
          <div class="center-indicator"></div>
          <div class="ruler-scroll" id="weightRuler">
            <!-- Weight ruler will be generated here -->
          </div>
        </div>
      </div>

      <div class="ruler-section">
        <label class="input-label">Height (cm)</label>
        <div class="ruler-value-display" id="heightValue">170</div>
        <div class="input-with-controls">
          <input type="number" class="manual-input" id="heightInput" min="100" max="250" step="0.1" value="170">
          <button class="unit-btn" onclick="adjustHeight(-1)">-1</button>
          <button class="unit-btn" onclick="adjustHeight(1)">+1</button>
        </div>
        <div class="ruler-container">
          <div class="ruler-track"></div>
          <div class="center-indicator"></div>
          <div class="ruler-scroll" id="heightRuler">
            <!-- Height ruler will be generated here -->
          </div>
        </div>
      </div>

      <div class="age-selector">
        <label class="input-label">Age</label>
        <div class="age-display" id="ageValue">25</div>
        <div class="age-controls">
          <button class="age-btn" onclick="adjustAge(-1)"><i class="fas fa-minus"></i></button>
          <input type="number" class="manual-input" id="ageInput" min="10" max="100" value="25" style="width: 100px;">
          <button class="age-btn" onclick="adjustAge(1)"><i class="fas fa-plus"></i></button>
        </div>
        <div class="input-with-controls">
          <button class="unit-btn" onclick="setAge(18)">18</button>
          <button class="unit-btn" onclick="setAge(25)">25</button>
          <button class="unit-btn" onclick="setAge(35)">35</button>
          <button class="unit-btn" onclick="setAge(50)">50</button>
        </div>
      </div>

      <div class="input-group">
        <label class="input-label">Daily Goal (ml)</label>
        <div class="input-with-controls">
          <input type="number" class="manual-input" id="dailyGoalInput" min="1000" max="5000" step="50" value="2000">
          <button class="unit-btn" onclick="setGoal('auto')">Auto</button>
        </div>
      </div>

      <button class="btn" onclick="saveProfile()" style="margin-top: 30px;">
        <i class="fas fa-save"></i> Save Profile
      </button>
    </div>

    <div class="card">
      <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600;"><i class="fas fa-bell" style="color: var(--accent); margin-right: 10px;"></i>Reminders</h3>
      
      <div class="settings-section">
        <div class="setting-item">
          <div class="setting-label">Enable Reminders</div>
          <div class="setting-control">
            <label class="switch">
              <input type="checkbox" id="remindersEnabled" checked>
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-label">Reminder Frequency</div>
          <div class="setting-control">
            <select id="reminderFrequency" class="manual-input" style="width: 120px;">
              <option value="60">Every hour</option>
              <option value="120">Every 2 hours</option>
              <option value="180">Every 3 hours</option>
              <option value="240">Every 4 hours</option>
            </select>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-label">Start Time</div>
          <div class="setting-control">
            <input type="time" id="reminderStart" class="manual-input" value="08:00" style="width: 120px;">
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-label">End Time</div>
          <div class="setting-control">
            <input type="time" id="reminderEnd" class="manual-input" value="22:00" style="width: 120px;">
          </div>
        </div>
      </div>

      <button class="btn-secondary" onclick="testReminder()" style="margin-top: 10px;">
        <i class="fas fa-bell"></i> Test Reminder
      </button>
    </div>

    <div class="card">
      <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600;"><i class="fas fa-download" style="color: var(--accent); margin-right: 10px;"></i>Data Management</h3>
      
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <button class="btn-small" onclick="exportData()">
          <i class="fas fa-file-export"></i> Export Data
        </button>
        <button class="btn-small btn-secondary" onclick="importData()">
          <i class="fas fa-file-import"></i> Import Data
        </button>
        <button class="btn-small" onclick="resetData()" style="background: var(--danger);">
          <i class="fas fa-trash"></i> Reset All
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Navigation -->
<div class="nav">
  <div class="nav-item active" onclick="showScreen('dashboard')">
    <i class="fas fa-home"></i>
    <span>Home</span>
  </div>
  <div class="nav-item" onclick="openDrinkModal()">
    <i class="fas fa-plus-circle"></i>
    <span>Add</span>
  </div>
  <div class="nav-item" onclick="showScreen('statsScreen')">
    <i class="fas fa-chart-bar"></i>
    <span>Stats</span>
  </div>
  <div class="nav-item" onclick="showScreen('profileScreen')">
    <i class="fas fa-cog"></i>
    <span>Settings</span>
  </div>
</div>

<!-- Drink Selection Modal -->
<div class="modal" id="drinkModal">
  <div class="modal-content card">
    <div class="modal-header">
      <h3><i class="fas fa-wine-bottle"></i> Add Drink</h3>
      <button class="close-btn" onclick="closeModal('drinkModal')"><i class="fas fa-times"></i></button>
    </div>

    <div class="drink-grid" id="drinkGrid">
      <!-- Drink items will be added here -->
    </div>

    <button class="btn-secondary" onclick="closeModal('drinkModal')" style="margin-top: 20px;">
      Cancel
    </button>
  </div>
</div>

<!-- Amount Selection Modal -->
<div class="modal" id="amountModal">
  <div class="modal-content card">
    <div class="modal-header">
      <h3 id="amountTitle"><i class="fas fa-tint"></i> Select Amount</h3>
      <button class="close-btn" onclick="closeModal('amountModal')"><i class="fas fa-times"></i></button>
    </div>

    <div id="waterContentInfo" style="text-align: center; margin: 15px 0; padding: 15px; background: var(--glass); border-radius: 12px; border: 1px solid var(--glass-border);">
      <!-- Water content info will be added here -->
    </div>

    <div class="amount-grid" id="amountGrid">
      <!-- Amount buttons will be added here -->
    </div>

    <div style="margin-top: 20px;">
      <input type="number" class="custom-amount" id="customAmount" placeholder="Enter custom amount (ml)" min="1" max="5000">
    </div>

    <button class="btn" onclick="confirmDrink()" style="margin-top: 20px;">
      <i class="fas fa-check"></i> Add Drink
    </button>

    <button class="btn-secondary" onclick="closeModal('amountModal')" style="margin-top: 10px;">
      Cancel
    </button>
  </div>
</div>

<!-- Notification -->
<div id="notification" style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%) translateY(-100px); background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #000; padding: 15px 25px; border-radius: 15px; font-weight: 600; box-shadow: 0 10px 30px rgba(79, 209, 255, 0.4); z-index: 1000; transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); text-align: center; display: none;">
  <i class="fas fa-check-circle"></i> <span id="notificationText">Drink added successfully!</span>
</div>

<!-- Import Data Input (Hidden) -->
<input type="file" id="importFile" accept=".json" style="display: none;">

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

<script>
// ============================================
// PROFESSIONAL HYDRATION TRACKER
// Features: College Application Ready
// ============================================

// Initialize Particles
function initParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 20;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 100 + 50;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 20;
    const delay = Math.random() * 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.opacity = Math.random() * 0.05 + 0.02;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.background = `radial-gradient(circle, var(--accent), transparent)`;
    
    particlesContainer.appendChild(particle);
  }
}

// Initialize the application
initParticles();

// ============================================
// DATA STRUCTURE & STATE MANAGEMENT
// ============================================

// Enhanced beverage database with scientific water content
const BEVERAGES = {
  water: {
    name: "Water",
    icon: "fa-tint",
    color: "#4fd1ff",
    waterContent: 100, // 100% water
    hydrationFactor: 1.0,
    description: "Pure hydration - no additives",
    category: "hydration"
  },
  sparkling_water: {
    name: "Sparkling Water",
    icon: "fa-glass-water",
    color: "#6b7cff",
    waterContent: 100,
    hydrationFactor: 1.0,
    description: "Carbonated water - same hydration",
    category: "hydration"
  },
  herbal_tea: {
    name: "Herbal Tea",
    icon: "fa-mug-hot",
    color: "#ffb84d",
    waterContent: 99,
    hydrationFactor: 0.95,
    description: "No caffeine - excellent hydration",
    category: "hot"
  },
  green_tea: {
    name: "Green Tea",
    icon: "fa-leaf",
    color: "#4dff88",
    waterContent: 99,
    hydrationFactor: 0.9,
    description: "Antioxidants - minimal caffeine",
    category: "hot"
  },
  black_coffee: {
    name: "Black Coffee",
    icon: "fa-coffee",
    color: "#8B4513",
    waterContent: 98,
    hydrationFactor: 0.85,
    description: "Caffeine reduces hydration by 15%",
    category: "hot"
  },
  milk: {
    name: "Milk",
    icon: "fa-cow",
    color: "#ffffff",
    waterContent: 87,
    hydrationFactor: 0.95,
    description: "Contains nutrients - good hydration",
    category: "dairy"
  },
  fruit_juice: {
    name: "Fruit Juice",
    icon: "fa-apple-alt",
    color: "#ff6b6b",
    waterContent: 88,
    hydrationFactor: 0.8,
    description: "Natural sugars - moderate hydration",
    category: "juice"
  },
  sports_drink: {
    name: "Sports Drink",
    icon: "fa-bolt",
    color: "#ff4d6d",
    waterContent: 94,
    hydrationFactor: 0.9,
    description: "Electrolytes - good for exercise",
    category: "sports"
  },
  soda: {
    name: "Soda",
    icon: "fa-glass-whiskey",
    color: "#ff4757",
    waterContent: 90,
    hydrationFactor: 0.7,
    description: "High sugar - poor hydration",
    category: "soda"
  },
  smoothie: {
    name: "Smoothie",
    icon: "fa-blender",
    color: "#9d4edd",
    waterContent: 85,
    hydrationFactor: 0.85,
    description: "Nutrient-rich - good hydration",
    category: "smoothie"
  }
};

// Achievement system
const ACHIEVEMENTS = [
  { id: 'first_drink', name: 'First Sip', icon: 'fa-tint', description: 'Log your first drink', earned: false },
  { id: 'daily_goal', name: 'Daily Goal', icon: 'fa-bullseye', description: 'Reach your daily goal', earned: false },
  { id: 'streak_3', name: '3-Day Streak', icon: 'fa-fire', description: '3 consecutive days', earned: false },
  { id: 'streak_7', name: 'Weekly Warrior', icon: 'fa-trophy', description: '7 consecutive days', earned: false },
  { id: 'streak_30', name: 'Monthly Master', icon: 'fa-crown', description: '30 consecutive days', earned: false },
  { id: 'water_only', name: 'Pure Hydration', icon: 'fa-filter', description: 'Only water for a day', earned: false },
  { id: 'early_bird', name: 'Early Bird', icon: 'fa-sun', description: 'Drink water before 8 AM', earned: false },
  { id: 'overachiever', name: 'Overachiever', icon: 'fa-rocket', description: '150% of daily goal', earned: false },
  { id: 'variety', name: 'Variety Seeker', icon: 'fa-star', description: 'Try 5 different drinks', earned: false }
];

// Hydration tips database
const HYDRATION_TIPS = [
  "Start your day with a glass of water to kickstart metabolism",
  "Drink water 30 minutes before meals for better digestion",
  "Your body is about 60% water - keep it replenished!",
  "Dehydration can reduce cognitive performance by up to 30%",
  "Carry a reusable water bottle to stay hydrated on the go",
  "Eat water-rich foods like watermelon, cucumber, and oranges",
  "Listen to your body - thirst is a sign you're already dehydrated",
  "Alcohol and caffeine can dehydrate you - balance with water",
  "Stay hydrated during exercise to maintain performance",
  "Proper hydration helps regulate body temperature",
  "Water helps transport nutrients and oxygen to cells",
  "Adequate hydration improves skin health and complexion",
  "Drinking water can help with weight management",
  "Hydration is crucial for kidney function and detoxification",
  "Even mild dehydration can affect mood and energy levels"
];

// State management
let appState = {
  profile: null,
  todayData: null,
  historicalData: {},
  settings: {},
  achievements: [],
  notifications: [],
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  selectedDrink: null,
  selectedAmount: 250
};

// ============================================
// INITIALIZATION & LOCAL STORAGE
// ============================================

function initializeApp() {
  // Load all data from localStorage
  loadAllData();
  
  // Initialize profile if doesn't exist
  if (!appState.profile) {
    appState.profile = {
      name: "User",
      weight: 70,
      height: 170,
      age: 25,
      gender: "male",
      dailyGoal: calculateDailyGoal(70, 170, 25, "male"),
      createdAt: new Date().toISOString()
    };
  }
  
  // Initialize today's data
  const today = new Date().toDateString();
  if (!appState.todayData || appState.todayData.date !== today) {
    // Check for streak
    checkAndUpdateStreak();
    
    appState.todayData = {
      date: today,
      consumed: 0,
      drinks: [],
      goal: appState.profile.dailyGoal,
      completed: false
    };
  }
  
  // Initialize settings
  if (!appState.settings.reminders) {
    appState.settings = {
      reminders: {
        enabled: true,
        frequency: 120, // minutes
        startTime: "08:00",
        endTime: "22:00"
      },
      notifications: true,
      darkMode: true,
      autoGoal: true
    };
  }
  
  // Initialize achievements
  if (appState.achievements.length === 0) {
    appState.achievements = ACHIEVEMENTS.map(ach => ({ ...ach }));
  }
  
  // Update UI
  updateDashboard();
  updateProfileUI();
  setupReminders();
  checkAchievements();
  
  // Request notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function loadAllData() {
  try {
    appState.profile = JSON.parse(localStorage.getItem('hydrotrack_profile')) || null;
    appState.todayData = JSON.parse(localStorage.getItem('hydrotrack_today')) || null;
    appState.historicalData = JSON.parse(localStorage.getItem('hydrotrack_history')) || {};
    appState.settings = JSON.parse(localStorage.getItem('hydrotrack_settings')) || {};
    appState.achievements = JSON.parse(localStorage.getItem('hydrotrack_achievements')) || [];
  } catch (e) {
    console.error('Error loading data:', e);
  }
}

function saveAllData() {
  try {
    localStorage.setItem('hydrotrack_profile', JSON.stringify(appState.profile));
    localStorage.setItem('hydrotrack_today', JSON.stringify(appState.todayData));
    localStorage.setItem('hydrotrack_history', JSON.stringify(appState.historicalData));
    localStorage.setItem('hydrotrack_settings', JSON.stringify(appState.settings));
    localStorage.setItem('hydrotrack_achievements', JSON.stringify(appState.achievements));
  } catch (e) {
    console.error('Error saving data:', e);
  }
}

// ============================================
// CORE FUNCTIONS
// ============================================

function calculateDailyGoal(weight, height, age, gender) {
  // Advanced goal calculation based on scientific formulas
  let base = weight * 30; // 30ml per kg
  
  // Adjust for height (taller = more water)
  const heightFactor = height / 170; // Normalize to 170cm
  base *= heightFactor;
  
  // Adjust for age
  if (age < 18) base *= 0.8;
  else if (age > 50) base *= 0.9;
  
  // Adjust for gender
  if (gender === 'male') base *= 1.1;
  else if (gender === 'female') base *= 0.9;
  
  // Round to nearest 50ml
  return Math.max(1500, Math.round(base / 50) * 50);
}

function checkAndUpdateStreak() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();
  
  if (appState.historicalData[yesterdayStr]) {
    if (appState.historicalData[yesterdayStr].completed) {
      appState.profile.currentStreak = (appState.profile.currentStreak || 0) + 1;
      appState.profile.bestStreak = Math.max(appState.profile.bestStreak || 0, appState.profile.currentStreak);
    } else {
      appState.profile.currentStreak = 0;
    }
  }
}

function addDrink(type, amount) {
  const drink = BEVERAGES[type];
  if (!drink) return;
  
  const waterContent = Math.round(amount * drink.waterContent / 100);
  const effectiveHydration = Math.round(waterContent * drink.hydrationFactor);
  
  const drinkRecord = {
    type,
    amount,
    waterContent,
    effectiveHydration,
    timestamp: new Date().toISOString(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  
  appState.todayData.consumed += effectiveHydration;
  appState.todayData.drinks.push(drinkRecord);
  
  // Check if goal reached
  if (!appState.todayData.completed && appState.todayData.consumed >= appState.todayData.goal) {
    appState.todayData.completed = true;
    unlockAchievement('daily_goal');
    showNotification("🎉 Daily goal achieved! Great work!", "success");
  }
  
  // Check for first drink achievement
  if (appState.todayData.drinks.length === 1) {
    unlockAchievement('first_drink');
  }
  
  // Save and update
  saveAllData();
  updateDashboard();
  
  // Show notification
  showNotification(`Added ${amount}ml of ${drink.name} (${waterContent}ml water)`, "success");
  
  // Check other achievements
  checkAchievements();
}

// ============================================
// UI UPDATES & RENDERERS
// ============================================

function updateDashboard() {
  const consumed = appState.todayData.consumed;
  const goal = appState.todayData.goal;
  const progress = Math.min(Math.round((consumed / goal) * 100), 100);
  
  // Update progress bar
  document.getElementById('progressFill').style.width = `${progress}%`;
  document.getElementById('progressText').textContent = `${progress}%`;
  
  // Update water level
  const waterLevel = document.getElementById('waterLevel');
  waterLevel.style.height = `${progress}%`;
  
  // Update displays
  document.getElementById('consumedDisplay').textContent = `${consumed.toLocaleString()} ml`;
  document.getElementById('goalDisplay').textContent = `of ${goal.toLocaleString()} ml goal`;
  document.getElementById('drinksCount').textContent = appState.todayData.drinks.length;
  document.getElementById('streakCount').textContent = appState.profile.currentStreak || 0;
  
  // Calculate average hydration
  const totalDays = Object.keys(appState.historicalData).length || 1;
  const totalCompletion = Object.values(appState.historicalData).filter(d => d.completed).length;
  const avgHydration = Math.round((totalCompletion / totalDays) * 100);
  document.getElementById('avgHydration').textContent = `${avgHydration}%`;
  
  // Update recent activity
  updateRecentActivity();
  
  // Update today's summary
  updateTodaySummary();
  
  // Update hydration tip
  updateHydrationTip();
}

function updateRecentActivity() {
  const container = document.getElementById('recentActivity');
  container.innerHTML = '';
  
  const recentDrinks = appState.todayData.drinks.slice(-5).reverse();
  
  if (recentDrinks.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 20px; color: var(--muted);">
        <i class="fas fa-tint" style="font-size: 24px; margin-bottom: 10px; display: block; opacity: 0.5;"></i>
        No drinks added yet today
      </div>
    `;
    return;
  }
  
  recentDrinks.forEach(drink => {
    const beverage = BEVERAGES[drink.type];
    const item = document.createElement('div');
    item.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      margin-bottom: 8px;
      background: var(--glass);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      transition: all 0.3s ease;
    `;
    item.onmouseover = () => item.style.borderColor = beverage.color;
    item.onmouseout = () => item.style.borderColor = 'var(--glass-border)';
    
    item.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <i class="fas ${beverage.icon}" style="color: ${beverage.color}; font-size: 20px;"></i>
        <div>
          <div style="font-weight: 600; font-size: 14px;">${beverage.name}</div>
          <div style="font-size: 12px; color: var(--muted);">${drink.time}</div>
        </div>
      </div>
      <div style="text-align: right;">
        <div style="font-weight: 700; font-size: 16px;">${drink.amount}ml</div>
        <div style="font-size: 11px; color: var(--accent);">${drink.waterContent}ml water</div>
      </div>
    `;
    
    container.appendChild(item);
  });
}

function updateTodaySummary() {
  const container = document.getElementById('todaySummary');
  const drinks = appState.todayData.drinks;
  
  if (drinks.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 20px; color: var(--muted);">
        Start your hydration journey by adding your first drink!
      </div>
    `;
    return;
  }
  
  // Calculate statistics
  const totalWater = drinks.reduce((sum, drink) => sum + drink.waterContent, 0);
  const drinkTypes = [...new Set(drinks.map(d => d.type))];
  const mostFrequent = drinks.reduce((acc, drink) => {
    acc[drink.type] = (acc[drink.type] || 0) + 1;
    return acc;
  }, {});
  
  const favoriteDrink = Object.entries(mostFrequent).sort((a, b) => b[1] - a[1])[0];
  
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
      <div style="background: var(--glass); border: 1px solid var(--glass-border); border-radius: 12px; padding: 16px; text-align: center;">
        <div style="font-size: 12px; color: var(--muted); margin-bottom: 5px;">Total Water</div>
        <div style="font-size: 24px; font-weight: 700; color: var(--accent);">${totalWater}ml</div>
      </div>
      <div style="background: var(--glass); border: 1px solid var(--glass-border); border-radius: 12px; padding: 16px; text-align: center;">
        <div style="font-size: 12px; color: var(--muted); margin-bottom: 5px;">Variety</div>
        <div style="font-size: 24px; font-weight: 700; color: var(--accent);">${drinkTypes.length}</div>
      </div>
    </div>
    <div style="margin-top: 16px; padding: 16px; background: var(--glass); border: 1px solid var(--glass-border); border-radius: 12px;">
      <div style="font-size: 12px; color: var(--muted); margin-bottom: 8px;">Favorite Drink</div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <i class="fas ${BEVERAGES[favoriteDrink[0]].icon}" style="color: ${BEVERAGES[favoriteDrink[0]].color}; font-size: 24px;"></i>
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 16px;">${BEVERAGES[favoriteDrink[0]].name}</div>
          <div style="font-size: 12px; color: var(--muted);">${favoriteDrink[1]} times today</div>
        </div>
      </div>
    </div>
  `;
}

function updateHydrationTip() {
  const tip = HYDRATION_TIPS[Math.floor(Math.random() * HYDRATION_TIPS.length)];
  document.getElementById('hydrationTip').textContent = tip;
}

// ============================================
// PROFILE MANAGEMENT
// ============================================

function updateProfileUI() {
  if (!appState.profile) return;
  
  const profile = appState.profile;
  
  // Update user name
  document.getElementById('userName').textContent = profile.name || 'Profile';
  document.getElementById('userNameInput').value = profile.name || '';
  
  // Update weight
  document.getElementById('weightValue').textContent = profile.weight;
  document.getElementById('weightInput').value = profile.weight;
  
  // Update height
  document.getElementById('heightValue').textContent = profile.height;
  document.getElementById('heightInput').value = profile.height;
  
  // Update age
  document.getElementById('ageValue').textContent = profile.age;
  document.getElementById('ageInput').value = profile.age;
  
  // Update daily goal
  document.getElementById('dailyGoalInput').value = profile.dailyGoal || 2000;
  
  // Update settings
  document.getElementById('remindersEnabled').checked = appState.settings.reminders?.enabled || true;
  document.getElementById('reminderFrequency').value = appState.settings.reminders?.frequency || 120;
  document.getElementById('reminderStart').value = appState.settings.reminders?.startTime || "08:00";
  document.getElementById('reminderEnd').value = appState.settings.reminders?.endTime || "22:00";
  
  // Initialize rulers
  initRuler('weightRuler', 30, 200, profile.weight, 'kg', (value) => {
    profile.weight = value;
    updateProfileUI();
  });
  
  initRuler('heightRuler', 100, 250, profile.height, 'cm', (value) => {
    profile.height = value;
    updateProfileUI();
  });
  
  // Update drink grid
  updateDrinkGrid();
  
  // Update achievements
  updateAchievementsGrid();
}

function initRuler(containerId, min, max, initial, unit, onChange) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  
  // Create ticks every 5 units, label every 10
  for (let i = min; i <= max; i++) {
    const tick = document.createElement('div');
    tick.className = 'ruler-tick';
    if (i === initial) tick.classList.add('active');
    
    const isMajor = i % 10 === 0;
    const lineHeight = isMajor ? 30 : (i % 5 === 0 ? 20 : 10);
    
    tick.innerHTML = `
      <div class="tick-line" style="height: ${lineHeight}px;"></div>
      ${isMajor ? `<div class="tick-label">${i}${unit}</div>` : ''}
    `;
    
    tick.onclick = () => {
      onChange(i);
      updateRuler(containerId, i);
    };
    
    container.appendChild(tick);
  }
  
  // Scroll to initial value
  setTimeout(() => {
    const tickWidth = 40;
    const centerOffset = container.clientWidth / 2;
    const targetTick = Array.from(container.children).find(t => parseInt(t.querySelector('.tick-label')?.textContent) === initial);
    if (targetTick) {
      const tickIndex = Array.from(container.children).indexOf(targetTick);
      container.scrollLeft = (tickIndex * tickWidth) - centerOffset + (tickWidth / 2);
    }
  }, 100);
}

function updateRuler(containerId, value) {
  const container = document.getElementById(containerId);
  Array.from(container.children).forEach(tick => {
    const label = tick.querySelector('.tick-label');
    if (label) {
      const tickValue = parseInt(label.textContent);
      tick.classList.toggle('active', tickValue === value);
    }
  });
}

function adjustWeight(change) {
  const input = document.getElementById('weightInput');
  let value = parseFloat(input.value) + change;
  value = Math.max(30, Math.min(200, value));
  input.value = value.toFixed(1);
  appState.profile.weight = value;
  updateProfileUI();
}

function adjustHeight(change) {
  const input = document.getElementById('heightInput');
  let value = parseFloat(input.value) + change;
  value = Math.max(100, Math.min(250, value));
  input.value = value.toFixed(1);
  appState.profile.height = value;
  updateProfileUI();
}

function adjustAge(change) {
  const input = document.getElementById('ageInput');
  let value = parseInt(input.value) + change;
  value = Math.max(10, Math.min(100, value));
  input.value = value;
  appState.profile.age = value;
  updateProfileUI();
}

function setAge(age) {
  const input = document.getElementById('ageInput');
  input.value = age;
  appState.profile.age = age;
  updateProfileUI();
}

function setGoal(type) {
  if (type === 'auto') {
    const goal = calculateDailyGoal(
      appState.profile.weight,
      appState.profile.height,
      appState.profile.age,
      appState.profile.gender
    );
    document.getElementById('dailyGoalInput').value = goal;
    appState.profile.dailyGoal = goal;
    appState.todayData.goal = goal;
  }
}

function saveProfile() {
  // Save profile data
  appState.profile.name = document.getElementById('userNameInput').value || 'User';
  appState.profile.weight = parseFloat(document.getElementById('weightInput').value);
  appState.profile.height = parseFloat(document.getElementById('heightInput').value);
  appState.profile.age = parseInt(document.getElementById('ageInput').value);
  appState.profile.dailyGoal = parseInt(document.getElementById('dailyGoalInput').value);
  
  // Save settings
  appState.settings.reminders = {
    enabled: document.getElementById('remindersEnabled').checked,
    frequency: parseInt(document.getElementById('reminderFrequency').value),
    startTime: document.getElementById('reminderStart').value,
    endTime: document.getElementById('reminderEnd').value
  };
  
  // Update today's goal
  appState.todayData.goal = appState.profile.dailyGoal;
  
  // Save and update
  saveAllData();
  updateDashboard();
  setupReminders();
  
  showNotification("Profile saved successfully!", "success");
  closeProfile();
}

// ============================================
// DRINK MANAGEMENT
// ============================================

function updateDrinkGrid() {
  const container = document.getElementById('drinkGrid');
  container.innerHTML = '';
  
  Object.entries(BEVERAGES).forEach(([key, drink]) => {
    const item = document.createElement('div');
    item.className = 'drink-item';
    item.onclick = () => selectDrink(key);
    
    item.innerHTML = `
      <i class="fas ${drink.icon} drink-icon" style="color: ${drink.color};"></i>
      <div class="drink-name">${drink.name}</div>
      <div class="drink-percentage">${drink.waterContent}% water</div>
    `;
    
    container.appendChild(item);
  });
}

function selectDrink(type) {
  appState.selectedDrink = type;
  const drink = BEVERAGES[type];
  
  document.getElementById('amountTitle').innerHTML = `
    <i class="fas ${drink.icon}" style="color: ${drink.color};"></i> ${drink.name}
  `;
  
  document.getElementById('waterContentInfo').innerHTML = `
    <div style="font-weight: 600; margin-bottom: 5px;">${drink.description}</div>
    <div style="font-size: 14px; color: var(--accent);">Contains ${drink.waterContent}% water • ${Math.round(drink.hydrationFactor * 100)}% hydration efficiency</div>
  `;
  
  // Update amount grid
  const amounts = [100, 200, 250, 300, 400, 500, 750, 1000];
  const container = document.getElementById('amountGrid');
  container.innerHTML = '';
  
  amounts.forEach(amount => {
    const waterAmount = Math.round(amount * drink.waterContent / 100);
    const btn = document.createElement('button');
    btn.className = 'amount-btn';
    if (amount === appState.selectedAmount) btn.classList.add('active');
    
    btn.innerHTML = `
      <div class="amount-value">${amount === 1000 ? '1L' : `${amount}ml`}</div>
      <div class="amount-water">${waterAmount}ml water</div>
    `;
    
    btn.onclick = () => {
      document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.selectedAmount = amount;
      document.getElementById('customAmount').value = '';
    };
    
    container.appendChild(btn);
  });
  
  closeModal('drinkModal');
  openModal('amountModal');
}

function confirmDrink() {
  let amount = appState.selectedAmount;
  const customAmount = parseInt(document.getElementById('customAmount').value);
  
  if (customAmount && customAmount > 0) {
    amount = customAmount;
  }
  
  if (!appState.selectedDrink || amount <= 0) {
    showNotification("Please select a valid amount", "error");
    return;
  }
  
  addDrink(appState.selectedDrink, amount);
  closeModal('amountModal');
  appState.selectedDrink = null;
  appState.selectedAmount = 250;
}

// ============================================
// STATISTICS & ACHIEVEMENTS
// ============================================

function openStats() {
  showScreen('statsScreen');
  updateStatistics();
  renderCalendar();
  renderWeeklyChart();
}

function updateStatistics() {
  const history = appState.historicalData;
  const days = Object.values(history);
  
  if (days.length === 0) {
    document.getElementById('totalConsumed').textContent = '0';
    document.getElementById('avgDaily').textContent = '0';
    document.getElementById('bestDay').textContent = '0';
    document.getElementById('completionRate').textContent = '0%';
    return;
  }
  
  const totalConsumed = days.reduce((sum, day) => sum + day.consumed, 0);
  const avgDaily = Math.round(totalConsumed / days.length);
  const bestDay = Math.max(...days.map(d => d.consumed));
  const completionRate = Math.round((days.filter(d => d.completed).length / days.length) * 100);
  
  document.getElementById('totalConsumed').textContent = Math.round(totalConsumed / 1000).toLocaleString();
  document.getElementById('avgDaily').textContent = avgDaily.toLocaleString();
  document.getElementById('bestDay').textContent = bestDay.toLocaleString();
  document.getElementById('completionRate').textContent = `${completionRate}%`;
}

function renderCalendar() {
  const container = document.getElementById('calendar');
  const month = appState.currentMonth;
  const year = appState.currentYear;
  
  // Update month display
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
  
  // Get first day of month
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  container.innerHTML = '';
  
  // Day headers
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayNames.forEach(day => {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = day;
    dayElement.style.opacity = '0.5';
    dayElement.style.fontWeight = '600';
    container.appendChild(dayElement);
  });
  
  // Empty cells for days before first day
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'calendar-day';
    empty.style.opacity = '0.3';
    container.appendChild(empty);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = date.toDateString();
    const dayData = appState.historicalData[dateStr];
    
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = day;
    
    if (dayData) {
      if (dayData.completed) {
        dayElement.classList.add('active');
      }
      if (dayData.consumed > 0) {
        dayElement.classList.add('water-day');
      }
    }
    
    if (date.toDateString() === new Date().toDateString()) {
      dayElement.style.border = '2px solid var(--accent)';
    }
    
    container.appendChild(dayElement);
  }
}

function renderWeeklyChart() {
  const ctx = document.getElementById('weeklyChart').getContext('2d');
  
  // Get last 7 days
  const labels = [];
  const data = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toDateString();
    const dayData = appState.historicalData[dateStr];
    
    labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
    data.push(dayData ? dayData.consumed : 0);
  }
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Water Intake (ml)',
        data: data,
        backgroundColor: 'rgba(79, 209, 255, 0.6)',
        borderColor: 'var(--accent)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'var(--muted)'
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: 'var(--muted)'
          }
        }
      }
    }
  });
}

function updateAchievementsGrid() {
  const container = document.getElementById('achievementsGrid');
  container.innerHTML = '';
  
  appState.achievements.forEach(achievement => {
    const card = document.createElement('div');
    card.className = `achievement-card ${achievement.earned ? 'earned' : 'locked'}`;
    card.title = achievement.description;
    
    card.innerHTML = `
      <div class="achievement-icon">
        <i class="fas ${achievement.icon}"></i>
      </div>
      <div class="achievement-name">${achievement.name}</div>
      <div class="achievement-desc">${achievement.description}</div>
    `;
    
    container.appendChild(card);
  });
}

function checkAchievements() {
  // Check streak achievements
  const streak = appState.profile.currentStreak || 0;
  if (streak >= 3) unlockAchievement('streak_3');
  if (streak >= 7) unlockAchievement('streak_7');
  if (streak >= 30) unlockAchievement('streak_30');
  
  // Check variety achievement
  const uniqueDrinks = [...new Set(appState.todayData.drinks.map(d => d.type))];
  if (uniqueDrinks.length >= 5) unlockAchievement('variety');
  
  // Check overachiever
  const progress = (appState.todayData.consumed / appState.todayData.goal) * 100;
  if (progress >= 150) unlockAchievement('overachiever');
  
  // Check early bird
  const earlyDrinks = appState.todayData.drinks.filter(d => {
    const hour = new Date(d.timestamp).getHours();
    return hour < 8;
  });
  if (earlyDrinks.length > 0) unlockAchievement('early_bird');
  
  // Check water only
  const onlyWater = appState.todayData.drinks.every(d => d.type === 'water');
  if (onlyWater && appState.todayData.drinks.length > 0) unlockAchievement('water_only');
}

function unlockAchievement(id) {
  const achievement = appState.achievements.find(a => a.id === id);
  if (achievement && !achievement.earned) {
    achievement.earned = true;
    saveAllData();
    updateAchievementsGrid();
    showNotification(`🎉 Achievement Unlocked: ${achievement.name}`, "success");
  }
}

// ============================================
// NOTIFICATIONS & REMINDERS
// ============================================

function setupReminders() {
  if (!appState.settings.reminders?.enabled) return;
  
  clearReminders();
  
  const frequency = appState.settings.reminders.frequency;
  const startTime = appState.settings.reminders.startTime;
  const endTime = appState.settings.reminders.endTime;
  
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  const now = new Date();
  let nextTime = new Date();
  
  // Set to start time
  nextTime.setHours(startHour, startMinute, 0, 0);
  
  // If start time has passed today, start from next interval
  if (nextTime < now) {
    const intervalsSinceStart = Math.ceil((now - nextTime) / (frequency * 60000));
    nextTime.setTime(nextTime.getTime() + intervalsSinceStart * frequency * 60000);
  }
  
  // Schedule reminders
  while (nextTime.getHours() < endHour || (nextTime.getHours() === endHour && nextTime.getMinutes() <= endMinute)) {
    const timeUntil = nextTime.getTime() - now.getTime();
    if (timeUntil > 0) {
      setTimeout(() => sendReminder(), timeUntil);
    }
    nextTime.setTime(nextTime.getTime() + frequency * 60000);
  }
}

function clearReminders() {
  // In a real app, we would clear all scheduled timeouts
  // For simplicity, we'll just note that reminders are cleared
  console.log('Reminders cleared');
}

function sendReminder() {
  if (!appState.settings.reminders?.enabled) return;
  
  const progress = (appState.todayData.consumed / appState.todayData.goal) * 100;
  let message = "💧 Time to hydrate!";
  
  if (progress < 25) {
    message = "💧 Start your hydration journey! Drink some water.";
  } else if (progress < 50) {
    message = "💧 Keep going! You're making good progress.";
  } else if (progress < 75) {
    message = "💧 Halfway there! Stay hydrated.";
  } else if (progress < 100) {
    message = "💧 Almost at your goal! One more drink.";
  } else {
    message = "🎉 Goal achieved! Maintain your hydration.";
  }
  
  showNotification(message, "reminder");
  
  // Schedule next reminder
  const frequency = appState.settings.reminders.frequency;
  setTimeout(() => sendReminder(), frequency * 60000);
}

function testReminder() {
  sendReminder();
}

// ============================================
// DATA IMPORT/EXPORT
// ============================================

function exportData() {
  const data = {
    profile: appState.profile,
    historicalData: appState.historicalData,
    achievements: appState.achievements,
    settings: appState.settings,
    exportDate: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hydrotrack-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showNotification("Data exported successfully!", "success");
}

function importData() {
  document.getElementById('importFile').click();
}

function handleImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      
      if (confirm("This will replace all your current data. Continue?")) {
        appState.profile = data.profile || appState.profile;
        appState.historicalData = data.historicalData || appState.historicalData;
        appState.achievements = data.achievements || appState.achievements;
        appState.settings = data.settings || appState.settings;
        
        saveAllData();
        updateDashboard();
        updateProfileUI();
        
        showNotification("Data imported successfully!", "success");
      }
    } catch (error) {
      showNotification("Error importing data. Invalid file format.", "error");
    }
  };
  reader.readAsText(file);
  
  // Reset file input
  event.target.value = '';
}

function resetData() {
  if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
    localStorage.clear();
    location.reload();
  }
}

// ============================================
// UI HELPER FUNCTIONS
// ============================================

function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.style.display = 'none';
  });
  
  // Show target screen
  document.getElementById(screenId).style.display = 'block';
  
  // Update navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Set dashboard as active by default (nav items handle their own)
  if (screenId === 'dashboard') {
    document.querySelector('.nav-item:nth-child(1)').classList.add('active');
  }
}

function openProfile() {
  showScreen('profileScreen');
  document.querySelector('.nav-item:nth-child(4)').classList.add('active');
}

function closeProfile() {
  showScreen('dashboard');
}

function openDrinkModal() {
  openModal('drinkModal');
}

function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  const text = document.getElementById('notificationText');
  
  text.textContent = message;
  
  // Set color based on type
  if (type === 'error') {
    notification.style.background = 'linear-gradient(135deg, var(--danger), #ff6b6b)';
  } else if (type === 'reminder') {
    notification.style.background = 'linear-gradient(135deg, var(--secondary), #8b5cf6)';
  } else {
    notification.style.background = 'linear-gradient(135deg, var(--accent), var(--accent2))';
  }
  
  notification.style.display = 'block';
  notification.style.transform = 'translateX(-50%) translateY(0)';
  
  setTimeout(() => {
    notification.style.transform = 'translateX(-50%) translateY(-100px)';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 500);
  }, 3000);
}

function toggleDarkMode() {
  const root = document.documentElement;
  const isDark = root.style.getPropertyValue('--bg') === '#060b18' || !root.style.getPropertyValue('--bg');
  
  if (isDark) {
    // Switch to light mode
    root.style.setProperty('--bg', '#f0f2f5');
    root.style.setProperty('--card', '#ffffff');
    root.style.setProperty('--text', '#2d3436');
    root.style.setProperty('--muted', '#636e72');
    root.style.setProperty('--glass', 'rgba(255, 255, 255, 0.7)');
    root.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.1)');
    document.querySelector('.dark-mode-toggle i').className = 'fas fa-sun';
  } else {
    // Switch to dark mode
    root.style.setProperty('--bg', '#060b18');
    root.style.setProperty('--card', '#121a2f');
    root.style.setProperty('--text', '#ffffff');
    root.style.setProperty('--muted', '#9aa4bf');
    root.style.setProperty('--glass', 'rgba(255, 255, 255, 0.05)');
    root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.1)');
    document.querySelector('.dark-mode-toggle i').className = 'fas fa-moon';
  }
}

function prevMonth() {
  appState.currentMonth--;
  if (appState.currentMonth < 0) {
    appState.currentMonth = 11;
    appState.currentYear--;
  }
  renderCalendar();
}

function nextMonth() {
  appState.currentMonth++;
  if (appState.currentMonth > 11) {
    appState.currentMonth = 0;
    appState.currentYear++;
  }
  renderCalendar();
}

function closeStats() {
  showScreen('dashboard');
}

// ============================================
// INITIALIZE APP
// ============================================

// Initialize file import handler
document.getElementById('importFile').addEventListener('change', handleImport);

// Initialize the application
window.addEventListener('load', initializeApp);

// Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('Service Worker registered:', registration);
    })
    .catch(error => {
      console.log('Service Worker registration failed:', error);
    });
}
</script>
</body>
</html>
