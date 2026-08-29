import torch
import torch.nn as nn
from torchvision import models

POOL_GRID = 4

class SimpleCNN(nn.Module):
    """Exact architecture from notebook baseline"""
    def __init__(self, in_channels: int = 3, num_classes: int = 7, num_filters: int = 16, dropout: float = 0.0):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(in_channels, num_filters, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2),
            nn.Conv2d(num_filters, num_filters * 2, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2),
        )
        self.pool = nn.AdaptiveAvgPool2d(POOL_GRID)
        self.dropout = nn.Dropout(dropout)
        n_features = num_filters * 2 * POOL_GRID * POOL_GRID
        self.classifier = nn.Linear(n_features, num_classes)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.features(x)
        x = self.pool(x)
        x = torch.flatten(x, start_dim=1)
        x = self.dropout(x)
        return self.classifier(x)

def build_resnet18(num_classes: int = 7) -> nn.Module:
    """Alternative transfer learning backbone"""
    model = models.resnet18(weights=None)
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    return model

def load_model(weights_path: str, architecture: str = "SimpleCNN", device: str = "cpu") -> nn.Module:
    if architecture == "SimpleCNN":
        model = SimpleCNN(in_channels=3, num_classes=7, num_filters=16, dropout=0.0)
    elif architecture == "ResNet18":
        model = build_resnet18(num_classes=7)
    else:
        raise ValueError(f"Unknown architecture: {architecture}")
    
    state_dict = torch.load(weights_path, map_location=torch.device(device))
    model.load_state_dict(state_dict)
    model.to(device)
    model.eval()
    return model
