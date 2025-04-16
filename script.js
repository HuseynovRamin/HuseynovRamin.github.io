// Function to calculate academic score
function calculateScore() {
    document.getElementById("loading").style.display = "block";
    setTimeout(() => {
        let ksqInput = document.getElementById("ksq").value;
        let bsqInput = document.getElementById("bsq").value;

        // Validate KQS input
        let ksqValues = ksqInput.split(",").map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
        if (ksqValues.length === 0) {
            alert("Zəhmət olmasa düzgün KQS qiymətləri daxil edin.");
            document.getElementById("loading").style.display = "none";
            return;
        }

        // Validate BSQ input
        let bsqScore = parseFloat(bsqInput);
        if (isNaN(bsqScore)) bsqScore = 0;

        // Calculate KQS average
        let ksqAverage = ksqValues.reduce((sum, num) => sum + num, 0) / ksqValues.length;

        // Calculate final score
        let finalScore = (ksqAverage * 0.4) + (bsqScore * 0.6);
        finalScore = parseFloat(finalScore.toFixed(3));

        // Display result
        document.getElementById("result").innerText = finalScore;
        document.getElementById("loading").style.display = "none";
    }, 500); // Simulate a slight delay
}

// Function to calculate GPA
function calculateGPA() {
    document.getElementById("loading-gpa").style.display = "block";
    setTimeout(() => {
        let creditsInput = document.getElementById("credits").value;
        let gradesInput = document.getElementById("grades").value;

        // Convert credits into an array of numbers
        let credits = creditsInput.split(",").map(num => parseFloat(num.trim())).filter(num => !isNaN(num));

        // Map grades to GPA scale
        let gradeMap = {
            "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0,
            "B-": 2.7, "C+": 2.3, "C": 2.0, "C-": 1.7,
            "D+": 1.3, "D": 1.0, "F": 0.0
        };

        let grades = gradesInput.split(",").map(grade => grade.trim().toUpperCase()).map(grade => gradeMap[grade] || 0);

        // Ensure both arrays are the same length
        if (credits.length !== grades.length) {
            alert("Kreditlərin və qiymətlərin sayı uyğun gəlmir!");
            document.getElementById("loading-gpa").style.display = "none";
            return;
        }

        // Calculate GPA
        let totalPoints = 0;
        let totalCredits = 0;
        for (let i = 0; i < credits.length; i++) {
            totalPoints += credits[i] * grades[i];
            totalCredits += credits[i];
        }

        let gpa = totalPoints / totalCredits;
        gpa = parseFloat(gpa.toFixed(2)); // Round to 2 decimal places

        // Display result
        document.getElementById("gpaResult").innerText = gpa;
        document.getElementById("loading-gpa").style.display = "none";
    }, 500); // Simulate a slight delay
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
