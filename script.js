function calculateScore() {
    // Get input values
    let ksqInput = document.getElementById("ksq").value;
    let bsqInput = document.getElementById("bsq").value;

    // Convert KSQ values into an array of numbers
    let ksqValues = ksqInput.split(",").map(num => parseFloat(num.trim())).filter(num => !isNaN(num));

    // Ensure there are valid KQS values
    let ksqAverage = 0;
    if (ksqValues.length > 0) {
        let ksqSum = ksqValues.reduce((sum, num) => sum + num, 0);
        ksqAverage = ksqSum / ksqValues.length;
    }

    // Convert BSQ to number (default to 0 if empty)
    let bsqScore = parseFloat(bsqInput);
    if (isNaN(bsqScore)) bsqScore = 0;

    // Calculate the final score
    let finalScore = (ksqAverage * 0.4) + (bsqScore * 0.6);

    // Limit to max 3 decimal places without unnecessary zeros
    finalScore = parseFloat(finalScore.toFixed(3));

    // Display the result
    document.getElementById("result").innerText = finalScore;
}

/* NEW ADDITIONS (Illik Bal) */
function openAnnualCalculator() {
    let modal = document.getElementById("annualModal");
    if (!modal) {
        createAnnualCalculatorModal();
    }
    document.getElementById("annualModal").style.display = "block";
}

function createAnnualCalculatorModal() {
    let modal = document.createElement("div");
    modal.id = "annualModal";
    modal.className = "modal";
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeAnnualCalculator()">&times;</span>
            <h3>Illik Bal Hesablama</h3>
            <input type="number" id="grade1" placeholder="1-ci qiymət" class="input-field">
            <input type="number" id="grade2" placeholder="2-ci qiymət" class="input-field">
            <button onclick="calculateAnnualGrade()" class="calculate-btn pulse">Hesabla</button>
            <p><strong>Nəticə: <span id="annualResult">-</span></strong></p>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeAnnualCalculator() {
    document.getElementById("annualModal").style.display = "none";
}

function calculateAnnualGrade() {
    let grade1 = parseFloat(document.getElementById("grade1").value);
    let grade2 = parseFloat(document.getElementById("grade2").value);
    
    if (isNaN(grade1) || isNaN(grade2)) {
        document.getElementById("annualResult").innerText = "Xahiş edirəm düzgün qiymətlər daxil edin!";
        return;
    }
    
    let average = (grade1 + grade2) / 2;
    document.getElementById("annualResult").innerText = average.toFixed(2);
}
