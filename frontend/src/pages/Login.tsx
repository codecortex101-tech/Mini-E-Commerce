import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api"; // ✅ axios instance

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      // ✅ ONLY THIS ENDPOINT (backend confirmed working)
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      // ✅ backend response verified by you
      if (res.data?.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/"); // or /dashboard
      } else {
        setError(res.data?.message || "Login failed");
      }
    } catch (err: any) {
      console.error("LOGIN ERROR:", err);

      setError(
        err?.response?.data?.message ||
          "Login failed. Check email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ textAlign: "center", marginTop: 10 }}>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eefaf1",
  },
  card: {
    width: 360,
    padding: 25,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: 12,
    marginTop: 12,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  button: {
    width: "100%",
    marginTop: 18,
    padding: 12,
    background: "#0a8f4d",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
};
