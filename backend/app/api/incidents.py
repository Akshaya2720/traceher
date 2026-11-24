from fastapi import APIRouter, HTTPException
from typing import List, Optional
import uuid
from datetime import datetime
from app.schemas import IncidentCreate, TimelineEvent, RelationshipGraph
from app.database import db
from app.ai.pattern_analyzer import build_incident_relationship_graph

router = APIRouter(prefix="/api/incidents", tags=["incidents"])

@router.get("")
def list_incidents(category: Optional[str] = None, search: Optional[str] = None):
    incidents = db.data.get("incidents", [])
    if category and category != "All":
        incidents = [i for i in incidents if i.get("category") == category]
    if search:
        s = search.lower()
        incidents = [
            i for i in incidents 
            if s in i.get("title", "").lower() or s in i.get("reference_number", "").lower() or s in i.get("description", "").lower()
        ]
    return incidents

@router.post("")
def create_incident(payload: IncidentCreate):
    inc_id = f"inc-{uuid.uuid4().hex[:8]}"
    ref_num = f"TRC-2026-{uuid.uuid4().hex[:4].upper()}"
    now = datetime.now()
    
    new_inc = {
        "id": inc_id,
        "user_id": "usr-demo",
        "reference_number": ref_num,
        "title": payload.title,
        "description": payload.description,
        "category": payload.category,
        "incident_date": payload.incident_date,
        "status": "active",
        "created_at": now.isoformat(),
        "updated_at": now.isoformat(),
        "evidence_count": len(payload.evidence_ids or []),
        "evidence_ids": payload.evidence_ids or [],
        "timeline": [
            {
                "id": f"tl-{uuid.uuid4().hex[:6]}",
                "incident_id": inc_id,
                "event_date": f"{payload.incident_date} 10:00",
                "title": "Incident Logged",
                "description": payload.description[:120] if payload.description else "Initial incident record created.",
                "category": payload.category,
                "source_type": "user_reported"
            }
        ]
    }
    db.data["incidents"].insert(0, new_inc)
    db.save()
    return new_inc

@router.get("/{incident_id}")
def get_incident(incident_id: str):
    for inc in db.data.get("incidents", []):
        if inc["id"] == incident_id:
            # Also attach associated evidence objects
            ev_list = [ev for ev in db.data.get("evidence", []) if ev["id"] in inc.get("evidence_ids", []) or ev.get("incident_id") == incident_id]
            res = dict(inc)
            res["evidence_items"] = ev_list
            return res
    raise HTTPException(status_code=404, detail="Incident not found.")

@router.put("/{incident_id}")
def update_incident(incident_id: str, payload: IncidentCreate):
    for inc in db.data.get("incidents", []):
        if inc["id"] == incident_id:
            inc["title"] = payload.title
            inc["description"] = payload.description
            inc["category"] = payload.category
            inc["incident_date"] = payload.incident_date
            inc["updated_at"] = datetime.now().isoformat()
            db.save()
            return inc
    raise HTTPException(status_code=404, detail="Incident not found.")

@router.delete("/{incident_id}")
def delete_incident(incident_id: str):
    initial_len = len(db.data.get("incidents", []))
    db.data["incidents"] = [i for i in db.data.get("incidents", []) if i["id"] != incident_id]
    if len(db.data["incidents"]) < initial_len:
        db.save()
        return {"success": True, "message": "Incident deleted."}
    raise HTTPException(status_code=404, detail="Incident not found.")

@router.get("/{incident_id}/timeline")
def get_timeline(incident_id: str):
    for inc in db.data.get("incidents", []):
        if inc["id"] == incident_id:
            return inc.get("timeline", [])
    raise HTTPException(status_code=404, detail="Incident not found.")

@router.post("/{incident_id}/timeline")
def add_timeline_event(incident_id: str, event_data: dict):
    for inc in db.data.get("incidents", []):
        if inc["id"] == incident_id:
            new_event = {
                "id": f"tl-{uuid.uuid4().hex[:6]}",
                "incident_id": incident_id,
                "event_date": event_data.get("event_date", datetime.now().strftime("%Y-%m-%d %H:%M")),
                "title": event_data.get("title", "Event logged"),
                "description": event_data.get("description", ""),
                "category": event_data.get("category", inc.get("category")),
                "source_type": event_data.get("source_type", "user_reported")
            }
            if "timeline" not in inc:
                inc["timeline"] = []
            inc["timeline"].append(new_event)
            # Sort chronologically
            inc["timeline"] = sorted(inc["timeline"], key=lambda x: x.get("event_date", ""))
            inc["updated_at"] = datetime.now().isoformat()
            db.save()
            return new_event
    raise HTTPException(status_code=404, detail="Incident not found.")

@router.get("/{incident_id}/relationships")
def get_incident_relationships(incident_id: str) -> RelationshipGraph:
    for inc in db.data.get("incidents", []):
        if inc["id"] == incident_id:
            evidence_items = [
                ev for ev in db.data.get("evidence", []) 
                if ev["id"] in inc.get("evidence_ids", []) or ev.get("incident_id") == incident_id
            ]
            return build_incident_relationship_graph(inc, evidence_items)
    raise HTTPException(status_code=404, detail="Incident not found.")
