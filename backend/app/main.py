from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas
from .database import engine, get_db
from .services import ai_service
import uuid

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Kabadiwala SIH Prototype API")

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Kabadiwala API is running"}

@app.post("/collectors", response_model=schemas.CollectorResponse)
def create_collector(collector: schemas.CollectorCreate, db: Session = Depends(get_db)):
    db_collector = models.Collector(**collector.model_dump())
    db.add(db_collector)
    db.commit()
    db.refresh(db_collector)
    return db_collector

@app.post("/lots", response_model=schemas.LotResponse)
def create_lot(lot: schemas.LotCreate, db: Session = Depends(get_db)):
    # Simple AI Valuation Mock
    estimate = ai_service.estimate_value(lot.material, lot.weight)
    
    db_lot = models.Lot(
        **lot.model_dump(),
        lot_ref=f"LOT-{uuid.uuid4().hex[:6].upper()}",
        estimated_value_low=estimate['low'],
        estimated_value_high=estimate['high']
    )
    db.add(db_lot)
    db.commit()
    db.refresh(db_lot)
    return db_lot

@app.get("/recyclers", response_model=list[schemas.RecyclerResponse])
def get_recyclers(db: Session = Depends(get_db)):
    return db.query(models.Recycler).all()

@app.post("/sync")
def offline_sync(sync_req: schemas.SyncRequest, db: Session = Depends(get_db)):
    # Mock sync processing
    results = []
    for op in sync_req.operations:
        # In a real app, apply operations based on entity_type and operation_type
        results.append({
            "operation_id": op.operation_id,
            "status": "success"
        })
    return {"success": True, "synced_records": results}

@app.post("/ai/classify")
def classify_material(image_ref: str):
    return ai_service.classify_material(image_ref)\n