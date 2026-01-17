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

/* ---------- Error Middleware ---------- */
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

/* ---------- Body Parsers ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- CORS (PRODUCTION + LOCAL FIXED) ---------- */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",

  // ✅ Vercel Frontend (ADD / CHANGE IF DOMAIN CHANGES)
  "https://mini-e-commerce-aitx873d0-azhars-projects-61cd967e.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ---------- Handle Preflight ---------- */
app.options("*", cors());

/* ---------- Security ---------- */
app.use(helmet());

/* ---------- API Routes ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/products", reviewRoutes);
app.use("/api/users", userRoutes);

/* ---------- Root ---------- */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Mini E-Commerce Backend is running",
  });
});

/* ---------- Health Check ---------- */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

/* ---------- Error Handler (MUST BE LAST) ---------- */
app.use(errorHandler);

module.exports = app;
