import io
import pytest
from PIL import Image
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def generate_mock_image_bytes():
    img = Image.new("RGB", (28, 28), color=(128, 64, 64))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    return buf.getvalue()

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_predict_valid_image():
    image_bytes = generate_mock_image_bytes()
    response = client.post(
        "/predict",
        files={"file": ("test.jpg", image_bytes, "image/jpeg")}
    )
    assert response.status_code == 200
    data = response.json()
    assert "prediction" in data
    assert len(data["probabilities"]) == 7
    assert data["confidence"] >= 0.0 and data["confidence"] <= 1.0

def test_predict_invalid_file_type():
    response = client.post(
        "/predict",
        files={"file": ("test.txt", b"not-an-image", "text/plain")}
    )
    assert response.status_code == 415
