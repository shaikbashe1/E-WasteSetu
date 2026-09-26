from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas
from .database import engine, get_db
from .services import ai_service
import uuid

models.Base.metadata.create_all(bind=engine)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Kabadiwala SIH Prototype API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Kabadiwala API is running"}

@app.post("/collectors", response_model=schemas.Collector)
def create_collector(collector: schemas.CollectorCreate, db: Session = Depends(get_db)):
    db_collector = models.Collector(**collector.model_dump())
    db.add(db_collector)
    db.commit()
    db.refresh(db_collector)
    return db_collector

@app.post("/lots", response_model=schemas.Lot)
def create_lot(lot: schemas.LotCreate, db: Session = Depends(get_db)):
    # AI Valuation Mock
    estimate = ai_service.estimate_value(lot.material, lot.weight, "default_location")
    
    db_lot = models.Lot(
        **lot.model_dump(),
        estimated_value_low=estimate['low'],
        estimated_value_high=estimate['high'],
        status="POSTED"
    )
    db.add(db_lot)
    db.commit()
    db.refresh(db_lot)
    return db_lot

@app.get("/lots", response_model=list[schemas.Lot])
def get_lots(db: Session = Depends(get_db)):
    return db.query(models.Lot).all()

@app.post("/recyclers", response_model=schemas.Recycler)
def create_recycler(recycler: schemas.RecyclerCreate, db: Session = Depends(get_db)):
    db_recycler = models.Recycler(**recycler.model_dump())
    db.add(db_recycler)
    db.commit()
    db.refresh(db_recycler)
    return db_recycler

@app.get("/recyclers", response_model=list[schemas.Recycler])
def get_recyclers(db: Session = Depends(get_db)):
    return db.query(models.Recycler).all()

@app.post("/transactions", response_model=schemas.Transaction)
def create_transaction(txn: schemas.TransactionCreate, db: Session = Depends(get_db)):
    # Anomaly detection before creating
    if ai_service.detect_anomaly(txn.quoted_price, 10): # dummy weight
        print("Anomaly detected! Price is unusual.")

    db_txn = models.Transaction(**txn.model_dump())
    db.add(db_txn)
    
    # Update lot status
    lot = db.query(models.Lot).filter(models.Lot.id == txn.lot_id).first()
    if lot:
        lot.status = "MATCHED"
        
    db.commit()
    db.refresh(db_txn)
    return db_txn

@app.get("/transactions", response_model=list[schemas.Transaction])
def get_transactions(db: Session = Depends(get_db)):
    return db.query(models.Transaction).all()