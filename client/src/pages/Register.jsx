import { useState } from "react";
import { api } from "../api.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr(""); setMsg("");
    try {
      await api("/auth/register", { method: "POST", body: JSON.stringify(form) });
      setMsg("✅ Registered! Please log in.");
      setTimeout(() => nav("/login"), 800);
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
      <h2>Register</h2>
      {msg && <div style={{ color: "green" }}>{msg}</div>}
      {err && <div style={{ color: "crimson" }}>{err}</div>}
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button>Create Account</button>
    </form>
  );
}
