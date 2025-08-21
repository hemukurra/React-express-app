const API = "http://localhost:4000/api";

export function getToken(){
    return localStorage.getItem("token");
}

export function setToken(token){
    localStorage.setItem("token", token);
}

export async function api(path, options = {}) {
    const headers = options.headers || {};
    const token = getToken();

    if (token) headers.Authorization = `bearer ${token}`;
    headers["Content-Type"] = "application/json";
    
    const res = await fetch(`${API}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json().catch(() => ({}));

    
}