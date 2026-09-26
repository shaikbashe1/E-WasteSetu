from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
import datetime
from .database import Base

class Collector(Base):
    __tablename__ = "collectors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    phone = Column(String, unique=True, index=True)
    language = Column(String, default="English")
    location = Column(String)
    total_earnings = Column(Float, default=0.0)

    lots = relationship("Lot", back_populates="collector")

class Recycler(Base):
    __tablename__ = "recyclers"
    id = Column(Integer, primary_key=True, index=True)
    facility_name = Column(String, index=True)
    auth_status = Column(String, default="PENDING")
    auth_details = Column(String) # Registration number etc
    location = Column(String)
    contact = Column(String)
    accepted_materials = Column(String) # JSON string of materials
    pickup_available = Column(Boolean, default=False)
    offered_rates = Column(String) # JSON string of rates

    transactions = relationship("Transaction", back_populates="recycler")

class Lot(Base):
    __tablename__ = "lots"
    id = Column(Integer, primary_key=True, index=True)
    collector_id = Column(Integer, ForeignKey("collectors.id"))
    lot_ref = Column(String, unique=True, index=True)
    material = Column(String)
    sub_category = Column(String)
    weight = Column(Float)
    condition = Column(String)
    source_type = Column(String)
    photos = Column(String) # JSON string of base64 or URLs
    estimated_value_low = Column(Float)
    estimated_value_high = Column(Float)
    status = Column(String, default="DRAFT") # DRAFT, POSTED, MATCHED, HANDOVER, COMPLETED
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    collector = relationship("Collector", back_populates="lots")
    transactions = relationship("Transaction", back_populates="lot")

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    lot_id = Column(Integer, ForeignKey("lots.id"))
    recycler_id = Column(Integer, ForeignKey("recyclers.id"))
    quoted_price = Column(Float)
    final_price = Column(Float)
    gps_location = Column(String)
    handover_ref = Column(String)
    payment_status = Column(String, default="PENDING") # PENDING, PAID
    status = Column(String, default="PENDING") # PENDING, ACCEPTED, REJECTED, COMPLETED
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    lot = relationship("Lot", back_populates="transactions")
    recycler = relationship("Recycler", back_populates="transactions")