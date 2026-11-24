from fastapi import APIRouter
from typing import Dict, Any
from app.database import db

router = APIRouter(prefix="/api/settings", tags=["settings"])

@router.get("")
def get_settings():
    return db.data.get("settings", {
        "preferred_language": "en",
        "reduced_motion": False,
        "high_contrast": False,
        "font_size": "medium",
        "email_notifications": True,
        "retention_days": 365
    })

@router.put("")
def update_settings(payload: Dict[str, Any]):
    current = db.data.get("settings", {})
    current.update(payload)
    db.data["settings"] = current
    db.save()
    return current

@router.post("/export-data")
def export_user_data():
    return {
        "success": True,
        "message": "User data compiled for download.",
        "download_url": "/api/reports"
    }

@router.delete("/delete-account")
def delete_account():
    db.reset_demo()
    return {
        "success": True,
        "message": "All user data, evidence and incidents have been permanently wiped."
    }
