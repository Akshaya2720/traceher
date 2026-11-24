from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List, Optional
import os
import uuid
from datetime import datetime
from app.schemas import EvidenceItem, AIAnalysisItem
from app.database import db
from app.ai.ocr_engine import compute_sha256, extract_text_from_file
from app.ai.classifier import analyze_harassment_text

router = APIRouter(prefix="/api/evidence", tags=["evidence"])
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_evidence(
    file: UploadFile = File(...),
    incident_id: Optional[str] = Form(None),
    notes: Optional[str] = Form(None)
):
    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Cannot upload empty file.")
    
    file_id = f"ev-{uuid.uuid4().hex[:8]}"
    file_ext = os.path.splitext(file.filename)[1].lower()
    stored_name = f"{file_id}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, stored_name)
    
    with open(file_path, "wb") as f:
        f.write(contents)
        
    sha256 = compute_sha256(contents)
    extracted_text = extract_text_from_file(contents, file.filename)
    
    # Run immediate AI classification pipeline
    analyses = analyze_harassment_text(file_id, extracted_text)
    
    evidence_entry = {
        "id": file_id,
        "user_id": "usr-demo",
        "incident_id": incident_id,
        "original_filename": file.filename,
        "stored_filename": stored_name,
        "file_type": file.content_type or f"application/{file_ext.replace('.', '')}",
        "file_size": len(contents),
        "sha256_hash": sha256,
        "extracted_text": extracted_text,
        "uploaded_at": datetime.now().isoformat(),
        "processing_status": "completed",
        "analyses": [a.dict() for a in analyses],
        "file_url": f"/uploads/{stored_name}"
    }
    
    db.data["evidence"].insert(0, evidence_entry)
    
    # If incident_id provided, associate with incident
    if incident_id:
        for inc in db.data.get("incidents", []):
            if inc["id"] == incident_id:
                if "evidence_ids" not in inc:
                    inc["evidence_ids"] = []
                if file_id not in inc["evidence_ids"]:
                    inc["evidence_ids"].append(file_id)
                inc["evidence_count"] = len(inc["evidence_ids"])
                inc["updated_at"] = datetime.now().isoformat()
                
    db.save()
    return evidence_entry

@router.get("")
def list_evidence(incident_id: Optional[str] = None, search: Optional[str] = None):
    items = db.data.get("evidence", [])
    if incident_id:
        items = [ev for ev in items if ev.get("incident_id") == incident_id]
    if search:
        s_lower = search.lower()
        items = [
            ev for ev in items 
            if s_lower in ev.get("original_filename", "").lower() or s_lower in ev.get("extracted_text", "").lower()
        ]
    return items

@router.get("/{evidence_id}")
def get_evidence(evidence_id: str):
    for ev in db.data.get("evidence", []):
        if ev["id"] == evidence_id:
            return ev
    raise HTTPException(status_code=404, detail="Evidence not found.")

@router.post("/{evidence_id}/analyze")
def trigger_analysis(evidence_id: str):
    for ev in db.data.get("evidence", []):
        if ev["id"] == evidence_id:
            text = ev.get("extracted_text", "")
            analyses = analyze_harassment_text(evidence_id, text)
            ev["analyses"] = [a.dict() for a in analyses]
            ev["processing_status"] = "completed"
            db.save()
            return {"evidence_id": evidence_id, "analyses": ev["analyses"]}
    raise HTTPException(status_code=404, detail="Evidence not found.")

@router.delete("/{evidence_id}")
def delete_evidence(evidence_id: str):
    initial_len = len(db.data.get("evidence", []))
    db.data["evidence"] = [ev for ev in db.data.get("evidence", []) if ev["id"] != evidence_id]
    if len(db.data["evidence"]) < initial_len:
        # Also remove reference from incidents
        for inc in db.data.get("incidents", []):
            if evidence_id in inc.get("evidence_ids", []):
                inc["evidence_ids"].remove(evidence_id)
                inc["evidence_count"] = len(inc["evidence_ids"])
        db.save()
        return {"success": True, "message": "Evidence securely deleted."}
    raise HTTPException(status_code=404, detail="Evidence not found.")
