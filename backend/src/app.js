const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

/* ---------- Routes ---------- */
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");

/* ---------- Middlewares ---------- */
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

/* =========================================================
   Body Parsers
========================================================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================================================
   Security
========================================================= */
app.use(helmet());

/* =========================================================
   CORS (LOCAL + VERCEL + NODE 22 SAFE)
========================================================= */
app.use(
  cors({
    origin: [
      // Local
      "http://localhost:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",

      // ✅ CURRENT VERCEL FRONTEND
      "https://mini-e-commerce-olo8d40a8-azhars-projects-61cd967e.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

/* =========================================================
   Routes
========================================================= */
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);

/* =========================================================
   Root Route
========================================================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Mini E-Commerce Backend is running 🚀",
  });
});

/* =========================================================
   Health Check
========================================================= */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    timestamp: new Date().toISOString(),
  });
});

/* =========================================================
   Error Handler (LAST)
========================================================= */
app.use(errorHandler);

module.exports = app;
