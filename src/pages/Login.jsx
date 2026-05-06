import { motion } from "framer-motion";
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password, role });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-linear-to-r from-blue-500 to-purple-600">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome Back 👋</h2>

        <input className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <motion.button whileTap={{ scale: 0.95 }} className="btn" onClick={handleLogin}>
          Login
        </motion.button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline"
          >
            Register
          </button>
        </p>
      </motion.div>

    </div>
  );
}