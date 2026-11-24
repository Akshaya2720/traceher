from fastapi import APIRouter
from typing import Dict, Any
from app.services.demo_service import get_demo_scenarios
from app.database import db

router = APIRouter(prefix="/api/demo", tags=["demo"])

@router.get("/scenarios")
def list_scenarios() -> Dict[str, Any]:
    return get_demo_scenarios()

@router.post("/load/{scenario_key}")
def load_scenario(scenario_key: str):
    data = get_demo_scenarios()
    for sc in data["scenarios"]:
        if sc["key"] == scenario_key:
            # Add this incident and evidence to active records if not present
            inc = sc["incident"]
            if not any(i["id"] == inc["id"] for i in db.data.get("incidents", [])):
                db.data["incidents"].insert(0, inc)
            for ev in sc["evidence"]:
                if not any(e["id"] == ev["id"] for e in db.data.get("evidence", [])):
                    db.data["evidence"].insert(0, ev)
            db.save()
            return {"success": True, "loaded_scenario": sc}
    return {"success": False, "message": "Scenario not found."}

@router.post("/reset")
def reset_demo_data():
    db.reset_demo()
    return {
        "success": True,
        "message": "Demo database successfully reset to clean default demonstration state."
    }
