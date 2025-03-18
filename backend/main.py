from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.util import analyze_claim, fetch_fact_checked_news
from backend.db import queries_collection

app = FastAPI()

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Define Request Model for Claim Submission
class ClaimRequest(BaseModel):
    claim: str

@app.post("/analyze")
async def analyze_text(request: ClaimRequest):
    """
    Analyze a user-submitted claim and save it to MongoDB.
    """
    result = analyze_claim(request.claim)

    # ✅ Save analysis result in MongoDB
    queries_collection.insert_one({
        "claim": request.claim,
        "result": result["label"],
        "misinformation_probability": result["misinformation_probability"]
    })

    return result

# ✅ NEW: Fetch fact-checked articles
@app.get("/fact-check")
async def get_fact_check(query: str):
    """
    Fetch fact-checked news articles related to a query.
    """
    articles = fetch_fact_checked_news(query)
    return {"fact_checks": articles}

@app.get("/history")
async def get_history():
    """
    Retrieve past misinformation analyses.
    """
    history = list(queries_collection.find({}, {"_id": 0}))  # Exclude MongoDB `_id`
    return {"history": history if history else []}
