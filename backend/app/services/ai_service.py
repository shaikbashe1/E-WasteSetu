import random

def estimate_value(material: str, weight: float):
    # Mock valuation engine for prototype
    base_rates = {
        "PCB": 200.0,
        "CRT": 50.0,
        "Cable": 150.0,
        "Battery": 80.0
    }
    rate = base_rates.get(material, 100.0)
    variance = random.uniform(0.9, 1.1)
    low = (rate * weight) * 0.9
    high = (rate * weight) * 1.1 * variance
    return {"low": round(low, 2), "high": round(high, 2)}

def classify_material(image_ref: str):
    # Mock AI classification returning pseudo-confidence
    categories = ["PCB", "CRT", "Cable", "Battery", "Mixed Plastics"]
    selected = random.choice(categories)
    return {
        "predicted_category": selected,
        "confidence": round(random.uniform(70.0, 98.0), 2)
    }\n