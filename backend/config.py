import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Retrieve API keys and database credentials
FACT_CHECK_API_KEY = os.getenv("FACT_CHECK_API_KEY")
MONGO_URI = os.getenv("MONGO_URI")
