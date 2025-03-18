from pymongo import MongoClient
from backend.config import MONGO_URI

# Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)
db = client["misinformation_db"]
queries_collection = db["queries"]

# Test connection
if client:
    print("✅ Connected to MongoDB!")
