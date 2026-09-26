from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CollectorBase(BaseModel):
    name: str
    phone: str
    language: Optional[str] = "English"
    location: Optional[str] = None

class CollectorCreate(CollectorBase):
    pass

class Collector(CollectorBase):
    id: int
    total_earnings: float
    class Config:
        from_attributes = True

class RecyclerBase(BaseModel):
    facility_name: str
    location: str
    contact: str
    accepted_materials: Optional[str] = None
    auth_details: Optional[str] = None
    pickup_available: Optional[bool] = False
    offered_rates: Optional[str] = None

class RecyclerCreate(RecyclerBase):
    pass

class Recycler(RecyclerBase):
    id: int
    auth_status: str
    class Config:
        from_attributes = True

class LotBase(BaseModel):
    material: str
    sub_category: Optional[str] = None
    weight: float
    condition: Optional[str] = None
    source_type: Optional[str] = None
    photos: Optional[str] = None # JSON string array

class LotCreate(LotBase):
    collector_id: int
    lot_ref: str

class Lot(LotBase):
    id: int
    lot_ref: str
    collector_id: int
    estimated_value_low: Optional[float] = None
    estimated_value_high: Optional[float] = None
    status: str
    created_at: datetime
    class Config:
        from_attributes = True

class TransactionBase(BaseModel):
    lot_id: int
    recycler_id: int
    quoted_price: float

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    final_price: Optional[float] = None
    gps_location: Optional[str] = None
    handover_ref: Optional[str] = None
    payment_status: str
    status: str
    timestamp: datetime
    class Config:
        from_attributes = True