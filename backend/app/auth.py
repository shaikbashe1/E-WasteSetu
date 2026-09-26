from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import firebase_admin
from firebase_admin import auth as firebase_auth
from firebase_admin import credentials
import os
from typing import Dict, Any

security = HTTPBearer()

# Initialize Firebase Admin SDK
# In production, set GOOGLE_APPLICATION_CREDENTIALS env var pointing to service account JSON
# Or pass credentials dict directly. For demo purposes, we will try to initialize without credentials
# which works if deployed in Google Cloud or if GOOGLE_APPLICATION_CREDENTIALS is set in Vercel.
try:
    firebase_admin.get_app()
except ValueError:
    # App not initialized yet
    cred = credentials.ApplicationDefault()
    try:
        firebase_admin.initialize_app(cred)
    except Exception as e:
        # If ApplicationDefault fails (e.g. on Vercel without env var), we initialize a mock/empty app
        # This will fail on actual token verification unless credentials are provided properly.
        print("Warning: Firebase Admin credentials not found. Authentication will fail.")
        firebase_admin.initialize_app()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict[str, Any]:
    """
    Validate the JWT from Firebase.
    """
    token = credentials.credentials
    try:
        decoded_token = firebase_auth.verify_id_token(token)
        return decoded_token
    except firebase_auth.ExpiredIdTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication credentials: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_current_user(token_data: Dict[str, Any] = Depends(verify_token)) -> str:
    """Returns the Firebase UID"""
    user_id = token_data.get("uid")
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID not found in token")
    return user_id
