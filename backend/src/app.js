const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

/* ================= BODY ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= SECURITY ================= */
app.use(helmet());

/* ================= CORS (FINAL FIX) ================= */
app.use(
  cors({
    origin: true,          // allow ALL origins dynamically
    credentials: true,     // allow cookies / auth
  })
);

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);

/* ================= ROOT ================= */
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running 🚀" });
});

/* ================= ERROR ================= */
app.use(errorHandler);

module.exports = app;
