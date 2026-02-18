# MarketNest - Premium MERN Stack Marketplace

A modern, full-stack e-commerce marketplace connecting **Shoppers** and **Brands**. Built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS for a premium, dark-themed aesthetic.

---

## 🚀 Features

### 🔐 Authentication & Security
- **JWT Authentication:** Secure cookie-based sessions.
- **Google OAuth:** One-click login/signup with Google.
- **Role-Based Access Control (RBAC):** Separate dashboards for **Shoppers** and **Brands**.
- **Password Hashing:** secure storage using bcrypt.

### 🛍️ Marketplace (Shoppers)
- **Browse Products:** View all listed products with infinite scroll (planned).
- **Product Details:** High-quality image previews and descriptions.
- **Search & Filter:** Find products by category or price (planned).

### 🏢 Brand Dashboard (Sellers)
- **Manage Products:** Create, Edit, and Delete products.
- **Image Uploads:** Drag-and-drop image uploads powered by **Cloudinary**.
- **Analytics:** View total products, categories, and average pricing.

### 🎨 UI/UX
- **Premium Dark Mode:** Glassmorphism effects and smooth animations (Framer Motion).
- **Responsive Design:** Fully mobile-optimized interface.
- **Interactive Elements:** 3D buttons, hover effects, and toast notifications.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite):** Fast, modern UI library.
- **TypeScript:** Type-safe code for better maintainability.
- **Tailwind CSS:** Utility-first styling with custom animations.
- **Framer Motion:** Complex UI animations.
- **Axios:** API requests with interceptors.
- **React Router:** Client-side routing.

### Backend
- **Node.js & Express:** Scalable REST API.
- **MongoDB (Mongoose):** NoSQL database for flexible data models.
- **Passport.js:** Authentication strategies (Local & Google).
- **Cloudinary:** Cloud storage for product images.
- **Multer:** Handling file uploads.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Cloudinary Account (for images)
- Google Cloud Console Project (for OAuth)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/marketnest.git
    cd marketnest
    ```

2.  **Install Frontend Dependencies**
    ```bash
    cd frontend
    npm install
    ```

3.  **Install Backend Dependencies**
    ```bash
    cd ../backend
    npm install
    ```

### Environment Setup

Create `.env` files in both directories.

**Backend (`backend/.env`):**
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/marketnest
JWT_SECRET=your_jwt_secret_key
# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
# Google Auth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

### Running Locally

1.  **Start Backend:**
    ```bash
    cd backend
    npm run dev
    ```
2.  **Start Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
3.  Open `http://localhost:5173` in your browser.

---

## 🌍 Deployment (Render)

### Backend (Web Service)
- **Build Command:** `npm install`
- **Start Command:** `node server.js`
- **Env Vars:** Add all backend `.env` variables + `NODE_ENV=production`.
- **Note:** Update `FRONTEND_URL` to your deployed frontend URL.

### Frontend (Static Site)
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
- **Env Var:** `VITE_API_URL` = `https://your-backend.onrender.com/api`
- **Rewrite Rule:** Source `/*` -> Dest `/index.html` (Rewrite).

---

## 📂 Project Structure

```
marketnest/
├── frontend/             # React Client
│   ├── src/
│   │   ├── components/   # Reusable UI (Buttons, Cards, Navbar)
│   │   ├── pages/        # Route Pages (Home, Login, Dashboard)
│   │   ├── context/      # Global State (Auth, Toast)
│   │   └── utils/        # API configuration
│   └── ...
├── backend/              # Express API
│   ├── config/           # DB & Passport Config
│   ├── controllers/      # Route Logic
│   ├── models/           # Mongoose Schemas (User, Product)
│   ├── routes/           # API Endpoints
│   └── server.js         # Entry Point
└── README.md             # Project Documentation
```

## 📄 License
MIT License. Free to use and modify.
