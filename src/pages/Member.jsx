import { useNavigate } from "react-router-dom";

export default function Member() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Member Dashboard</h1>
        <p className="text-gray-600 mb-6">You are logged in as a member.</p>
        <button onClick={handleLogout} className="btn">
          Logout
        </button>
      </div>
    </div>
  );
}
