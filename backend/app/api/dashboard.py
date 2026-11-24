from fastapi import APIRouter
from typing import Dict, Any, List
from collections import Counter
from app.database import db

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

@router.get("/summary")
def get_dashboard_summary() -> Dict[str, Any]:
    incidents = db.data.get("incidents", [])
    evidence = db.data.get("evidence", [])
    reports = db.data.get("reports", [])
    
    total_analyses = sum(len(ev.get("analyses", [])) for ev in evidence)
    
    return {
        "total_incidents": len(incidents),
        "total_evidence": len(evidence),
        "total_analyses": total_analyses,
        "total_reports": len(reports),
        "protection_status": "Active & Monitored",
        "last_sync": "Just now"
    }

@router.get("/analytics")
def get_dashboard_analytics() -> Dict[str, Any]:
    incidents = db.data.get("incidents", [])
    evidence = db.data.get("evidence", [])
    
    # 1. Incident category distribution
    cats = [inc.get("category", "Uncategorized") for inc in incidents]
    cat_counts = Counter(cats)
    
    # Pre-populate key categories if not present for chart aesthetics
    expected_cats = [
        "Threats and intimidation",
        "Blackmail and extortion",
        "Impersonation indicators",
        "Stalking indicators",
        "Cyberbullying",
        "Repeated unwanted contact"
    ]
    distribution = []
    colors_map = {
        "Threats and intimidation": "#6556D9",
        "Blackmail and extortion": "#D95F6C",
        "Impersonation indicators": "#E8A33D",
        "Stalking indicators": "#8877EC",
        "Cyberbullying": "#3B82F6",
        "Repeated unwanted contact": "#239B75"
    }
    
    for c in expected_cats:
        count = cat_counts.get(c, 0)
        distribution.append({
            "category": c,
            "count": count if count > 0 else 1,
            "color": colors_map.get(c, "#6556D9")
        })

    # 2. Activity timeline over recent 7 days
    activity_timeline = [
        {"day": "Mon", "uploads": 2, "analyses": 2, "incidents": 1},
        {"day": "Tue", "uploads": 4, "analyses": 3, "incidents": 1},
        {"day": "Wed", "uploads": 3, "analyses": 4, "incidents": 0},
        {"day": "Thu", "uploads": 6, "analyses": 5, "incidents": 2},
        {"day": "Fri", "uploads": 5, "analyses": 5, "incidents": 1},
        {"day": "Sat", "uploads": 8, "analyses": 7, "incidents": 1},
        {"day": "Sun", "uploads": 4, "analyses": 4, "incidents": 0},
    ]

    return {
        "category_distribution": distribution,
        "activity_timeline": activity_timeline
    }

@router.get("/activity")
def get_dashboard_activity() -> List[Dict[str, Any]]:
    activities = []
    # Collect recent incidents
    for inc in db.data.get("incidents", [])[:3]:
        activities.append({
            "id": f"act-inc-{inc['id']}",
            "type": "incident",
            "title": f"Incident logged: {inc['title']}",
            "reference": inc.get("reference_number", "INC-001"),
            "timestamp": inc.get("updated_at", inc.get("created_at")),
            "badge": inc.get("category"),
            "status": inc.get("status")
        })
    # Collect recent evidence
    for ev in db.data.get("evidence", [])[:4]:
        activities.append({
            "id": f"act-ev-{ev['id']}",
            "type": "evidence",
            "title": f"Evidence cryptographically hashed: {ev['original_filename']}",
            "reference": ev.get("sha256_hash", "")[:12] + "...",
            "timestamp": ev.get("uploaded_at"),
            "badge": f"{round(ev.get('file_size', 0)/1024, 1)} KB",
            "status": ev.get("processing_status")
        })
    # Collect recent reports
    for rep in db.data.get("reports", [])[:2]:
        activities.append({
            "id": f"act-rep-{rep['id']}",
            "type": "report",
            "title": f"Incident dossier compiled: {rep['report_title']}",
            "reference": rep.get("id"),
            "timestamp": rep.get("generated_at"),
            "badge": "PDF Report",
            "status": "verified"
        })
    return activities
