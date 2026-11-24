import os
import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/api/anam", tags=["anam"])

ANAM_API_KEY = os.getenv(
    "ANAM_API_KEY", 
    "NGVmZDVjMzctMGU1Ny00MmQxLWI4MjEtYjQ0YTQxYzc2M2EyOkc2Y2ZnbGxSd0dGbDNyb0hDelJHSGo3bmlERXNxcDBzejdLRHM1SDdhMFk9"
)
DEFAULT_PERSONA_ID = "e0a16e95-2826-4e4c-9a9d-8a04ca1be74d"
DEFAULT_AVATAR_ID = "195d733e-58a9-40bb-a049-ac344fa70b7f"

class SessionTokenRequest(BaseModel):
    persona_id: Optional[str] = None
    avatar_id: Optional[str] = None
    client_label: Optional[str] = "traceher-web"

@router.post("/session-token")
async def get_session_token(req: SessionTokenRequest = None):
    """
    Generate an official Anam AI WebRTC session token using the configured ANAM_API_KEY.
    """
    persona_id = (req.persona_id if req and req.persona_id else DEFAULT_PERSONA_ID)
    client_label = (req.client_label if req and req.client_label else "traceher-web")
    
    url = "https://api.anam.ai/v1/auth/session-token"
    headers = {
        "Authorization": f"Bearer {ANAM_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "clientLabel": client_label,
        "personaConfig": {
            "personaId": persona_id
        }
    }
    
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            res = await client.post(url, headers=headers, json=payload)
            if res.status_code == 200:
                data = res.json()
                return {
                    "success": True,
                    "sessionToken": data.get("sessionToken"),
                    "personaId": persona_id,
                    "avatarId": DEFAULT_AVATAR_ID
                }
            else:
                return {
                    "success": False,
                    "error": f"Anam API returned status {res.status_code}: {res.text}",
                    "personaId": persona_id
                }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "personaId": persona_id
        }

@router.get("/config")
def get_anam_config():
    return {
        "personaId": DEFAULT_PERSONA_ID,
        "avatarId": DEFAULT_AVATAR_ID,
        "isKeyConfigured": bool(ANAM_API_KEY),
        "keyPreview": ANAM_API_KEY[:8] + "..." if ANAM_API_KEY else None
    }
