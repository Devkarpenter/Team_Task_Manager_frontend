import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold text-lg">Task Manager</h1>
      <button onClick={()=>{
        localStorage.removeItem("token");
        navigate("/");
      }} className="text-red-500">
        Logout
      </button>
    </div>
  );
}