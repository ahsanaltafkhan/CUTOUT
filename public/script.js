const card = document.getElementById('upload-card');
const fileInput = document.getElementById('file-input');
const stateUpload = document.getElementById('state-upload');
const stateLoading = document.getElementById('state-loading');
const stateResult = document.getElementById('state-result');
const resultImg = document.getElementById('result-img');
const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');

// --- 3D Hover Microinteraction ---
document.addEventListener('mousemove', (e) => {
    // Only apply 3D effect if the screen is large enough (not on mobile)
    if (window.innerWidth > 768) {
        let xAxis = (window.innerWidth / 2 - e.pageX) / 40;
        let yAxis = (window.innerHeight / 2 - e.pageY) / 40;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }
});
card.addEventListener('mouseleave', () => {
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});

// --- Drag & Drop Mechanics ---
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    card.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    card.addEventListener(eventName, () => card.classList.add('dragover'), false);
});

['dragleave', 'drop'].forEach(eventName => {
    card.addEventListener(eventName, () => card.classList.remove('dragover'), false);
});

card.addEventListener('drop', (e) => {
    let dt = e.dataTransfer;
    let files = dt.files;
    if (files.length) handleFile(files[0]);
});

fileInput.addEventListener('change', function() {
    if (this.files.length) handleFile(this.files[0]);
});

// --- API Handling ---
function switchState(stateId) {
    document.querySelectorAll('.upload-state').forEach(el => el.classList.remove('active'));
    document.getElementById(stateId).classList.add('active');
}

async function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
    }

    switchState('state-loading');

    const formData = new FormData();
    formData.append('image', file);

    try {
        // Calls the Vercel Serverless Function
        const response = await fetch('/api/remove-bg', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Failed to process image');

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        resultImg.src = url;
        downloadBtn.href = url;
        
        switchState('state-result');
    } catch (error) {
        console.error(error);
        alert('Error removing background. Please try again.');
        switchState('state-upload');
    }
}

// --- Reset ---
resetBtn.addEventListener('click', () => {
    fileInput.value = '';
    switchState('state-upload');
});