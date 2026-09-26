from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean, JSON
from sqlalchemy.orm import relationship
import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String, unique=True, index=True)
    role = Column(String) # COLLECTOR, RECYCLER, ADMIN
    phone = Column(String, unique=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Collector(Base):
    __tablename__ = "collectors"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    preferred_language = Column(String, default="English")
    operating_area = Column(String) # GeoJSON or simple string
    total_earnings = Column(Float, default=0.0)

class Recycler(Base):
    __tablename__ = "recyclers"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    facility_name = Column(String)
    auth_number = Column(String)
    auth_status = Column(String, default="PENDING")
    location = Column(String) # GeoJSON
    contact = Column(String)
    accepted_materials = Column(JSON)
    pickup_available = Column(Boolean, default=False)
    service_area_radius_km = Column(Float, default=10.0)

class MaterialCategory(Base):
    __tablename__ = "material_categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    description = Column(String)

class MaterialLot(Base):
    __tablename__ = "material_lots"
    id = Column(Integer, primary_key=True, index=True)
    lot_ref = Column(String, unique=True, index=True)
    collector_id = Column(Integer, ForeignKey("collectors.id"))
    category_id = Column(Integer, ForeignKey("material_categories.id"))
    subcategory = Column(String)
    weight_kg = Column(Float)
    condition = Column(String)
    source_type = Column(String)
    gps_lat = Column(Float)
    gps_lng = Column(Float)
    estimated_value_min = Column(Float)
    estimated_value_max = Column(Float)
    status = Column(String, default="DRAFT") # DRAFT, POSTED, QUOTED, HANDOVER, COMPLETED
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class LotImage(Base):
    __tablename__ = "lot_images"
    id = Column(Integer, primary_key=True, index=True)
    lot_id = Column(Integer, ForeignKey("material_lots.id"))
    image_url = Column(String)
    ai_classification = Column(String)
    ai_confidence = Column(Float)

class Quote(Base):
    __tablename__ = "quotes"
    id = Column(Integer, primary_key=True, index=True)
    lot_id = Column(Integer, ForeignKey("material_lots.id"))
    recycler_id = Column(Integer, ForeignKey("recyclers.id"))
    offered_price = Column(Float)
    status = Column(String, default="PENDING") # PENDING, ACCEPTED, REJECTED
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    quote_id = Column(Integer, ForeignKey("quotes.id"))
    final_price = Column(Float)
    status = Column(String, default="INITIATED")
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class HandoverRecord(Base):
    __tablename__ = "handover_records"
    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(Integer, ForeignKey("transactions.id"))
    qr_reference = Column(String, unique=True)
    recycler_confirmation = Column(Boolean, default=False)
    handover_gps_lat = Column(Float)
    handover_gps_lng = Column(Float)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(Integer, ForeignKey("transactions.id"))
    amount = Column(Float)
    method = Column(String) # CASH, UPI
    status = Column(String, default="PENDING") # PENDING, PAID, FAILED

class SyncLog(Base):
    __tablename__ = "sync_logs"
    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String)
    collector_id = Column(Integer)
    records_synced = Column(Integer)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)