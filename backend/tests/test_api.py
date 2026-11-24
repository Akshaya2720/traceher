import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.ai.ocr_engine import compute_sha256
from app.ai.classifier import analyze_harassment_text
from app.ai.privacy_detector import detect_sensitive_regions

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["platform"] == "TRACEHER"
    assert data["status"] == "Operational"

def test_dashboard_summary():
    response = client.get("/api/dashboard/summary")
    assert response.status_code == 200
    data = response.json()
    assert "total_incidents" in data
    assert "total_evidence" in data
    assert "total_analyses" in data
    assert "total_reports" in data

def test_dashboard_analytics():
    response = client.get("/api/dashboard/analytics")
    assert response.status_code == 200
    data = response.json()
    assert "category_distribution" in data
    assert "activity_timeline" in data

def test_sha256_computation():
    sample_bytes = b"Digital harassment evidence string for testing SHA256 integrity."
    digest = compute_sha256(sample_bytes)
    assert len(digest) == 64
    assert isinstance(digest, str)

def test_ai_classifier():
    threat_text = "Watch your back tomorrow on MG Road. I will hurt you if you ignore me."
    results = analyze_harassment_text("ev-test-1", threat_text)
    assert len(results) > 0
    categories = [r.category for r in results]
    assert "Threats and intimidation" in categories or "Stalking indicators" in categories
    assert all(r.confidence > 0.5 for r in results)

def test_privacy_detector():
    text_with_pii = "Contact me at +91 98765 43210 or email priya@example.com at MG Road."
    resp = detect_sensitive_regions("ev-test-2", text_with_pii)
    assert resp.sensitive_items_found >= 2
    types = [r.type for r in resp.regions]
    assert "phone" in types
    assert "email" in types

def test_incidents_crud():
    # 1. List
    res = client.get("/api/incidents")
    assert res.status_code == 200
    init_count = len(res.json())

    # 2. Create
    payload = {
        "title": "Automated Unit Test Incident",
        "description": "Test case description for automated testing verification",
        "category": "Threats and intimidation",
        "incident_date": "2026-11-24",
        "evidence_ids": []
    }
    create_res = client.post("/api/incidents", json=payload)
    assert create_res.status_code == 200
    created = create_res.json()
    assert created["title"] == payload["title"]
    inc_id = created["id"]

    # 3. Get Details
    get_res = client.get(f"/api/incidents/{inc_id}")
    assert get_res.status_code == 200

    # 4. Add Timeline Event
    tl_res = client.post(f"/api/incidents/{inc_id}/timeline", json={
        "title": "Threat Escalation",
        "description": "Second call received from unknown number",
        "event_date": "2026-11-24 12:00",
        "source_type": "call"
    })
    assert tl_res.status_code == 200

    # 5. Get Relationships
    rel_res = client.get(f"/api/incidents/{inc_id}/relationships")
    assert rel_res.status_code == 200
    assert "nodes" in rel_res.json()
    assert "edges" in rel_res.json()

def test_pdf_report_generation():
    # Fetch first incident
    res = client.get("/api/incidents")
    incidents = res.json()
    assert len(incidents) > 0
    inc_id = incidents[0]["id"]

    rep_res = client.post("/api/reports/generate", json={"incident_id": inc_id})
    assert rep_res.status_code == 200
    rep_data = rep_res.json()
    assert "id" in rep_data
    assert "download_url" in rep_data

def test_demo_reset():
    res = client.post("/api/demo/reset")
    assert res.status_code == 200
    assert res.json()["success"] is True
