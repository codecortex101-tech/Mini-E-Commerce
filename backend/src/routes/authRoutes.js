const express = require("express");
const router = express.Router();

// ✅ CORRECT IMPORT (destructuring)
const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// ✅ SAFETY CHECK (optional but recommended)
console.log("registerUser:", typeof registerUser);
console.log("loginUser:", typeof loginUser);

// ==============================
// AUTH ROUTES
// ==============================
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
