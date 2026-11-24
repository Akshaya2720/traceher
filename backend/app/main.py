from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.api.auth import router as auth_router
from app.api.dashboard import router as dashboard_router
from app.api.evidence import router as evidence_router
from app.api.incidents import router as incidents_router
from app.api.privacy import router as privacy_router
from app.api.reports import router as reports_router
from app.api.resources import router as resources_router
from app.api.notifications import router as notifications_router
from app.api.profile import router as profile_router
from app.api.settings import router as settings_router
from app.api.demo import router as demo_router
from app.api.anam import router as anam_router

# Ensure directory structure
os.makedirs("uploads", exist_ok=True)
os.makedirs("uploads/redacted", exist_ok=True)
os.makedirs("reports", exist_ok=True)

app = FastAPI(
    title="TRACEHER Backend API",
    description="AI-Powered Digital Safety, Cybersecurity & Evidence Intelligence Platform API",
    version="2.1.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static file handlers
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/reports", StaticFiles(directory="reports"), name="reports")

# Include Routers
app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(evidence_router)
app.include_router(incidents_router)
app.include_router(privacy_router)
app.include_router(reports_router)
app.include_router(resources_router)
app.include_router(notifications_router)
app.include_router(profile_router)
app.include_router(settings_router)
app.include_router(demo_router)
app.include_router(anam_router)

@app.get("/")
def root():
    return {
        "platform": "TRACEHER",
        "tagline": "Your Digital Safety. Your Evidence. Your Control.",
        "status": "Operational",
        "api_docs": "/docs",
        "version": "2.1.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
