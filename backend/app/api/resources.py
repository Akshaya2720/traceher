from fastapi import APIRouter
from typing import Dict, Any, List

router = APIRouter(prefix="/api/resources", tags=["resources"])

@router.get("")
def get_verified_resources() -> Dict[str, Any]:
    return {
        "emergency_contacts": [
            {
                "name": "National Emergency Number",
                "number": "112",
                "availability": "24/7 All India",
                "description": "Immediate police dispatch, ambulance, or urgent physical safety intervention.",
                "badge": "Immediate Emergency"
            },
            {
                "name": "National Cybercrime Helpline",
                "number": "1930",
                "availability": "24/7 Toll-Free",
                "description": "Ministry of Home Affairs dedicated helpline for urgent cybercrime and financial cyber fraud distress.",
                "badge": "Cyber Helpline"
            },
            {
                "name": "Women Helpline (NCW)",
                "number": "7827-170-170",
                "availability": "24/7 Support",
                "description": "National Commission for Women 24/7 dedicated helpline for harassment, abuse, and legal aid guidance.",
                "badge": "Women's Safety"
            }
        ],
        "portals": [
            {
                "title": "National Cyber Crime Reporting Portal",
                "url": "https://cybercrime.gov.in",
                "description": "Official Central Government portal to submit complaints against cyber harassment, stalking, impersonation, and non-consensual image distribution.",
                "special_section": "Report Crime Against Women / Children"
            },
            {
                "title": "StopNCII.org",
                "url": "https://stopncii.org",
                "description": "Global non-profit platform allowing victims to generate cryptographic hash hashes of intimate images to prevent unauthorized circulation across tech platforms.",
                "special_section": "Non-Consensual Image Hash Protection"
            },
            {
                "title": "CERT-In (Indian Computer Emergency Response Team)",
                "url": "https://www.cert-in.org.in",
                "description": "National agency for reporting malicious URLs, phishing domains, and high-severity identity infrastructure breaches.",
                "special_section": "Incident Reporting"
            }
        ],
        "decision_tree": [
            {
                "id": "threats",
                "condition": "Direct Threats & Physical Safety Concerns",
                "actions": [
                    "Call 112 immediately if the sender mentions your current address or workplace location.",
                    "Do not delete messages or call logs; capture full screenshots including visible status bar and time.",
                    "Preserve evidence file hashes in TRACEHER before blocking the sender.",
                    "File an urgent complaint on cybercrime.gov.in under 'Crime Against Women'."
                ]
            },
            {
                "id": "impersonation",
                "condition": "Fake Profile / Stolen Photos / Impersonation",
                "actions": [
                    "Copy the exact profile URL and capture full-screen screenshots showing follower count and bio text.",
                    "Submit an in-app Impersonation Report directly to Instagram, X, or LinkedIn.",
                    "Alert mutual friends and post a verified story stating you only operate one account.",
                    "File a formal identity theft report at cybercrime.gov.in."
                ]
            },
            {
                "id": "blackmail",
                "condition": "Blackmail & Non-Consensual Image Distribution",
                "actions": [
                    "Do NOT transfer any money or comply with extortion demands — capitulation usually leads to escalated demands.",
                    "Submit intimate image hashes to StopNCII.org immediately to block cross-platform distribution.",
                    "Generate a cryptographically verified TRACEHER Evidence Dossier PDF for the police.",
                    "Contact the National Cybercrime Helpline at 1930."
                ]
            },
            {
                "id": "cyberbullying",
                "condition": "Cyberbullying & Repeated Harassment",
                "actions": [
                    "Keep a continuous chronological log of all communication attempts.",
                    "Use platform privacy tools to restrict comment permissions to followers only.",
                    "Reach out to trusted campus grievance cells, institutional internal complaint committees (ICC), or friends."
                ]
            }
        ],
        "disclaimer": "TRACEHER is an evidence organization workspace and does not provide formal legal representation or guarantee judicial action."
    }
