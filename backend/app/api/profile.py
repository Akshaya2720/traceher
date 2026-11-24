from fastapi import APIRouter
from typing import Dict, Any
from app.database import db

router = APIRouter(prefix="/api/profile", tags=["profile"])

@router.get("")
def get_profile():
    if db.data.get("users"):
        u = db.data["users"][0]
        return {
            "id": u["id"],
            "full_name": u["full_name"],
            "email": u["email"],
            "preferred_language": u.get("preferred_language", "en"),
            "account_created": u.get("created_at", "2026-11-10T10:00:00"),
            "two_factor_enabled": True,
            "evidence_count": len(db.data.get("evidence", [])),
            "incidents_count": len(db.data.get("incidents", []))
        }
    return {
        "id": "usr-demo",
        "full_name": "Ananya Sharma",
        "email": "ananya.sharma@example.com",
        "preferred_language": "en",
        "account_created": "2026-11-10T10:00:00",
        "two_factor_enabled": True,
        "evidence_count": 0,
        "incidents_count": 0
    }

@router.put("")
def update_profile(payload: Dict[str, Any]):
    if db.data.get("users"):
        u = db.data["users"][0]
        if "full_name" in payload:
            u["full_name"] = payload["full_name"]
        if "preferred_language" in payload:
            u["preferred_language"] = payload["preferred_language"]
        db.save()
        return u
    return payload
