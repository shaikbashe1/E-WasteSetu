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

class Recycler(Base):
    __tablename__ = "recyclers"
    id = Column(Integer, primary_key=True, index=True)
    facility_name = Column(String, index=True)
    auth_status = Column(String, default="PENDING")
    location = Column(String)
    contact = Column(String)

class Lot(Base):
    __tablename__ = "lots"
    id = Column(Integer, primary_key=True, index=True)
    collector_id = Column(Integer, ForeignKey("collectors.id"))
    lot_ref = Column(String, unique=True, index=True)
    material = Column(String)
    weight = Column(Float)
    estimated_value_low = Column(Float)
    estimated_value_high = Column(Float)
    status = Column(String, default="DRAFT") # DRAFT, OFFERED, ACCEPTED, COMPLETED
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    lot_id = Column(Integer, ForeignKey("lots.id"))
    recycler_id = Column(Integer, ForeignKey("recyclers.id"))
    final_price = Column(Float)
    status = Column(String, default="PENDING")\n