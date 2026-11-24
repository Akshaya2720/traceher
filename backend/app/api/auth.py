from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
import uuid
from app.schemas import UserCreate, UserLogin, UserResponse
from app.database import db

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register", response_model=UserResponse)
def register(user_in: UserCreate):
    for u in db.data["users"]:
        if u["email"].lower() == user_in.email.lower():
            raise HTTPException(status_code=400, detail="An account with this email already exists.")
    
    new_user = {
        "id": f"usr-{uuid.uuid4().hex[:8]}",
        "full_name": user_in.full_name,
        "email": user_in.email,
        "password_hash": f"hash_{user_in.password}",
        "preferred_language": user_in.preferred_language,
        "created_at": datetime.now().isoformat()
    }
    db.data["users"].append(new_user)
    db.save()
    return UserResponse(
        id=new_user["id"],
        full_name=new_user["full_name"],
        email=new_user["email"],
        preferred_language=new_user["preferred_language"],
        created_at=new_user["created_at"]
    )

@router.post("/login", response_model=UserResponse)
def login(creds: UserLogin):
    for u in db.data["users"]:
        if u["email"].lower() == creds.email.lower():
            return UserResponse(
                id=u["id"],
                full_name=u["full_name"],
                email=u["email"],
                preferred_language=u.get("preferred_language", "en"),
                created_at=u["created_at"]
            )
    # For demo convenience, allow seamless login if email not found
    fallback_user = {
        "id": f"usr-{uuid.uuid4().hex[:8]}",
        "full_name": creds.email.split("@")[0].capitalize(),
        "email": creds.email,
        "password_hash": f"hash_{creds.password}",
        "preferred_language": "en",
        "created_at": datetime.now().isoformat()
    }
    db.data["users"].append(fallback_user)
    db.save()
    return UserResponse(
        id=fallback_user["id"],
        full_name=fallback_user["full_name"],
        email=fallback_user["email"],
        preferred_language="en",
        created_at=fallback_user["created_at"]
    )

@router.get("/me", response_model=UserResponse)
def get_current_user():
    if db.data["users"]:
        u = db.data["users"][0]
        return UserResponse(
            id=u["id"],
            full_name=u["full_name"],
            email=u["email"],
            preferred_language=u.get("preferred_language", "en"),
            created_at=u["created_at"]
        )
    return UserResponse(
        id="usr-default",
        full_name="Ananya Sharma",
        email="ananya.sharma@example.com",
        preferred_language="en",
        created_at=datetime.now().isoformat()
    )

@router.post("/logout")
def logout():
    return {"message": "Successfully logged out."}
