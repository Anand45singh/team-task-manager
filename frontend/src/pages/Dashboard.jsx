import { useEffect, useState } from "react";
import API from "../api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .dash-root {
    min-height: 100vh;
    background: #0d1b3e;
    font-family: 'DM Sans', sans-serif;
    color: #e8edf8;
    padding: 0;
    position: relative;
    overflow-x: hidden;
  }

  .dash-root::before {
    content: '';
    position: fixed;
    top: -20%;
    right: -15%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(56,120,255,0.18) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .dash-root::after {
    content: '';
    position: fixed;
    bottom: -20%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(0,180,255,0.1) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .dash-navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 22px 48px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    background: rgba(8,16,40,0.88);
    backdrop-filter: blur(20px);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .dash-brand {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, #ffffff 0%, #7eb8ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .btn-logout {
    background: rgba(255,80,80,0.08);
    border: 2px solid rgba(255,100,100,0.45);
    color: #ff8080;
    padding: 11px 26px;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.22s ease;
  }

  .btn-logout:hover {
    background: rgba(255,80,80,0.22);
    border-color: #ff5555;
    color: #fff;
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(255,80,80,0.3);
  }

  .btn-logout:active {
    transform: translateY(0) scale(0.97);
    box-shadow: none;
  }

  .dash-body {
    max-width: 740px;
    margin: 0 auto;
    padding: 52px 28px;
    position: relative;
    z-index: 1;
  }

  .dash-heading {
    font-family: 'Syne', sans-serif;
    font-size: 50px;
    font-weight: 800;
    margin-bottom: 10px;
    letter-spacing: -1.5px;
    line-height: 1.1;
  }

  .dash-sub {
    color: rgba(180,200,255,0.5);
    font-size: 18px;
    margin-bottom: 40px;
    font-weight: 400;
  }

  .create-box {
    background: rgba(255,255,255,0.05);
    border: 2px solid rgba(255,255,255,0.1);
    border-radius: 18px;
    padding: 18px 20px;
    display: flex;
    gap: 14px;
    margin-bottom: 40px;
    backdrop-filter: blur(12px);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .create-box:focus-within {
    border-color: rgba(56,140,255,0.65);
    box-shadow: 0 0 0 5px rgba(56,140,255,0.1);
  }

  .task-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #e8edf8;
    font-family: 'DM Sans', sans-serif;
    font-size: 17px;
    font-weight: 400;
    padding: 4px 0;
  }

  .task-input::placeholder {
    color: rgba(180,200,255,0.28);
  }

  .btn-add {
    background: linear-gradient(135deg, #1a56e8, #3b9eff);
    border: none;
    color: white;
    padding: 13px 30px;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.22s ease;
    white-space: nowrap;
    box-shadow: 0 4px 18px rgba(26,86,232,0.35);
  }

  .btn-add:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 14px 36px rgba(26,86,232,0.55);
    background: linear-gradient(135deg, #2060ff, #50b0ff);
  }

  .btn-add:active {
    transform: translateY(0) scale(0.97);
    box-shadow: 0 4px 12px rgba(26,86,232,0.3);
  }

  .section-label {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(180,200,255,0.38);
    margin-bottom: 18px;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .task-card {
    background: rgba(255,255,255,0.04);
    border: 2px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 20px 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.22s ease;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .task-card:hover {
    background: rgba(56,120,255,0.14);
    border-color: rgba(56,140,255,0.55);
    transform: translateX(8px) translateY(-2px);
    box-shadow: 0 10px 32px rgba(26,86,232,0.25);
  }

  .task-card:active {
    transform: translateX(4px) scale(0.99);
  }

  .task-title {
    font-size: 18px;
    font-weight: 500;
    color: rgba(230,238,255,0.9);
  }

  .task-status {
    font-size: 13px;
    font-weight: 600;
    padding: 6px 16px;
    border-radius: 20px;
    letter-spacing: 0.4px;
    background: rgba(56,120,255,0.18);
    color: #7eb8ff;
    border: 1.5px solid rgba(56,140,255,0.3);
    transition: all 0.22s ease;
  }

  .task-card:hover .task-status {
    background: rgba(56,120,255,0.35);
    border-color: rgba(56,180,255,0.7);
    color: #c0e0ff;
  }

  .task-status.done {
    background: rgba(0,200,120,0.14);
    color: #34d399;
    border-color: rgba(0,200,120,0.3);
  }

  .task-card:hover .task-status.done {
    background: rgba(0,200,120,0.3);
    border-color: rgba(0,200,120,0.65);
  }

  .empty-state {
    text-align: center;
    padding: 70px 20px;
    color: rgba(180,200,255,0.2);
    font-size: 17px;
  }

  .empty-icon {
    font-size: 44px;
    margin-bottom: 14px;
    opacity: 0.35;
  }

  @media (max-width: 600px) {
    .dash-navbar  { padding: 16px 20px; }
    .dash-body    { padding: 32px 16px; }
    .dash-heading { font-size: 34px; }
    .btn-add      { padding: 10px 18px; font-size: 14px; }
  }
`;

const isOverdue = (date) => {
  return date && new Date(date) < new Date();
};

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const createTask = async () => {
    if (!title) return;
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="dash-root">
        <nav className="dash-navbar">
          <div className="dash-brand">TaskFlow</div>
          <button onClick={logout} className="btn-logout">⎋ Logout</button>
        </nav>

        <div className="dash-body">
          <h1 className="dash-heading">My Tasks</h1>
          <p className="dash-sub">Stay on top of everything that matters.</p>

          <div className="create-box">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="task-input"
              onKeyDown={(e) => e.key === "Enter" && createTask()}
            />
            <button onClick={createTask} className="btn-add">+ Add Task</button>
          </div>

          <div className="section-label">
            {tasks.length} Task{tasks.length !== 1 ? "s" : ""}
          </div>

          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✦</div>
              <div>No tasks yet. Add one above.</div>
            </div>
          ) : (
            <div className="task-list">
              {tasks.map((t) => (
                <div key={t._id} className="task-card">
                  <span className="task-title">{t.title}</span>
                  <span className={`task-status ${t.status === "done" ? "done" : ""}`}>
                    {t.status || "pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}