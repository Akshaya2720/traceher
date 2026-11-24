from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime

class UserBase(BaseModel):
    full_name: str
    email: str
    preferred_language: str = "en"

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(UserBase):
    id: str
    created_at: str

class AIAnalysisItem(BaseModel):
    id: str
    evidence_id: str
    category: str
    confidence: float
    explanation: str
    supporting_text: str
    suggested_step: str
    model_version: str = "TraceHer-DistilBERT-v2.1"
    reviewed_status: str = "pending" # confirmed, changed, irrelevant, pending
    user_notes: Optional[str] = None
    created_at: str

class EvidenceItem(BaseModel):
    id: str
    user_id: str
    incident_id: Optional[str] = None
    original_filename: str
    stored_filename: str
    file_type: str
    file_size: int
    sha256_hash: str
    extracted_text: Optional[str] = ""
    uploaded_at: str
    processing_status: str = "completed" # processing, completed, failed
    analyses: List[AIAnalysisItem] = []
    file_url: Optional[str] = None

class TimelineEvent(BaseModel):
    id: str
    incident_id: str
    evidence_id: Optional[str] = None
    event_date: str
    title: str
    description: str
    category: Optional[str] = None
    source_type: str = "user_reported" # message, call, post, direct_message, user_reported

class RelationshipNode(BaseModel):
    id: str
    label: str
    type: str # incident, evidence, account, message, phone
    details: Optional[Dict[str, Any]] = None

class RelationshipEdge(BaseModel):
    id: str
    source: str
    target: str
    relation: str # associated_with, appears_in, repeated_contact, user_confirmed
    confidence: float = 0.95
    verified: bool = False

class RelationshipGraph(BaseModel):
    nodes: List[RelationshipNode]
    edges: List[RelationshipEdge]

class IncidentItem(BaseModel):
    id: str
    user_id: str
    reference_number: str
    title: str
    description: str
    category: str
    incident_date: str
    status: str = "active" # active, under_review, resolved, archived
    created_at: str
    updated_at: str
    evidence_count: int = 0
    evidence_ids: List[str] = []
    timeline: List[TimelineEvent] = []

class IncidentCreate(BaseModel):
    title: str
    description: str
    category: str
    incident_date: str
    evidence_ids: Optional[List[str]] = []

class RedactionRegion(BaseModel):
    id: str
    type: str # phone, email, address, name, face, custom
    text: Optional[str] = None
    x: float # 0 to 1 percentage or pixel
    y: float
    width: float
    height: float
    selected: bool = True

class PrivacyDetectionResponse(BaseModel):
    evidence_id: str
    sensitive_items_found: int
    regions: List[RedactionRegion]
    detected_types: List[str]

class RedactionApplyRequest(BaseModel):
    evidence_id: str
    regions: List[RedactionRegion]

class ReportItem(BaseModel):
    id: str
    incident_id: str
    incident_reference: str
    incident_title: str
    report_title: str
    file_path: str
    download_url: str
    generated_at: str
    file_size_kb: int

class NotificationItem(BaseModel):
    id: str
    user_id: str
    title: str
    message: str
    category: str # upload, analysis, report, system, incident
    is_read: bool = False
    action_url: Optional[str] = None
    created_at: str

class SettingsUpdate(BaseModel):
    preferred_language: Optional[str] = None
    reduced_motion: Optional[bool] = None
    high_contrast: Optional[bool] = None
    font_size: Optional[str] = None
    email_notifications: Optional[bool] = None
    retention_days: Optional[int] = None
