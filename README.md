# E-WasteSetu

A digital bridge between informal e-waste collectors and formal recycling ecosystems.

## Complete System Architecture

E-WasteSetu employs a robust, production-ready architecture designed for offline-first resilience, traceability, dynamic price discovery, and data-driven AI on edge devices.

### 📱 Client Layer
1. **Collector Mobile Application**: Built with Flutter, Dart, SQLite + Drift. Uses TensorFlow Lite for on-device edge ML classification without internet dependency.
2. **Recycler Portal**: React + TypeScript web app for recycler onboarding, bidding, and transaction management.
3. **Admin Panel**: React dashboard for complete ecosystem visibility and anomaly detection.

### ☁️ Backend Architecture
- **API Gateway**: Built with FastAPI.
- **Microservices**: Independent routing for Auth, Lots, Prices, Recycler Matching, Handover, and Sync.
- **AI/ML Layer**: XGBoost for price prediction, Isolation Forest for anomaly detection.

### 💾 Storage & Data
- **PostgreSQL + PostGIS**: Core relational data and geospatial querying for recycler matching.
- **Redis**: Low-latency caching for dashboards and current market prices.
- **Object Storage**: S3/Supabase for lot images, verification documents, and QR handover records.

### 🔄 Offline-First Sync
The mobile application uses a local SQLite database to store all transactions when offline. When internet is restored, the **Sync Engine** reconciles local data (`local_id`) with the server (`server_id`), using standard Conflict-Free Replicated Data Type (CRDT) principles and version checking.

## Running Locally

To spin up the entire production stack (PostgreSQL + PostGIS, Redis, FastAPI):

```bash
docker-compose up --build
```
