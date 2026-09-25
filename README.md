# E-WasteSetu (Kabadiwala)

A vernacular, offline-first digital bridge connecting informal e-waste collectors with authorized recyclers through fair price discovery, AI-assisted valuation, recycler matching, digital traceability, and transaction records.

## Features

- **Collector application:** Lightweight, low-literacy friendly mobile app.
- **E-waste lot creation:** Capture images and select materials easily.
- **Material categorization & Price discovery:** AI-assisted estimates and transparent local market prices.
- **Value estimation:** Range-based valuation powered by historical data.
- **Authorized recycler discovery & matching:** Find verified recyclers based on distance and materials.
- **Digital handover & Traceability:** QR/reference-based secure handover and records.
- **Earnings ledger & Transaction history:** Track pending and completed payments.
- **Safety guidance:** Visual and audio instructions for safe handling.
- **Hindi/Marathi/English support:** Multilingual and vernacular-first.
- **Offline-first functionality:** Complete operations without internet, syncs automatically when online.

## Project Structure

The repository is modular and structured as follows:

```
E-WasteSetu/
├── backend/          # FastAPI Python Backend (APIs, Database Models, AI Services)
├── mobile/           # Flutter Mobile Application (Collector App)
├── web/              # React Dashboards (Recycler & Admin Panels)
├── docker-compose.yml
└── README.md
```

## Installation

### Backend (Python/FastAPI)
```bash
cd backend
pip install -r requirements.txt
```

### Mobile (Flutter)
```bash
cd mobile
flutter pub get
flutter run
```

### Web (React/Vite)
```bash
cd web
npm install
```

## Running Locally

To run the entire system using Docker:
```bash
docker-compose up --build
```

To run individual components manually:

**Backend:**
```bash
cd backend
uvicorn app.main:app --reload
```

**Web:**
```bash
cd web
npm run dev
```

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# .env.example
DATABASE_URL=postgresql://kabadiwala:password@localhost/kabadiwaladb
AI_CONFIDENCE_THRESHOLD=0.75
SECRET_KEY=your_super_secret_key_here
```

## Demo

To launch the prototype/demo:
1. Start the backend server (`uvicorn app.main:app --reload`).
2. Run the React Web Dashboard (`npm run dev`) on `http://localhost:3000`.
3. Launch the Flutter mobile app in an emulator (`flutter run`).
4. You can use the mock "Continue as Demo Collector" login to test the offline creation flow.

## SIH Project

**E-WasteSetu** is designed as a Smart India Hackathon (SIH) prototype. It tackles the critical challenge of connecting India's informal e-waste collectors with authorized recyclers to ensure formal, safe, and traceable recycling of electronic waste.
