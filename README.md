# 📁 Droply – File Organizer & Dashboard
# Live: https://droply-by-arnab.vercel.app
A full-stack file management dashboard powered by **Next.js**, **Appwrite**, and **Tailwind CSS**. Features a smart UI, animated stats, and secure storage. Think of it as your stylish personal cloud.

---

## 🚀 Features

| Feature                        | Description                                                      |
|-------------------------------|------------------------------------------------------------------|
| 📂 File Upload & Preview      | Upload and preview images, videos, audio, docs                   |
| 🔍 Smart Search               | Instant search with file thumbnails                              |
| 📊 Storage Tracker            | Radial SVG chart showing space usage                             |
| ⚡ Animated Stats             | Live count-up of total size used                                 |
| 🔐 Auth with Appwrite         | Email/password & Google login supported                          |
| 🧠 Type-based View            | View and sort files by category                                  |
| 🎨 Responsive UI              | Mobile-friendly and theme-consistent design                      |

---

## 🛠 Tech Stack

| Tech            | Role/Usage                                 |
|-----------------|--------------------------------------------|
| Next.js         | Frontend framework                         |
| TypeScript      | Type safety                                |
| Tailwind CSS    | Utility-first styling                      |
| Appwrite        | Auth, database, storage                    |
| ShadCN UI       | UI components like Select, Separator       |
| CountUp.js      | Animated number count                      |
| SVG Chart       | Custom radial usage chart                  |

---

## 🖼 Preview Screens

| Dashboard                              | Search                                 |
|----------------------------------------|----------------------------------------|
| ![dashboard](./public/assets/icons/dashboard.svg) | ![search](./public/assets/icon/search.svg) |

---

## ⚙️ Setup Instructions

| Step              | Command / Action                                          |
|-------------------|-----------------------------------------------------------|
| 1️⃣ Clone Repo     | `git clone [https://github.com/your-username/droply](https://droply-by-arnab.vercel.app/sign-in)`   |
| 2️⃣ Install Deps   | `npm install` or `yarn`                                   |
| 3️⃣ Setup Appwrite | Create project, DB, collection, bucket, and get env vars |
| 4️⃣ Add .env File  | See `.env` section below                                  |
| 5️⃣ Run Dev Server | `npm run dev`                                             |

---

## 🌍 `.env` File Example

```env
NEXT_PUBLIC_APPWRITE_URL=http://localhost/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_BUCKET_ID=your_bucket_id
NEXT_PUBLIC_DATABASE_ID=your_db_id
NEXT_PUBLIC_FILES_COLLECTION_ID=your_collection_id
