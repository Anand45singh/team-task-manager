
# 📌 Team Task Manager (Full Stack)

A full-stack **role-based task management system** where users can create projects, manage teams, assign tasks, and track progress with real-time status updates.

---

# 🚀 Features

### 🔐 Authentication

* Signup / Login using JWT
* Secure password hashing (bcrypt)
* Protected routes (middleware)

### 👥 Project & Team Management

* Create projects
* Auto-add creator as member
* Add/remove team members

### 📋 Task Management

* Create tasks
* Assign tasks to users
* Set due dates
* Update task status (todo / in-progress / done)

### 📊 Dashboard

* View all tasks
* Status tracking
* Overdue task highlighting
* Basic analytics (task counts)

---

# 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcryptjs

### Frontend

* React.js (Vite)
* Axios
* React Router DOM
* Tailwind CSS

---

# 📁 Project Structure

```
team-task-manager/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── api.js
│   │   └── App.jsx
│   ├── index.html
│   └── .env
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/team-task-manager.git
cd team-task-manager
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

### Create `.env` file

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### Run backend

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

### Create `.env` file

```env
VITE_API_URL=http://localhost:5000/api
```

### Run frontend

```bash
npm run dev
```

App runs on:

```
http://localhost:5173
```

---

# 🔗 API Endpoints

## 🔐 Auth

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | /api/auth/signup | Register user |
| POST   | /api/auth/login  | Login user    |

---

## 📁 Projects

| Method | Endpoint                 | Description      |
| ------ | ------------------------ | ---------------- |
| POST   | /api/projects            | Create project   |
| GET    | /api/projects            | Get all projects |
| PUT    | /api/projects/add-member | Add team member  |

---

## 📋 Tasks

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| POST   | /api/tasks            | Create task        |
| GET    | /api/tasks            | Get tasks          |
| PUT    | /api/tasks/:id        | Update task        |
| PUT    | /api/tasks/:id/status | Update task status |

---

# 🔐 Authentication Flow

1. User signs up / logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. All API requests use token in headers

```js
Authorization: token
```

---

# 📊 Dashboard Features

* View all tasks
* Create tasks
* Update status
* Overdue detection:

```js
new Date(dueDate) < new Date()
```

---

# 🧪 Testing (Postman)

### Signup

```
POST /api/auth/signup
{
  "name": "John",
  "email": "john@gmail.com",
  "password": "123456"
}
```

### Login

```
POST /api/auth/login
```

---

# 🚀 Deployment

### Backend (Railway / Render)

* Add environment variables
* Deploy Node server

### Frontend (Vercel / Netlify)

```bash
npm run build
```

---

# 📌 Environment Variables

## Backend

```
MONGO_URI=
JWT_SECRET=
PORT=
```

## Frontend

```
VITE_API_URL=
```

---

# 🎯 Future Improvements

* Drag & drop task board (Trello style)
* Admin vs Member roles UI
* Notifications system
* File attachments
* Real-time updates (Socket.io)
* Analytics dashboard (charts)

---

# 👨‍💻 Author

* Your Name : Anand Singh
* GitHub: https://github.com/Anand45singh/team-task-manager
* Email: singh25302@gmail.com

