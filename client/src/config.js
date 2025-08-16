// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  CHAT: `${API_BASE_URL}/api/chat`,
  UPDATE_PROFILE: `${API_BASE_URL}/api/auth/update-profile`,
  CHANGE_PASSWORD: `${API_BASE_URL}/api/auth/change-password`,
  UPLOAD_IMAGE: `${API_BASE_URL}/api/auth/upload-profile-image`,
  GET_PROFILE: `${API_BASE_URL}/api/auth/profile`,
  SESSIONS: `${API_BASE_URL}/api/sessions`,
};
