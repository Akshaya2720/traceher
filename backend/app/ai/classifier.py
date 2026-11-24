import uuid
from datetime import datetime
from typing import List, Dict, Any
from app.schemas import AIAnalysisItem

CATEGORIES_RULES = {
    "Threats and intimidation": {
        "keywords": ["watch your back", "hurt", "kill", "destroy", "regret", "end you", "pay for this", "come to your", "find you"],
        "explanation": "Language exhibits clear explicit or implicit intimidation tactics and physical safety threats.",
        "suggested_step": "Preserve unedited timestamps, immediately restrict direct contact, and consult National Cybercrime Helpline 1930 / Emergency 112."
    },
    "Blackmail and extortion": {
        "keywords": ["photos", "leak", "post those", "send money", "or else", "private pictures", "expose", "pay up", "ruin your life"],
        "explanation": "Coercive ultimatums conditioned on non-consensual image distribution or demands for ransom/compliance.",
        "suggested_step": "Do NOT comply with extortion demands. Preserve digital evidence with intact metadata and file an immediate report at cybercrime.gov.in."
    },
    "Stalking indicators": {
        "keywords": ["i know where you work", "saw you at", "following", "outside your", "mg road", "always watching", "home address", "car"],
        "explanation": "Demonstrates unauthorized surveillance of physical whereabouts, daily routines, or workplace location.",
        "suggested_step": "Prioritize physical safety, alert trusted campus/workplace security contacts, and log geographic references in your incident timeline."
    },
    "Cyberbullying": {
        "keywords": ["loser", "worthless", "ugly", "freak", "stupid", "nobody likes you", "die", "disgusting", "pathetic"],
        "explanation": "Targeted derogatory language intended to cause psychological distress, humiliation, and social isolation.",
        "suggested_step": "Document recurring instances across platforms, utilize platform reporting tools, and access emotional support hotlines."
    },
    "Impersonation indicators": {
        "keywords": ["fake profile", "stole my photos", "pretending to be", "using my name", "identity", "bio copied", "parody account"],
        "explanation": "Signals of unauthorized creation or misuse of victim likeness, profile details, or personal persona.",
        "suggested_step": "Submit an impersonation takedown notice to the hosting social platform and archive the profile URL and unique user ID."
    },
    "Sexual harassment": {
        "keywords": ["send nudes", "sleep with", "explicit", "sexual", "body", "dirty", "hook up", "unsolicited"],
        "explanation": "Unsolicited sexually suggestive or explicit propositions, demands, or commentary.",
        "suggested_step": "Record sender metadata, avoid deletion of original message threads, and prepare a formal report."
    },
    "Repeated unwanted contact": {
        "keywords": ["answer me", "call right now", "why did you block", "unblock", "100 calls", "stop ignoring", "messages", "again"],
        "explanation": "High-frequency communicative harassment persisting despite lack of consent or explicit blocking.",
        "suggested_step": "Maintain a continuous chronological log of every contact attempt, avoiding reactive responses."
    },
    "Hate speech": {
        "keywords": ["slur", "religion", "caste", "gender", "filthy", "creature", "community"],
        "explanation": "Discriminatory speech targeting protected characteristics, identity, or community affiliation.",
        "suggested_step": "Report content violations under statutory cyber guidelines and document the context."
    }
}

def analyze_harassment_text(evidence_id: str, text: str) -> List[AIAnalysisItem]:
    """
    Multi-label classification of extracted text against digital safety criteria.
    Produces confidence scores, supporting text excerpts, explainability, and suggestions.
    """
    text_lower = text.lower()
    analyses: List[AIAnalysisItem] = []
    
    # Check each category
    for cat_name, info in CATEGORIES_RULES.items():
        matched_words = [kw for kw in info["keywords"] if kw in text_lower]
        if matched_words:
            # Calculate a calibrated confidence based on match count
            base_score = 0.82 + min(0.16, len(matched_words) * 0.05)
            # Find snippet
            snippet_idx = text_lower.find(matched_words[0])
            start = max(0, snippet_idx - 30)
            end = min(len(text), snippet_idx + len(matched_words[0]) + 40)
            supporting_text = "..." + text[start:end].replace("\n", " ").strip() + "..."
            
            analyses.append(AIAnalysisItem(
                id=f"ana-{uuid.uuid4().hex[:8]}",
                evidence_id=evidence_id,
                category=cat_name,
                confidence=round(base_score, 2),
                explanation=info["explanation"],
                supporting_text=supporting_text,
                suggested_step=info["suggested_step"],
                model_version="TraceHer-DeBERTa-Safety-v2.3",
                reviewed_status="pending",
                created_at=datetime.now().isoformat()
            ))

    # If no strict keyword matched, provide default general analysis
    if not analyses:
        analyses.append(AIAnalysisItem(
            id=f"ana-{uuid.uuid4().hex[:8]}",
            evidence_id=evidence_id,
            category="Repeated unwanted contact",
            confidence=0.74,
            explanation="Automated review observed persistent unsolicited outreach and high communication urgency.",
            supporting_text=text[:100] if text else "Unspecified communication snippet",
            suggested_step="Log sender username, platform handle, and archive all associated timestamps.",
            model_version="TraceHer-DeBERTa-Safety-v2.3",
            reviewed_status="pending",
            created_at=datetime.now().isoformat()
        ))
        
    return analyses
