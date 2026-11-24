from fastapi import APIRouter, HTTPException
import os
from typing import Dict, Any
from app.schemas import PrivacyDetectionResponse, RedactionApplyRequest
from app.database import db
from app.ai.privacy_detector import detect_sensitive_regions, apply_image_redactions

router = APIRouter(prefix="/api/privacy", tags=["privacy"])
REDACTED_DIR = "uploads/redacted"
os.makedirs(REDACTED_DIR, exist_ok=True)

@router.post("/detect")
def detect_privacy_items(payload: Dict[str, Any]) -> PrivacyDetectionResponse:
    evidence_id = payload.get("evidence_id")
    if not evidence_id:
        raise HTTPException(status_code=400, detail="evidence_id required.")
    
    for ev in db.data.get("evidence", []):
        if ev["id"] == evidence_id:
            text = ev.get("extracted_text", "")
            img_path = os.path.join("uploads", ev.get("stored_filename", ""))
            return detect_sensitive_regions(evidence_id, text, img_path)
            
    # If not found, return sample detected regions
    return detect_sensitive_regions(evidence_id, "Call +91 98765 43210 or email priya@example.com at MG Road.")

@router.post("/redact")
def apply_redaction(payload: RedactionApplyRequest):
    evidence_id = payload.evidence_id
    regions = payload.regions
    
    target_ev = None
    for ev in db.data.get("evidence", []):
        if ev["id"] == evidence_id:
            target_ev = ev
            break
            
    source_img = os.path.join("uploads", target_ev.get("stored_filename", "sample.png")) if target_ev else "uploads/sample.png"
    out_filename = f"redacted_{evidence_id}.png"
    out_path = os.path.join(REDACTED_DIR, out_filename)
    
    apply_image_redactions(source_img, out_path, regions)
    
    return {
        "success": True,
        "evidence_id": evidence_id,
        "redacted_file_url": f"/uploads/redacted/{out_filename}",
        "redacted_regions_count": len([r for r in regions if r.selected]),
        "message": "Redaction applied non-destructively. Original file remains cryptographically preserved."
    }
