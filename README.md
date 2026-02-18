# MarketNest - MERN Stack Marketplace

A full-stack e-commerce marketplace built with the MERN stack (MongoDB, Express, React, Node.js). Connections between brands and shoppers are made simple.

## Project Structure

- **frontend/**: React application with TypeScript, Vite, and Tailwind CSS.
- **backend/**: Node.js/Express API with MongoDB and Passport.js authentication.

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- Google Cloud Console Project (for Google Auth)

### setup

1.  **Clone the repository**
2.  **Install Dependencies**

    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install
    ```

3.  **Environment Variables**

    Create a `.env` file in the `backend/` directory:

    ```env
    NODE_ENV=development
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

### Running the App

**Development Mode:**

Open two terminals:

1.  **Backend:**
    ```bash
    cd backend
    npm run dev
    ```

2.  **Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```

**With Docker:**

```bash
docker-compose up --build
```

Access the application at `http://localhost:5173`.

## Features

- **Authentication:** JWT-based auth with Google OAuth support.
- **Roles:** Separate dashboards for Shoppers and Brands.
- **Marketplace:** Browse products, view details.
- **Brand Dashboard:** Manage products (Create, Edit).
