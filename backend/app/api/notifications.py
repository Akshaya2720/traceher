from fastapi import APIRouter
from app.database import db

router = APIRouter(prefix="/api/notifications", tags=["notifications"])

@router.get("")
def list_notifications():
    return db.data.get("notifications", [])

@router.patch("/{notif_id}/read")
def mark_read(notif_id: str):
    for n in db.data.get("notifications", []):
        if n["id"] == notif_id:
            n["is_read"] = True
            db.save()
            return {"success": True, "notification": n}
    return {"success": False}

@router.post("/read-all")
def mark_all_read():
    for n in db.data.get("notifications", []):
        n["is_read"] = True
    db.save()
    return {"success": True, "message": "All notifications marked as read."}

@router.delete("/clear")
def clear_all():
    db.data["notifications"] = []
    db.save()
    return {"success": True, "message": "Notifications cleared."}
