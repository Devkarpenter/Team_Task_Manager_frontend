import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/signup", {
        name,
        email,
        password,
        role,
      });

      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="p-6 shadow-lg rounded w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input placeholder="Name" className="input" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" className="input" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="input" onChange={(e) => setPassword(e.target.value)} />
        <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleRegister} className="btn">Register</button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}