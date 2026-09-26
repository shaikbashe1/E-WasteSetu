import random

# Mock AI Service for SIH Prototype

def estimate_value(material: str, weight: float, location: str) -> dict:
    """
    Returns an estimated price range for the e-waste.
    """
    base_rates = {
        "PCB": 180.0,
        "CRT": 15.0,
        "Battery": 40.0,
        "Cables": 120.0,
        "Mixed Plastics": 10.0,
        "Motors": 60.0
    }
    
    rate = base_rates.get(material, 50.0)
    
    # Add some randomness for the range
    low = (rate * weight) * 0.9
    high = (rate * weight) * 1.1
    
    return {
        "low": round(low, 2),
        "high": round(high, 2)
    }

def classify_image(photo_data: str) -> dict:
    """
    Returns a predicted category based on a photo.
    """
    categories = ["PCB", "CRT", "Battery", "Cables"]
    return {
        "category": random.choice(categories),
        "confidence": round(random.uniform(0.75, 0.99), 2)
    }

def detect_anomaly(price: float, weight: float) -> bool:
    """
    Returns True if the quoted price is unusually high or low for the weight.
    """
    # Simple mock: average price is 50/kg. Anything > 500/kg or < 1/kg is an anomaly.
    rate = price / (weight if weight > 0 else 1)
    if rate > 500 or rate < 1:
        return True
    return False