# DermaMNIST AI

Production-grade machine learning application built around DermaMNIST (MedMNIST v2).

## Architecture
- **Backend:** FastAPI, PyTorch (ResNet18 / SimpleCNN)
- **Frontend:** Next.js (App Router), Tailwind CSS, TypeScript
- **Deployment:** Docker, Docker Compose

## Getting Started

1. **Model Weights:** Place your `dermamnist_model.pth` inside `backend/models/`.
2. **Run Services:**
   ```bash
   docker-compose up --build
   ```
3. **Access:**
   - Frontend UI: `http://localhost:3000`
   - Backend API Docs: `http://localhost:8000/docs`

> **Note:** This is a research demonstration only and not for clinical decision-making.
