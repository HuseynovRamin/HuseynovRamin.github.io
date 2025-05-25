// Main Score Calculator
function calculateScore() {
    let ksqInput = document.getElementById("ksq").value;
    let bsqInput = document.getElementById("bsq").value;

    // Parse and validate KQS values
    let ksqValues = ksqInput
        .split(",")
        .map(num => parseFloat(num.trim()))
        .filter(num => !isNaN(num));

    let ksqAverage = 0;
    if (ksqValues.length > 0) {
        let ksqSum = ksqValues.reduce((sum, num) => sum + num, 0);
        ksqAverage = ksqSum / ksqValues.length;
    }

    // Parse BSQ value
    let bsqScore = parseFloat(bsqInput) || 0;

    // Weighted calculation
    let finalScore = (ksqAverage * 0.4) + (bsqScore * 0.6);
    finalScore = parseFloat(finalScore.toFixed(2));

    // Show result
    let resultElement = document.getElementById("result");
    resultElement.innerText = finalScore;

    // Animate result
    resultElement.style.animation = "none";
    void resultElement.offsetWidth; // trigger reflow
    resultElement.style.animation = "pulse 0.5s";
}

// Open annual grade modal
function openAnnualCalculator() {
    document.getElementById("annualModal").style.display = "block";
}

// Close annual grade modal
function closeAnnualCalculator() {
    document.getElementById("annualModal").style.display = "none";
}

// Calculate Annual Grade
function calculateAnnualGrade() {
    const grade1 = parseFloat(document.getElementById("grade1").value);
    const grade2 = parseFloat(document.getElementById("grade2").value);
    const resultElement = document.getElementById("annualResult");

    if (isNaN(grade1) || isNaN(grade2)) {
        resultElement.innerText = "Zəhmət olmasa hər iki qiyməti daxil edin!";
        resultElement.style.color = "#ff4757";
        return;
    }

    const average = (grade1 + grade2) / 2;
    resultElement.innerText = average.toFixed(2);
    resultElement.style.color = "#2ed573";
    resultElement.style.transform = "scale(1.1)";
    setTimeout(() => {
        resultElement.style.transform = "scale(1)";
    }, 300);
}
