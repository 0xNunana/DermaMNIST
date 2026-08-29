import io
import time
import torch
import torchvision.transforms as transforms
from PIL import Image
from app.schemas import PredictionResponse, ProbabilityItem

CLASS_NAMES = [
    "actinic keratoses and intraepithelial carcinoma",
    "basal cell carcinoma",
    "benign keratosis-like lesions",
    "dermatofibroma",
    "melanoma",
    "melanocytic nevi",
    "vascular lesions"
]

SHORT_CLASS_NAMES = [
    "Actinic Keratoses",
    "Basal Cell Carcinoma",
    "Benign Keratosis",
    "Dermatofibroma",
    "Melanoma",
    "Melanocytic Nevi",
    "Vascular Lesion"
]

# Clinical risk mapping for primary diagnostic alerts (Melanoma & Carcinomas)
MALIGNANT_CLASS_IDS = {0, 1, 4}

# Exact MedMNIST normalization reproduced from training
INFERENCE_TRANSFORM = transforms.Compose([
    transforms.Resize((28, 28)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
])

def run_inference(image_bytes: bytes, model: torch.nn.Module, device: str = "cpu") -> PredictionResponse:
    start_time = time.perf_counter()
    
    # 1. Ephemeral PIL processing (image is never written to disk)
    raw_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    tensor = INFERENCE_TRANSFORM(raw_image).unsqueeze(0).to(device)
    
    # 2. PyTorch Forward Pass
    with torch.no_grad():
        logits = model(tensor)
        probabilities = torch.softmax(logits, dim=1).squeeze(0)
    
    latency = (time.perf_counter() - start_time) * 1000
    
    # 3. Format Probability Distribution
    prob_list = probabilities.cpu().tolist()
    pred_id = int(torch.argmax(probabilities).item())
    
    prob_items = [
        ProbabilityItem(
            class_id=i,
            label=CLASS_NAMES[i],
            short_label=SHORT_CLASS_NAMES[i],
            probability=prob_list[i],
            percentage=f"{prob_list[i] * 100:.2f}%"
        )
        for i in range(len(CLASS_NAMES))
    ]
    prob_items.sort(key=lambda x: x.probability, reverse=True)
    
    return PredictionResponse(
        prediction=SHORT_CLASS_NAMES[pred_id],
        prediction_id=pred_id,
        confidence=prob_list[pred_id],
        confidence_percentage=f"{prob_list[pred_id] * 100:.2f}%",
        is_malignant_risk=pred_id in MALIGNANT_CLASS_IDS,
        probabilities=prob_items,
        inference_time_ms=round(latency, 2),
        model_version="DermaMNIST-SimpleCNN-v1.0"
    )
