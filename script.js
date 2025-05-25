// Main Calculation Function (Original)
function calculateScore() {
    // Get input values
    let ksqInput = document.getElementById("ksq").value;
    let bsqInput = document.getElementById("bsq").value;

    // Convert KSQ values into an array of numbers
    let ksqValues = ksqInput.split(",").map(num => parseFloat(num.trim())).filter(num => !isNaN(num));

    // Calculate KSQ average
    let ksqAverage = 0;
    if (ksqValues.length > 0) {
        let ksqSum = ksqValues.reduce((sum, num) => sum + num, 0);
        ksqAverage = ksqSum / ksqValues.length;
    }

    // Convert BSQ to number (default to 0 if empty)
    let bsqScore = parseFloat(bsqInput) || 0;

    // Calculate final score
    let finalScore = (ksqAverage * 0.4) + (bsqScore * 0.6);
    finalScore = parseFloat(finalScore.toFixed(3));

    // Display result with animation
    let resultElement = document.getElementById("result");
    resultElement.innerText = finalScore;
    resultElement.style.animation = "none";
    void resultElement.offsetWidth; // Trigger reflow
    resultElement.style.animation = "pulse 0.5s";
}

// Illik Bal Calculator Functions
function openAnnualCalculator() {
    // Auto-fill first grade with previous result if exists
    const prevResult = parseFloat(document.getElementById("result").innerText);
    if (!isNaN(prevResult)) {
        document.getElementById("grade1").value = prevResult;
    } else {
        document.getElementById("grade1").value = "";
    }
    
    // Show modal
    document.getElementById("annualModal").style.display = "block";
    
    // Close when clicking outside modal
    window.onclick = function(event) {
        if (event.target === document.getElementById("annualModal")) {
            closeAnnualCalculator();
        }
    };
}

function closeAnnualCalculator() {
    document.getElementById("annualModal").style.animation = "fadeOut 0.3s forwards";
    setTimeout(() => {
        document.getElementById("annualModal").style.display = "none";
        document.getElementById("annualModal").style.animation = "";
    }, 300);
}

function calculateAnnualGrade() {
    const grade1 = parseFloat(document.getElementById("grade1").value) || 0;
    const grade2 = parseFloat(document.getElementById("grade2").value);
    const resultElement = document.getElementById("annualResult");
    
    if (isNaN(grade2)) {
        resultElement.innerText = "Xahiş edirəm 2-ci qiyməti daxil edin!";
        resultElement.style.color = "#ff4757";
        return;
    }
    
    const average = (grade1 + grade2) / 2;
    resultElement.innerText = average.toFixed(2);
    resultElement.style.color = "#2ed573";
    
    // Celebration effect
    resultElement.style.transform = "scale(1.1)";
    setTimeout(() => {
        resultElement.style.transform = "scale(1)";
    }, 300);
}

// Add fadeOut animation
document.head.insertAdjacentHTML("beforeend", `
    <style>
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    </style>
`);
