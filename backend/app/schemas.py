from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CollectorBase(BaseModel):
    name: str
    phone: str
    language: str
    location: str

class CollectorCreate(CollectorBase):
    pass

class CollectorResponse(CollectorBase):
    id: int
    class Config:
        from_attributes = True

class LotBase(BaseModel):
    material: str
    weight: float
    collector_id: int

class LotCreate(LotBase):
    pass

class LotResponse(LotBase):
    id: int
    lot_ref: str
    estimated_value_low: float
    estimated_value_high: float
    status: str
    created_at: datetime
    class Config:
        from_attributes = True
        
class RecyclerBase(BaseModel):
    facility_name: str
    location: str
    contact: str

class RecyclerResponse(RecyclerBase):
    id: int
    auth_status: str
    class Config:
        from_attributes = True
        
class SyncOperation(BaseModel):
    operation_id: str
    entity_type: str
    entity_id: str
    operation_type: str
    payload: dict
    
class SyncRequest(BaseModel):
    device_id: str
    operations: List[SyncOperation]\n