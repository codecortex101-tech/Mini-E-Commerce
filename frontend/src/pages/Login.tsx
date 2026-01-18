import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // ⭐ MUST

    // ⭐ RESET OLD ERROR
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://mini-e-commerce-dxoh.onrender.com/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      // ✅ SUCCESS
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard"); // ya home
      }
    } catch (err) {
      // ❌ ERROR HANDLE
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError(""); // ⭐ clear while typing
        }}
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError(""); // ⭐ clear while typing
        }}
        required
      />

      {error && <div className="error-box">{error}</div>}

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
