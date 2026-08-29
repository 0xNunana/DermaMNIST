import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from app.model import load_model
from app.inference import run_inference
from app.schemas import PredictionResponse, HealthResponse

MODEL_PATH = os.getenv("MODEL_PATH", "models/dermamnist_model.pth")
MODEL = None
DEVICE = "cpu"

ALLOWED_EXTENSIONS = {"image/jpeg", "image/png", "image/webp"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

@asynccontextmanager
async def lifespan(app: FastAPI):
    global MODEL
    if os.path.exists(MODEL_PATH):
        MODEL = load_model(MODEL_PATH, architecture="SimpleCNN", device=DEVICE)
    yield
    MODEL = None

app = FastAPI(
    title="DermaMNIST Skin Lesion Classifier API",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", response_model=HealthResponse)
def health():
    return HealthResponse(
        status="healthy",
        model_loaded=MODEL is not None,
        device=DEVICE
    )

@app.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported format '{file.content_type}'. Upload JPEG, PNG, or WebP."
        )
    
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File size exceeds the maximum 10MB limit."
        )
        
    if MODEL is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Model is not loaded."
        )
    
    try:
        response = run_inference(contents, MODEL, device=DEVICE)
        return response
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Image decoding failed: {str(e)}")
