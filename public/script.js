const themeToggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

// Theme Initialization
const savedTheme = localStorage.getItem('theme') || 'dark';
rootElement.setAttribute('data-theme', savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    rootElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// App Logic
const card = document.getElementById('upload-card');
const fileInput = document.getElementById('file-input');
const resultImg = document.getElementById('result-img');
const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');

function switchState(stateId) {
    const activeState = document.querySelector('.upload-state.active');
    if(activeState) {
        activeState.style.opacity = '0';
        activeState.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            activeState.classList.remove('active');
            activeState.style = '';
            
            const nextState = document.getElementById(stateId);
            nextState.classList.add('active');
        }, 300);
    } else {
        document.getElementById(stateId).classList.add('active');
    }
}

// Drag & Drop Handling
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    card.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
    });
});

['dragenter', 'dragover'].forEach(eventName => {
    card.addEventListener(eventName, () => card.classList.add('dragover'));
});

['dragleave', 'drop'].forEach(eventName => {
    card.addEventListener(eventName, () => card.classList.remove('dragover'));
});

card.addEventListener('drop', e => {
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
});

fileInput.addEventListener('change', function() {
    if (this.files.length) handleFile(this.files[0]);
});

// API Processing
async function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.');
        return;
    }

    switchState('state-loading');

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch('/api/remove-bg', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('API Error');

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        resultImg.src = url;
        downloadBtn.href = url;
        
        switchState('state-result');
    } catch (error) {
        console.error(error);
        alert('Processing failed. Please ensure your API key is configured correctly in Vercel.');
        switchState('state-upload');
    }
}

resetBtn.addEventListener('click', () => {
    fileInput.value = '';
    switchState('state-upload');
});

// --- FAQ Accordion Logic ---
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        
        document.querySelectorAll('.faq-answer').forEach(ans => {
            if (ans !== answer) ans.style.maxHeight = null;
        });
        document.querySelectorAll('.faq-question i').forEach(icn => {
            if (icn !== icon) icn.className = 'fa-solid fa-plus';
        });

        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            icon.className = 'fa-solid fa-plus';
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.className = 'fa-solid fa-xmark';
        }
    });
});

// --- Interactive Before/After Slider Logic ---
const sliderRange = document.getElementById('slider-range');
const beforeLayer = document.getElementById('before-layer');
const sliderHandle = document.getElementById('slider-handle');

if (sliderRange) {
    sliderRange.addEventListener('input', (e) => {
        const val = e.target.value;
        beforeLayer.style.width = `${val}%`;
        sliderHandle.style.left = `${val}%`;
    });
}