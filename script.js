function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function calculateDimensions() {
    const screenSelect = document.getElementById('screen-type');
    const resolutionMap = {
        "P1.5": 320, "P1.9": 256, "P2.5": 200, "P2.6": 192,
        "P2.9": 168, "P3.1": 160, "P3.9": 128, "P4.8": 104,
        "P5.9": 84, "P6.2": 80
    };

    const cabinetRes = resolutionMap[screenSelect.value];
    const widthEl = document.getElementById('width');
    const heightEl = document.getElementById('height');
    const container = document.querySelector('.container');
    const resultDiv = document.getElementById('result');

    const wVal = parseFloat(widthEl.value);
    const hVal = parseFloat(heightEl.value);

    // Reset errors
    widthEl.classList.remove('input-error', 'shake');
    heightEl.classList.remove('input-error', 'shake');

    // Validation Logic
    let hasError = false;
    if (isNaN(wVal) || wVal <= 0) {
        widthEl.classList.add('input-error', 'shake');
        hasError = true;
    }
    if (isNaN(hVal) || hVal <= 0) {
        heightEl.classList.add('input-error', 'shake');
        hasError = true;
    }

    if (hasError) {
        resultDiv.style.display = 'none';
        container.classList.remove('extended'); // Keep it small on error
        return;
    }

    // Calculations
    let wMeters = toMeters(wVal, document.getElementById('width-unit').value);
    let hMeters = toMeters(hVal, document.getElementById('height-unit').value);
    const wCabs = Math.ceil(wMeters * 2);
    const hCabs = Math.ceil(hMeters * 2);

    const totalWidthPx = wCabs * cabinetRes;
    const totalHeightPx = hCabs * cabinetRes;

    // Extend container and show result
    container.classList.add('extended');
    resultDiv.innerHTML = `
        <div class="result-box-single">
            <strong>Total Resolution</strong>
            <p class="resolution-text">${totalWidthPx} x ${totalHeightPx} Pixels</p>
        </div>
    `;

    resultDiv.style.display = 'block';
    document.getElementById('backToTopIcon').style.display = 'flex';

    setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
}

function toMeters(val, unit) {
    if (unit === 'meters') return val;
    if (unit === 'centimeters') return val / 100;
    if (unit === 'millimeters') return val / 1000;
    return val;
}

function clearInputs() {
    document.getElementById('width').value = '';
    document.getElementById('height').value = '';
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error', 'shake'));
    document.getElementById('result').style.display = 'none';
    document.querySelector('.container').classList.remove('extended');
    document.getElementById('backToTopIcon').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}