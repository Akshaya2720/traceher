from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import os
import uuid
from datetime import datetime
from typing import Dict, Any
from app.database import db
from app.services.report_generator import generate_pdf_report

router = APIRouter(prefix="/api/reports", tags=["reports"])

@router.post("/generate")
def create_report(payload: Dict[str, Any]):
    incident_id = payload.get("incident_id")
    if not incident_id:
        raise HTTPException(status_code=400, detail="incident_id is required.")
        
    target_inc = None
    for inc in db.data.get("incidents", []):
        if inc["id"] == incident_id:
            target_inc = inc
            break
            
    if not target_inc:
        raise HTTPException(status_code=404, detail="Incident not found.")
        
    evidence_items = [
        ev for ev in db.data.get("evidence", [])
        if ev["id"] in target_inc.get("evidence_ids", []) or ev.get("incident_id") == incident_id
    ]
    
    # Generate ReportLab PDF
    pdf_path = generate_pdf_report(target_inc, evidence_items, output_dir="reports")
    file_size_kb = round(os.path.getsize(pdf_path) / 1024, 1) if os.path.exists(pdf_path) else 128
    
    rep_id = f"REP-{uuid.uuid4().hex[:8].upper()}"
    report_entry = {
        "id": rep_id,
        "incident_id": incident_id,
        "incident_reference": target_inc.get("reference_number", "INC-001"),
        "incident_title": target_inc.get("title", "Incident"),
        "report_title": f"Evidence Dossier ({target_inc.get('reference_number', 'INC-001')})",
        "file_path": pdf_path,
        "download_url": f"/api/reports/{rep_id}/download",
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "file_size_kb": file_size_kb
    }
    
    db.data["reports"].insert(0, report_entry)
    
    # Also add notification
    db.data["notifications"].insert(0, {
        "id": f"notif-{uuid.uuid4().hex[:6]}",
        "user_id": "usr-demo",
        "title": "Incident Dossier Ready",
        "message": f"Official PDF report generated for incident {target_inc.get('reference_number')}.",
        "category": "report",
        "is_read": False,
        "action_url": "/report-center",
        "created_at": datetime.now().isoformat()
    })
    
    db.save()
    return report_entry

@router.get("")
def list_reports():
    return db.data.get("reports", [])

@router.get("/{report_id}/download")
def download_report(report_id: str):
    for r in db.data.get("reports", []):
        if r["id"] == report_id:
            path = r.get("file_path")
            if path and os.path.exists(path):
                return FileResponse(path, media_type="application/pdf", filename=os.path.basename(path))
            # If not yet on disk, re-generate on the fly
            for inc in db.data.get("incidents", []):
                if inc["id"] == r.get("incident_id"):
                    ev_items = [ev for ev in db.data.get("evidence", []) if ev.get("incident_id") == inc["id"]]
                    new_path = generate_pdf_report(inc, ev_items, output_dir="reports")
                    return FileResponse(new_path, media_type="application/pdf", filename=os.path.basename(new_path))
                    
    # Fallback to generating a fresh one for the first incident
    if db.data.get("incidents"):
        first_inc = db.data["incidents"][0]
        ev_items = [ev for ev in db.data.get("evidence", []) if ev.get("incident_id") == first_inc["id"]]
        new_path = generate_pdf_report(first_inc, ev_items, output_dir="reports")
        return FileResponse(new_path, media_type="application/pdf", filename="TraceHer_Official_Evidence_Dossier.pdf")
        
    raise HTTPException(status_code=404, detail="Report file not found.")

@router.delete("/{report_id}")
def delete_report(report_id: str):
    init_len = len(db.data.get("reports", []))
    db.data["reports"] = [r for r in db.data.get("reports", []) if r["id"] != report_id]
    if len(db.data["reports"]) < init_len:
        db.save()
        return {"success": True, "message": "Report deleted."}
    raise HTTPException(status_code=404, detail="Report not found.")
