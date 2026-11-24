from typing import Dict, Any, List
from datetime import datetime, timedelta

def get_demo_scenarios() -> Dict[str, Any]:
    """
    Returns the three rich fictional demonstration scenarios required for judging and walkthroughs.
    No real personal or victim data is used.
    """
    now = datetime.now()

    # Scenario A: Online Threats
    scenario_a_incident = {
        "id": "inc-demo-threats-01",
        "user_id": "usr-demo",
        "reference_number": "TRC-2026-THREAT",
        "title": "Escalating Direct Threats and Location Surveillance",
        "description": "Fictional case: Received repeated aggressive direct messages referencing physical office location and extortion threats if unblocked.",
        "category": "Threats and intimidation",
        "incident_date": (now - timedelta(days=3)).strftime("%Y-%m-%d"),
        "status": "active",
        "created_at": (now - timedelta(days=3)).isoformat(),
        "updated_at": (now - timedelta(hours=4)).isoformat(),
        "evidence_count": 3,
        "evidence_ids": ["ev-demo-t1", "ev-demo-t2", "ev-demo-t3"],
        "timeline": [
            {
                "id": "tl-demo-t1",
                "incident_id": "inc-demo-threats-01",
                "event_date": (now - timedelta(days=3, hours=10)).strftime("%Y-%m-%d %H:%M"),
                "title": "Initial Harassment via Direct Message",
                "description": "Sender @shadow_stalker99 initiated contact with derogatory comments regarding recent university seminar speech.",
                "category": "Cyberbullying",
                "source_type": "direct_message"
            },
            {
                "id": "tl-demo-t2",
                "incident_id": "inc-demo-threats-01",
                "event_date": (now - timedelta(days=2, hours=4)).strftime("%Y-%m-%d %H:%M"),
                "title": "Specific Workplace Geolocation Mention",
                "description": "Sender referenced victim's office building on MG Road: 'I know where you work on MG Road. Watch your back tomorrow.'",
                "category": "Stalking indicators",
                "source_type": "direct_message"
            },
            {
                "id": "tl-demo-t3",
                "incident_id": "inc-demo-threats-01",
                "event_date": (now - timedelta(days=1, hours=2)).strftime("%Y-%m-%d %H:%M"),
                "title": "Explicit Blackmail and Non-Consensual Distribution Threat",
                "description": "Ultimatum: 'Answer my call right now or I will post those private photos to all your college friends.'",
                "category": "Blackmail and extortion",
                "source_type": "direct_message"
            }
        ]
    }

    scenario_a_evidence = [
        {
            "id": "ev-demo-t1",
            "user_id": "usr-demo",
            "incident_id": "inc-demo-threats-01",
            "original_filename": "threat_dm_screenshot_01.png",
            "stored_filename": "threat_dm_screenshot_01.png",
            "file_type": "image/png",
            "file_size": 248102,
            "sha256_hash": "a4f89d31c2e1b827e85c9a17382bc194df62881b490f23ce0824b238d9e115ca",
            "extracted_text": "[Direct Message]\n@shadow_stalker99: You think you can ignore me? I know where you work on MG Road. Watch your back tomorrow.\nCall me on +91 98765 43210 immediately.",
            "uploaded_at": (now - timedelta(days=2)).isoformat(),
            "processing_status": "completed",
            "analyses": [
                {
                    "id": "ana-t1-1",
                    "evidence_id": "ev-demo-t1",
                    "category": "Threats and intimidation",
                    "confidence": 0.96,
                    "explanation": "Clear explicit threat to physical safety combined with direct intimidation language.",
                    "supporting_text": "...Watch your back tomorrow...",
                    "suggested_step": "Preserve unedited timestamps, immediately restrict direct contact, and consult National Cybercrime Helpline 1930 / Emergency 112.",
                    "model_version": "TraceHer-DeBERTa-Safety-v2.3",
                    "reviewed_status": "confirmed",
                    "created_at": (now - timedelta(days=2)).isoformat()
                },
                {
                    "id": "ana-t1-2",
                    "evidence_id": "ev-demo-t1",
                    "category": "Stalking indicators",
                    "confidence": 0.91,
                    "explanation": "Mentions physical workplace location ('MG Road') demonstrating unauthorized surveillance.",
                    "supporting_text": "...I know where you work on MG Road...",
                    "suggested_step": "Alert trusted campus/workplace security contacts and log geographic references.",
                    "model_version": "TraceHer-DeBERTa-Safety-v2.3",
                    "reviewed_status": "confirmed",
                    "created_at": (now - timedelta(days=2)).isoformat()
                }
            ]
        },
        {
            "id": "ev-demo-t2",
            "user_id": "usr-demo",
            "incident_id": "inc-demo-threats-01",
            "original_filename": "extortion_message_log.png",
            "stored_filename": "extortion_message_log.png",
            "file_type": "image/png",
            "file_size": 312048,
            "sha256_hash": "7b830cd1e30f1498b9e6612048ef01d84ac36720bf48a91523e387c2b04f1289",
            "extracted_text": "[Direct Message]\n@shadow_stalker99: Answer my call right now or I will post those private photos to all your college friends.\nI have your email ananya.sharma@example.com.",
            "uploaded_at": (now - timedelta(days=1)).isoformat(),
            "processing_status": "completed",
            "analyses": [
                {
                    "id": "ana-t2-1",
                    "evidence_id": "ev-demo-t2",
                    "category": "Blackmail and extortion",
                    "confidence": 0.98,
                    "explanation": "Coercive ultimatum demanding response under threat of non-consensual image distribution to social contacts.",
                    "supporting_text": "...post those private photos to all your college friends...",
                    "suggested_step": "Do NOT comply with extortion demands. Preserve digital evidence and file an immediate report at cybercrime.gov.in.",
                    "model_version": "TraceHer-DeBERTa-Safety-v2.3",
                    "reviewed_status": "confirmed",
                    "created_at": (now - timedelta(days=1)).isoformat()
                }
            ]
        }
    ]

    # Scenario B: Impersonation
    scenario_b_incident = {
        "id": "inc-demo-impersonation-02",
        "user_id": "usr-demo",
        "reference_number": "TRC-2026-IMPRSN",
        "title": "Unauthorized Profile Clone & Defamatory Misuse of Photos",
        "description": "Fictional case: Discovery of cloned Instagram profile using stolen portrait photos and distributing misleading claims.",
        "category": "Impersonation indicators",
        "incident_date": (now - timedelta(days=5)).strftime("%Y-%m-%d"),
        "status": "under_review",
        "created_at": (now - timedelta(days=5)).isoformat(),
        "updated_at": (now - timedelta(days=1)).isoformat(),
        "evidence_count": 2,
        "evidence_ids": ["ev-demo-i1", "ev-demo-i2"],
        "timeline": [
            {
                "id": "tl-demo-i1",
                "incident_id": "inc-demo-impersonation-02",
                "event_date": (now - timedelta(days=5, hours=8)).strftime("%Y-%m-%d %H:%M"),
                "title": "Discovery of Cloned Account",
                "description": "Friends alerted user to handle @priya_verma_official_99 using her pictures and bio info.",
                "category": "Impersonation indicators",
                "source_type": "post"
            },
            {
                "id": "tl-demo-i2",
                "incident_id": "inc-demo-impersonation-02",
                "event_date": (now - timedelta(days=4, hours=2)).strftime("%Y-%m-%d %H:%M"),
                "title": "Fraudulent Solicitations Sent to Contacts",
                "description": "Fake account messaged 15 mutual contacts requesting UPI financial transfers.",
                "category": "Blackmail and extortion",
                "source_type": "direct_message"
            }
        ]
    }

    scenario_b_evidence = [
        {
            "id": "ev-demo-i1",
            "user_id": "usr-demo",
            "incident_id": "inc-demo-impersonation-02",
            "original_filename": "cloned_profile_proof.png",
            "stored_filename": "cloned_profile_proof.png",
            "file_type": "image/png",
            "file_size": 420910,
            "sha256_hash": "5d2b719036c845e227090b8f10ea8762d3a95bf089d123ac45f98e72154cdba1",
            "extracted_text": "Instagram Profile:\n@priya_verma_official_99\nBio: 'Original Priya Verma. Old account hacked. DM for private content or send UPI to priya.fraud@okaxis.'\nPosts: 12 | Followers: 48 | Following: 310",
            "uploaded_at": (now - timedelta(days=4)).isoformat(),
            "processing_status": "completed",
            "analyses": [
                {
                    "id": "ana-i1-1",
                    "evidence_id": "ev-demo-i1",
                    "category": "Impersonation indicators",
                    "confidence": 0.95,
                    "explanation": "Account claims false identity ('Original Priya Verma') and uses victim personal likeness.",
                    "supporting_text": "...Original Priya Verma. Old account hacked...",
                    "suggested_step": "Submit an impersonation takedown notice to the hosting social platform and archive the profile URL and unique user ID.",
                    "model_version": "TraceHer-DeBERTa-Safety-v2.3",
                    "reviewed_status": "confirmed",
                    "created_at": (now - timedelta(days=4)).isoformat()
                }
            ]
        }
    ]

    # Scenario C: Repeated Harassment (Multi-Account)
    scenario_c_incident = {
        "id": "inc-demo-repeated-03",
        "user_id": "usr-demo",
        "reference_number": "TRC-2026-REPEATED",
        "title": "Coordinated Multi-Account Harassment and Spam Calls",
        "description": "Fictional case: Targeted spamming and recurring threatening calls from burner VoIP numbers after social blocking.",
        "category": "Repeated unwanted contact",
        "incident_date": (now - timedelta(days=7)).strftime("%Y-%m-%d"),
        "status": "active",
        "created_at": (now - timedelta(days=7)).isoformat(),
        "updated_at": (now - timedelta(hours=1)).isoformat(),
        "evidence_count": 3,
        "evidence_ids": ["ev-demo-r1", "ev-demo-r2", "ev-demo-r3"],
        "timeline": [
            {
                "id": "tl-demo-r1",
                "incident_id": "inc-demo-repeated-03",
                "event_date": (now - timedelta(days=7)).strftime("%Y-%m-%d 14:00"),
                "title": "Block on Primary Account @anon_user01",
                "description": "Primary handle blocked after persistent abusive commentary.",
                "category": "Repeated unwanted contact",
                "source_type": "post"
            },
            {
                "id": "tl-demo-r2",
                "incident_id": "inc-demo-repeated-03",
                "event_date": (now - timedelta(days=6, hours=3)).strftime("%Y-%m-%d %H:%M"),
                "title": "Outreach from Second Burner Account @anon_user02",
                "description": "'Why did you block me? You cannot hide from me.'",
                "category": "Repeated unwanted contact",
                "source_type": "direct_message"
            },
            {
                "id": "tl-demo-r3",
                "incident_id": "inc-demo-repeated-03",
                "event_date": (now - timedelta(days=5, hours=6)).strftime("%Y-%m-%d %H:%M"),
                "title": "Third Handle @shadow_backup created",
                "description": "Aggressive barrage of 45 missed calls within 2 hours.",
                "category": "Repeated unwanted contact",
                "source_type": "call"
            }
        ]
    }

    scenario_c_evidence = [
        {
            "id": "ev-demo-r1",
            "user_id": "usr-demo",
            "incident_id": "inc-demo-repeated-03",
            "original_filename": "call_log_missed_barrage.png",
            "stored_filename": "call_log_missed_barrage.png",
            "file_type": "image/png",
            "file_size": 189201,
            "sha256_hash": "93f0b2184d08157e335abf192b0c1e8471da9284950e12d385f019b88302194a",
            "extracted_text": "Call Log History:\n+91 99887 76655 (Missed 45 calls between 01:00 AM and 03:00 AM)\nCaller ID: Unknown / Spammer\nMessage: 'Pick up or face the consequences'",
            "uploaded_at": (now - timedelta(days=5)).isoformat(),
            "processing_status": "completed",
            "analyses": [
                {
                    "id": "ana-r1-1",
                    "evidence_id": "ev-demo-r1",
                    "category": "Repeated unwanted contact",
                    "confidence": 0.99,
                    "explanation": "Extreme high-frequency communicative harassment (45 calls in 2 hours during night hours).",
                    "supporting_text": "...Missed 45 calls between 01:00 AM and 03:00 AM...",
                    "suggested_step": "Maintain a continuous chronological log of every contact attempt, avoiding reactive responses.",
                    "model_version": "TraceHer-DeBERTa-Safety-v2.3",
                    "reviewed_status": "confirmed",
                    "created_at": (now - timedelta(days=5)).isoformat()
                }
            ]
        }
    ]

    return {
        "scenarios": [
            {
                "key": "threats",
                "title": "Scenario A: Online Threats & Extortion",
                "subtitle": "Direct messaging intimidation, location surveillance, and non-consensual image distribution threats.",
                "badge": "High Urgency",
                "incident": scenario_a_incident,
                "evidence": scenario_a_evidence
            },
            {
                "key": "impersonation",
                "title": "Scenario B: Profile Impersonation",
                "subtitle": "Cloned social media profile utilizing personal photographs and false solicitations.",
                "badge": "Identity Misuse",
                "incident": scenario_b_incident,
                "evidence": scenario_b_evidence
            },
            {
                "key": "repeated",
                "title": "Scenario C: Repeated Multi-Account Harassment",
                "subtitle": "Coordinated outreach across multiple burner handles and nocturnal spam call barrages.",
                "badge": "Pattern Analysis",
                "incident": scenario_c_incident,
                "evidence": scenario_c_evidence
            }
        ]
    }
