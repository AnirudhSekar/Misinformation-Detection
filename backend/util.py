import requests
import re
from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer
from backend.config import FACT_CHECK_API_KEY

# ✅ Use a Hugging Face fake news detection model
MODEL_NAME = "Pulk17/Fake-News-Detection"

# Load model & tokenizer
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
classifier = pipeline("text-classification", model=model, tokenizer=tokenizer)

# ✅ Define label mapping based on model output
LABELS = {
    "LABEL_0": "Likely False",  # Fake news
    "LABEL_1": "Likely True"    # Real news
}

def preprocess_text(text: str) -> str:
    """
    Clean input text before passing it to the model.
    """
    text = text.strip()
    text = re.sub(r'\s+', ' ', text)  # Remove excessive whitespace
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)  # Remove special characters
    text = text.lower()
    return text

def analyze_claim(text: str) -> dict:
    """
    Analyze a claim using the Pulk17 Fake News Detection model.
    """
    cleaned_text = preprocess_text(text)
    result = classifier(cleaned_text)

    # ✅ Log raw model output for debugging
    print("🔍 Raw Model Output:", result)

    score = round(result[0]['score'], 2)
    label = LABELS.get(result[0]['label'], "Unknown")

    return {
        "claim": text,
        "cleaned_claim": cleaned_text,
        "misinformation_probability": score,
        "label": label
    }

def fetch_fact_checked_news(query: str) -> dict:
    """
    Fetch fact-checked news articles from Google's Fact Check API.
    """
    url = f"https://factchecktools.googleapis.com/v1alpha1/claims:search?query={query}&key={FACT_CHECK_API_KEY}"
    response = requests.get(url).json()
    
    if "claims" not in response:
        return {"message": "No fact-checks found for this query"}
    
    return response["claims"]
