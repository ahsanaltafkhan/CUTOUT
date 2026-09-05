# Cutout - AI-Powered Background Removal SaaS

## 1. Project Overview
**Cutout** is a commercial-grade, high-performance SaaS web application designed for automated AI-powered background removal. Built to match the aesthetic standards of modern platforms like Open Motion, the application pairs an advanced Bento Box long-scroll UI with a lightweight serverless architecture capable of fast image extraction and local preview manipulation.

## 2. Technical Stack & Versions
* **Frontend Architecture**: Vanilla HTML5, CSS3 (Custom Properties, Flexbox, Grid), Modern JavaScript (ES6+).
* **Backend Runtime**: Python 3.11 / Flask lightweight micro-framework.
* **API Integration**: Remove.bg REST API v1.0.
* **Deployment & Hosting**: Vercel Serverless Functions.
* **Version Control**: Git & GitHub (`main` and `phase-2-ui` branches).

## 3. Project Architecture & Directory Structure
```text
cutout/
├── api/
│   └── index.py         # Flask serverless proxy routing to Remove.bg
├── public/
│   ├── assets/
│   │   ├── dog.jpg      # High-res sample asset for interactive slider
│   │   └── nobg.png     # Processed transparent asset for comparison layer
│   ├── index.html       # Main semantic single-page layout (Bento UI)
│   ├── style.css        # Open Motion-inspired styling & light/dark variables
│   └── script.js        # DOM interactions, theme toggle, and drag-and-drop state machine
├── requirements.txt     # Python dependencies (Flask, requests, werkzeug)
├── vercel.json          # Vercel routing rules and serverless configurations
└── README.md            # System documentation

4. Setup and Installation Guide

    Clone the repository:
    Bash

    git clone [https://github.com/ahsanaltafkhan/cutout.git](https://github.com/ahsanaltafkhan/cutout.git)
    cd cutout

    Install Python dependencies locally:
    Bash

    pip install -r requirements.txt

    Configure environment variables (create a .env file or set in Vercel):
    Code snippet

    REMOVE_BG_API_KEY=your_remove_bg_api_key_here

    Run locally via Vercel CLI:
    Bash

    vercel dev
