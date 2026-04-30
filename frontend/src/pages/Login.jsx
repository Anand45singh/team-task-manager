import { useState } from "react";
import API from "../api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .auth-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0d1b3e;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .auth-bg-orb1 {
    position: fixed;
    top: -20%;
    right: -15%;
    width: 520px;
    height: 520px;
    background: radial-gradient(circle, rgba(56,120,255,0.2) 0%, transparent 65%);
    pointer-events: none;
  }

  .auth-bg-orb2 {
    position: fixed;
    bottom: -25%;
    left: -10%;
    width: 480px;
    height: 480px;
    background: radial-gradient(circle, rgba(0,160,255,0.12) 0%, transparent 65%);
    pointer-events: none;
  }

  .auth-card {
    background: rgba(255,255,255,0.05);
    border: 2px solid rgba(255,255,255,0.1);
    border-radius: 26px;
    padding: 52px 44px;
    width: 100%;
    max-width: 420px;
    backdrop-filter: blur(20px);
    position: relative;
    z-index: 1;
    animation: fadeUp 0.45s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .auth-logo {
    font-family: 'Syne', sans-serif;
    font-size: 30px;
    font-weight: 800;
    letter-spacing: -1px;
    background: linear-gradient(135deg, #ffffff 0%, #7eb8ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 6px;
  }

  .auth-welcome {
    font-size: 15px;
    color: rgba(180,200,255,0.45);
    margin-bottom: 38px;
    font-weight: 400;
  }

  .field-group {
    margin-bottom: 18px;
  }

  .field-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: rgba(180,200,255,0.45);
    margin-bottom: 9px;
    display: block;
  }

  .auth-input {
    width: 100%;
    background: rgba(255,255,255,0.06);
    border: 2px solid rgba(255,255,255,0.1);
    border-radius: 13px;
    padding: 15px 18px;
    color: #e8edf8;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    outline: none;
    transition: all 0.25s ease;
    box-sizing: border-box;
  }

  .auth-input::placeholder {
    color: rgba(180,200,255,0.22);
  }

  .auth-input:focus {
    border-color: rgba(56,140,255,0.65);
    background: rgba(56,140,255,0.08);
    box-shadow: 0 0 0 5px rgba(56,140,255,0.12);
  }

  .btn-primary {
    width: 100%;
    background: linear-gradient(135deg, #1a56e8, #3b9eff);
    border: none;
    color: white;
    padding: 17px;
    border-radius: 13px;
    font-family: 'DM Sans', sans-serif;
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s ease;
    margin-top: 10px;
    letter-spacing: 0.3px;
    box-shadow: 0 6px 20px rgba(26,86,232,0.35);
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 16px 40px rgba(26,86,232,0.55);
    background: linear-gradient(135deg, #2060ff, #50b0ff);
  }

  .btn-primary:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 4px 14px rgba(26,86,232,0.3);
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .auth-footer {
    text-align: center;
    font-size: 14px;
    color: rgba(180,200,255,0.35);
    margin-top: 24px;
  }

  .auth-link {
    color: #7eb8ff;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
    padding: 2px 6px;
    border-radius: 5px;
  }

  .auth-link:hover {
    color: #c0dfff;
    background: rgba(56,140,255,0.15);
  }

  @media (max-width: 480px) {
    .auth-card { padding: 36px 24px; margin: 16px; }
  }
`;

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!form.email || !form.password) {
      return alert("Please fill all fields");
    }
    try {
      setLoading(true);
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      alert(err?.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="auth-bg-orb1" />
        <div className="auth-bg-orb2" />

        <div className="auth-card">
          <div className="auth-logo">TaskFlow</div>
          <p className="auth-welcome">Welcome back — sign in to continue</p>

          <div className="field-group">
            <label className="field-label">Email</label>
            <input
              className="auth-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <input
              className="auth-input"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && login()}
            />
          </div>

          <button onClick={login} disabled={loading} className="btn-primary">
            {loading ? "Signing in..." : "Sign In →"}
          </button>

          <div className="auth-footer">
            No account?{" "}
            <a href="/signup" className="auth-link">Create one</a>
          </div>
        </div>
      </div>
    </>
  );
}