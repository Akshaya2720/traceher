import json
import os
import uuid
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional
from app.services.demo_service import get_demo_scenarios

DATA_FILE = "traceher_data.json"

class Database:
    def __init__(self, filepath: str = DATA_FILE):
        self.filepath = filepath
        self.data: Dict[str, Any] = {
            "users": [],
            "incidents": [],
            "evidence": [],
            "reports": [],
            "notifications": [],
            "settings": {
                "preferred_language": "en",
                "reduced_motion": False,
                "high_contrast": False,
                "font_size": "medium",
                "email_notifications": True,
                "retention_days": 365
            }
        }
        self.load()
        if not self.data["incidents"]:
            self.seed_defaults()

    def load(self):
        if os.path.exists(self.filepath):
            try:
                with open(self.filepath, "r", encoding="utf-8") as f:
                    self.data = json.load(f)
            except Exception as e:
                print(f"Error loading database file: {e}")

    def save(self):
        try:
            with open(self.filepath, "w", encoding="utf-8") as f:
                json.dump(self.data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Error saving database file: {e}")

    def seed_defaults(self):
        """Seeds realistic demonstration and user data."""
        demo_data = get_demo_scenarios()
        now = datetime.now()

        # Seed default user
        default_user = {
            "id": "usr-demo",
            "full_name": "Ananya Sharma",
            "email": "ananya.sharma@example.com",
            "password_hash": "demo_hashed_pass",
            "preferred_language": "en",
            "created_at": (now - timedelta(days=14)).isoformat()
        }
        self.data["users"] = [default_user]

        # Seed incidents and evidence
        for sc in demo_data["scenarios"]:
            self.data["incidents"].append(sc["incident"])
            for ev in sc["evidence"]:
                self.data["evidence"].append(ev)

        # Seed initial notifications
        self.data["notifications"] = [
            {
                "id": "notif-01",
                "user_id": "usr-demo",
                "title": "AI Analysis Completed",
                "message": "Threat indicators and geolocation patterns identified for Exhibit EX-01.",
                "category": "analysis",
                "is_read": False,
                "action_url": "/ai-analysis",
                "created_at": (now - timedelta(hours=2)).isoformat()
            },
            {
                "id": "notif-02",
                "user_id": "usr-demo",
                "title": "Evidence Hash Preserved",
                "message": "SHA-256 fingerprint verified for extortion_message_log.png.",
                "category": "upload",
                "is_read": True,
                "action_url": "/evidence",
                "created_at": (now - timedelta(days=1)).isoformat()
            },
            {
                "id": "notif-03",
                "user_id": "usr-demo",
                "title": "Safety Alert: Helpline Available",
                "message": "National Cybercrime Helpline 1930 is reachable 24/7 for emergency reporting.",
                "category": "system",
                "is_read": False,
                "action_url": "/response-navigator",
                "created_at": (now - timedelta(days=2)).isoformat()
            }
        ]

        # Seed an initial report item
        self.data["reports"] = [
            {
                "id": "REP-2026-0814",
                "incident_id": "inc-demo-threats-01",
                "incident_reference": "TRC-2026-THREAT",
                "incident_title": "Escalating Direct Threats and Location Surveillance",
                "report_title": "Official Incident Evidence Dossier (TRC-2026-THREAT)",
                "file_path": "reports/Sample_Dossier.pdf",
                "download_url": "/api/reports/download/sample",
                "generated_at": (now - timedelta(hours=5)).strftime("%Y-%m-%d %H:%M"),
                "file_size_kb": 142
            }
        ]
        self.save()

    def reset_demo(self):
        """Resets database back to clean initial demo state."""
        self.data["incidents"] = []
        self.data["evidence"] = []
        self.data["reports"] = []
        self.data["notifications"] = []
        self.seed_defaults()
        return True

db = Database()
