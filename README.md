# 🧾 Team Finance — Full-Stack Workspace & Finance Management App

**Repository:** `workspaceapp`  
**Application Name:** **Team Finance**    
**Live Demo:** https://work-space-app.vercel.app/login  

---

## 🚀 Overview

**Team Finance** is a full-stack workspace and finance management application that helps teams collaborate, manage tasks, track expenses, and organize their workflow efficiently.

This is my **first full-scale full-stack project**, and it is still **actively under development**.  
I am **open to suggestions, improvements, and collaborations** — feel free to raise issues or reach out!

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- Secure authentication via **NextAuth**
- **Google OAuth** + **Credentials Login**
- Protected routes using server sessions
- Role system: **Workspace Owner** vs **Members**
- Owner-only mutation actions (WIP refinement)

### 👥 Workspace & Team Management
- Create and manage multiple workspaces  
- Add/Remove members  
- **Email Invitation System** (Nodemailer)  
- Secure, expiring invite links  
- Automatic role assignment on join

### 🌥 Cloudinary Integration
- Image uploads for:
  - User profile pictures
  - Workspace icons
- Supports both **signed** & **unsigned** presets

### 📊 Analytics with Recharts
- Dashboard visualizations using **Recharts**  
- Expense tracking & category breakdown

### 📝 Task Management
- Create, edit, delete tasks  
- Priority, status, tags  
- Smooth UI interactions with optimistic updates  
- Workspace-wise task separation

### 🔔 Notification System (WIP)
- Basic notification model implemented  
- Pages & UI for reading notifications are in progress

### 💅 Clean Modern UI
- Built using:
  - **Next.js 14 (App Router)**
  - **React**
  - **TailwindCSS**
  - **ShadCN UI**
- Highly responsive layout  
- Sidebar navigation, navbar initials, badges, cards

### ⚙️ Additional Features
- MongoDB models for Users, Workspaces, Tasks, Invites, Notifications  
- Fully modular API routes  
- Secure password hashing with **bcrypt**  
- Error handling & loading states  

---

## 🧰 Tech Stack

### **Frontend**
- Next.js 14 (App Router)
- React
- TailwindCSS
- ShadCN UI
- Recharts

### **Backend**
- Next.js API Routes
- Node.js
- MongoDB with Mongoose

### **Authentication**
- NextAuth
- Google OAuth
- Credentials Provider
- JWT Sessions

### **Cloud & Services**
- Cloudinary
- Nodemailer
- bcrypt

---

## 📦 Project Status

🔧 **Under Active Development**  
- Some flows are still being refined  
- Owner permission logic is improving  
- Multiple workspace creation logic is updated  
- Notifications UI is under reconstruction  
- More polishing & optimization coming soon

I am continuously learning and improving this project — your feedback is valuable!

---

## 🤝 Contributing & Suggestions

Since this is my **first big full-stack application**, I am **very open to suggestions, improvements, bug reports, or collaborations**.

- Open an issue  
- Start a discussion  
- Ping me on LinkedIn  
- Or create a pull request!

---

## 👩‍💻 About Me

Hi! I'm **Prachi Kedia**, a 2nd-year Mechanical Engineering undergrad exploring full-stack development and DSA.

This project is a huge learning milestone for me, and I’m excited to keep building more!

- **LinkedIn:** https://www.linkedin.com/in/prachi-kedia-077243288/  
- **Live Demo:** https://work-space-app.vercel.app/login  

---



