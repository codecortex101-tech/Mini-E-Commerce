# 🛠️ Mini E-Commerce Backend (MERN)

This is the **backend service** for the **Mini E-Commerce Platform**, built using **Node.js, Express, and MongoDB**.  
It provides secure, scalable REST APIs to support authentication, product management, cart, wishlist, orders, and user profiles.

This backend follows **software-house standards**, including clean architecture, JWT security, and environment-based configuration.

---

## 📌 Project Information

- **Project**: Mini E-Commerce Platform
- **Organization**: CodeCortexDigital
- **Repository**: Mini-E-Commerce
- **Branch**: backend-dev
- **Status**: ✅ Complete & Ready for Deployment

---

## 🧱 Tech Stack

- Node.js (18+)
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- Bcrypt
- Helmet
- CORS
- Express Validator

---

## 📂 Folder Structure

backend/
├── src/
│ ├── controllers/ # Business logic
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── middlewares/ # Auth & role protection
│ ├── config/ # DB configuration
│ ├── app.js # Express app
│ └── server.js # Server entry point
├── package.json
├── package-lock.json
└── README.md

yaml
Copy code

---

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
📌 Do not commit .env to GitHub

🚀 How to Run Backend Locally
1️⃣ Install dependencies
bash
Copy code
npm install
2️⃣ Start server
bash
Copy code
npm start
Server will run at:

arduino
Copy code
http://localhost:5000
🔗 API Overview
🔐 Authentication
POST /api/auth/register

POST /api/auth/login

👤 User Profile
GET /api/users/profile

PUT /api/users/profile

🛍️ Products
GET /api/products

GET /api/products/:id

POST /api/products (Admin)

PUT /api/products/:id (Admin)

DELETE /api/products/:id (Admin)

⭐ Reviews
POST /api/products/:id/reviews

GET /api/products/:id/reviews

❤️ Wishlist
GET /api/wishlist

POST /api/wishlist/add

DELETE /api/wishlist/remove/:productId

🛒 Cart
GET /api/cart

POST /api/cart/add

PUT /api/cart/update

DELETE /api/cart/remove/:productId

📦 Orders
POST /api/orders

GET /api/orders (User)

GET /api/orders/admin (Admin)

PUT /api/orders/:id (Update status – Admin)

🛡️ Security Features
JWT-based authentication

Password hashing with bcrypt

Role-based access control

Protected routes

Helmet security headers

CORS enabled

✅ Backend Features Completed
Authentication & Authorization

User Profile & Address Management

Product CRUD (Admin)

Product Search, Filter & Sort

Wishlist APIs

Cart APIs

Product Reviews & Ratings

Order Management & Status Tracking

🚀 Deployment Ready
This backend is production-ready and can be deployed on:

Render

Railway

VPS

Deployment should be done from the main branch after PR approval.

📄 License
MIT License
© CodeCortexDigital

yaml
Copy code

---

## 🟢 PART 3 — Push README to your existing branch

Now just push like normal (same branch).

### ✅ Commands

```bash
git status
git add backend/README.md
git commit -m "Add backend README documentation"
git push origin backend-dev