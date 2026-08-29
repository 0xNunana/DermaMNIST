<div align="center">
  <h1>🔬 DermaMNIST AI</h1>
  <p><strong>Advanced Deep Learning Network for Dermatoscopic Lesion Triage</strong></p>

  <p>
    <a href="https://pytorch.org/"><img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch" /></a>
    <a href="https://fastapi.tiangolo.com/"><img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI" /></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" /></a>
    <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" /></a>
  </p>
</div>

<br />

> **⚠️ Research & Demonstration Only:** This system is an educational benchmark trained on the [MedMNIST v2](https://medmnist.com/) DermaMNIST dataset. It is **not** an FDA-approved medical diagnostic device and must never be used for actual clinical decision-making.

---

## 📖 Overview

DermaMNIST AI is a full-stack, production-ready machine learning application designed to classify dermatoscopic images into one of 7 distinct skin lesion categories. Transitioning from a raw Jupyter Notebook to a deployable microservice architecture, this project features an ultra-fast REST API and a premium, glassmorphic Next.js web interface.

### 🧠 Model Diagnostics
- **Input Tensor:** `3 × 28 × 28` (RGB)
- **Architecture:** 7-Class Diagnostic Triage (SimpleCNN / ResNet18)
- **Base Accuracy:** ~69.99%
- **Macro OvR AUC:** ~0.8803

---

## 🛠️ Architecture & Tech Stack

The application is decoupled into a frontend client and a stateless backend inference API, connected seamlessly via Docker.

### Frontend (`/frontend`)
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS (Dark HUD / Glassmorphic Aesthetic)
- **Language:** TypeScript
- **Features:** Drag-and-drop file upload, fluid animations, dynamic layout shifts, visual probability distribution bars.

### Backend (`/backend`)
- **Framework:** FastAPI
- **ML Engine:** PyTorch (`torch`, `torchvision`)
- **Features:** Asynchronous request handling, deterministic preprocessing pipeline, CORS configuration, isolated virtual environment (Dockerized).

---

## 🚀 Running Locally

The easiest way to run the entire stack locally is using Docker.

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/0xNunana/DermaMNIST.git
   cd DermaMNIST
   ```

2. **Spin up the services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - **Frontend UI:** [http://localhost:3000](http://localhost:3000)
   - **Backend API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🌍 Deployment Strategy

This repository is structured for effortless cloud deployment using split hosting.

### 1. Backend API (Render / Google Cloud Run)
The backend requires a Docker container environment to serve the PyTorch model.
1. Connect your GitHub repository to [Render](https://render.com/).
2. Create a new **Web Service**.
3. Set the Root Directory to `backend`.
4. Render will automatically build the `Dockerfile` and expose your API.
5. *Note the generated URL (e.g., `https://your-api.onrender.com`).*

### 2. Frontend UI (Vercel)
Next.js applications deploy natively to [Vercel](https://vercel.com/) with zero configuration.
1. Connect your GitHub repository to Vercel.
2. Select the `frontend` folder as the Root Directory.
3. Add the Environment Variable:
   - `NEXT_PUBLIC_API_URL` = `https://your-api.onrender.com`
4. Deploy!

> **Security Tip:** Once the frontend is live, go back to your backend hosting platform and set the `ALLOWED_ORIGINS` environment variable to your frontend's Vercel URL to secure the API.

---

## 🔬 Supported Lesion Classes
1. Actinic Keratoses and Intraepithelial Carcinoma
2. Basal Cell Carcinoma
3. Benign Keratosis-like Lesions
4. Dermatofibroma
5. Melanoma *(High Risk)*
6. Melanocytic Nevi
7. Vascular Lesions
