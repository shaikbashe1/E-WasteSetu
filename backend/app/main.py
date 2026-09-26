from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from . import models

# Ensure tables are created (for prototype only, use Alembic in prod)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-WasteSetu API", description="Production API Gateway for Kabadiwala App")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Placeholder Routers for the required endpoints
@app.get("/auth")
def auth(): return {"status": "auth service"}

@app.get("/collectors")
def get_collectors(): return {"status": "collectors service"}

@app.get("/materials")
def get_materials(): return {"status": "materials service"}

@app.get("/lots")
def get_lots(): return {"status": "lots service"}

@app.get("/prices")
def get_prices(): return {"status": "price service"}

@app.get("/recyclers")
def get_recyclers(): return {"status": "recyclers service"}

@app.get("/matching")
def match_recyclers(): return {"status": "matching engine"}

@app.get("/transactions")
def get_transactions(): return {"status": "transaction service"}

@app.get("/handover")
def handover(): return {"status": "handover service"}

@app.get("/payments")
def payments(): return {"status": "payment service"}

@app.get("/sync")
def sync(): return {"status": "offline sync engine"}

@app.get("/ai")
def ai(): return {"status": "AI classification & valuation engine"}

@app.get("/safety")
def safety(): return {"status": "safety content"}

@app.get("/analytics")
def analytics(): return {"status": "analytics & BI"}

@app.get("/")
def read_root():
    return {"status": "ok", "message": "E-WasteSetu API Gateway is running"}