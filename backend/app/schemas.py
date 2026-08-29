from pydantic import BaseModel, Field
from typing import Dict, List

class ProbabilityItem(BaseModel):
    class_id: int
    label: str
    short_label: str
    probability: float
    percentage: str

class PredictionResponse(BaseModel):
    prediction: str
    prediction_id: int
    confidence: float
    confidence_percentage: str
    is_malignant_risk: bool
    probabilities: List[ProbabilityItem]
    inference_time_ms: float
    model_version: str

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    device: str
