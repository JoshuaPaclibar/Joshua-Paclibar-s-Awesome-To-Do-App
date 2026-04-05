## 🚀 Deployment

The recommended way to deploy this MERN stack app is using **Render**.

### Step 1: Push to GitHub
Initialize a git repository, commit your changes, and push to GitHub.

```bash
git init
git add .
git commit -m "Initial commit"
# Link your repo
git remote add origin https://github.com/YOUR_USERNAME/awesome-todos.git
git push -u origin master
```

### Step 2: Deploy on Render
Since the client and server are separate, we deploy the **Server** and have it serve the built React files.

1.  **Sign up on [Render](https://render.com/)**.
2.  Create a new **Web Service**.
3.  Connect your GitHub repository.
4.  **Settings:**
    -   **Environment:** Node
    -   **Build Command:**
        ```bash
        cd client && npm install && npm run build && mv build ../server/ && cd ../server && npm install
        ```
    -   **Start Command:**
        ```bash
        cd server && node index.js
        ```
5.  **Environment Variables:**
    -   Add `MONGODB_URI` with your connection string.
    -   Add `PORT` with value `5000`.

Render will build both the frontend and backend, then serve the app via the Express server.

---

## 🔧 Recent Improvements & Fixes

### 1. Robust API Error Handling
We have updated `server/routes.js` and `server/index.js` to ensure the server doesn't crash on database errors.
- **Fail-Safe Startup:** The server now checks for a MongoDB connection immediately upon startup (`index.js`). If it cannot connect, it exits with a clear error message instead of hanging.
- **Route Protection:** All API routes (`GET`, `POST`, `PUT`, `DELETE`) are now wrapped in `try-catch` blocks. If an operation fails, the API returns a proper `500` error response to the client instead of crashing the server process.

### 2. Client-Side Resilience
- The React frontend (`App.jsx`) now includes `try-catch` blocks when fetching data.
- If the server is offline or returns an error, the app will still load the UI (without crashing with a white screen) and log the specific error to the console for easier debugging.

### 3. Database Configuration (`.env`)
The `.env` file in the `server` directory contains sensitive configuration like the `MONGODB_URI`.
- **Note:** This file is generally **ignored** by Git for security.
- **However:** If you explicitly want to include it, ensure you do not share your repository publicly if it contains production passwords.
- **Update:** We have explicitly included `.env` in the repository as per request.
- We have added custom DNS settings (`8.8.8.8`) in `database.js` to prevent connection timeouts on certain ISPs.

---
