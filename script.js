// Initialize canvas and context
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

// Variables for wave parameters
let amplitude = 50;
let frequency = 0.02;
let speed = 0.1;
let wavelength = 200;
let phase = 0;
let frameCount = 0;
let waveType = 'sine'; // Default wave type
let waveColor = '#007bff'; // Default wave color

// Function to save parameters to local storage
function saveSettings() {
    localStorage.setItem('waveSettings', JSON.stringify({
        amplitude: amplitude,
        frequency: frequency,
        speed: speed,
        wavelength: wavelength,
        waveType: waveType,
        waveColor: waveColor
    }));
}

// Function to load parameters from local storage
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('waveSettings'));
    if (settings) {
        amplitude = settings.amplitude;
        frequency = settings.frequency;
        speed = settings.speed;
        wavelength = settings.wavelength;
        waveType = settings.waveType;
        waveColor = settings.waveColor;
        updateUIInputs();
    }
}

// Resize canvas based on window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = 300; // Fixed height or adjust as needed
}

// Function to draw the wave and additional info
function drawWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame

    // Draw wave
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    for (let x = 0; x < canvas.width; x++) {
        let y;
        if (waveType === 'sine') {
            y = canvas.height / 2 + amplitude * Math.sin((2 * Math.PI / wavelength) * x + phase);
        } else if (waveType === 'cosine') {
            y = canvas.height / 2 + amplitude * Math.cos((2 * Math.PI / wavelength) * x + phase);
        }
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = waveColor; // Wave color
    ctx.lineWidth = 2;
    ctx.stroke();

    // Update phase for animation
    phase += speed;
    frameCount++;

    // Update info in the sidebar
    document.getElementById('infoAmplitude').textContent = amplitude.toFixed(2);
    document.getElementById('infoFrequency').textContent = frequency.toFixed(2);
    document.getElementById('infoSpeed').textContent = speed.toFixed(2);
    document.getElementById('infoWavelength').textContent = wavelength.toFixed(2);
    document.getElementById('infoWaveType').textContent = waveType.charAt(0).toUpperCase() + waveType.slice(1); // Capitalize first letter
    document.getElementById('infoWaveColor').textContent = waveColor;
    document.getElementById('infoFrameCount').textContent = frameCount;

    requestAnimationFrame(drawWave); // Loop animation
}

// Function to update wave parameters from UI controls
function updateWaveParameters() {
    amplitude = parseFloat(document.getElementById('amplitudeInput').value);
    frequency = parseFloat(document.getElementById('frequencyInput').value);
    speed = parseFloat(document.getElementById('speedInput').value);
    wavelength = parseFloat(document.getElementById('wavelengthInput').value);
    waveType = document.getElementById('waveTypeSelect').value;
    waveColor = document.getElementById('waveColorInput').value;
    saveSettings(); // Save settings to local storage
}

// Reset button click event
document.getElementById('resetButton').addEventListener('click', function() {
    amplitude = 50;
    frequency = 0.02;
    speed = 0.1;
    wavelength = 200;
    waveType = 'sine';
    waveColor = '#007bff';
    updateUIInputs();
    saveSettings(); // Save settings to local storage
});

// Randomize button click event
document.getElementById('randomButton').addEventListener('click', function() {
    amplitude = Math.random() * 100;
    frequency = Math.random() * 0.1;
    speed = Math.random();
    wavelength = Math.random() * 400 + 10;
    waveType = Math.random() < 0.5 ? 'sine' : 'cosine';
    waveColor = getRandomColor();
    updateUIInputs();
    saveSettings(); // Save settings to local storage
});

// Function to update UI inputs based on current parameters
function updateUIInputs() {
    document.getElementById('amplitudeInput').value = amplitude;
    document.getElementById('frequencyInput').value = frequency;
    document.getElementById('speedInput').value = speed;
    document.getElementById('wavelengthInput').value = wavelength;
    document.getElementById('waveTypeSelect').value = waveType;
    document.getElementById('waveColorInput').value = waveColor;
}

// Event listener for input changes
document.querySelectorAll('.form-control-range, #waveTypeSelect, #waveColorInput').forEach(input => {
    input.addEventListener('input', function() {
        updateWaveParameters();
    });
});

// Initialize
resizeCanvas();
loadSettings(); // Load settings from local storage
updateUIInputs();
drawWave();

// Function to generate random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}