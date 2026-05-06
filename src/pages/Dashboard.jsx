import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load dashboard"));
  }, []);

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="p-6">
          <div className="bg-white rounded-xl shadow p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Dashboard Error</h1>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="p-6">
          <div className="bg-white rounded-xl shadow p-6 max-w-xl mx-auto text-center">
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  const cards = [
    { title: "Total Tasks", value: data.totalTasks, color: "bg-blue-500" },
    { title: "Completed", value: data.completedTasks, color: "bg-green-500" },
    { title: "Pending", value: data.pendingTasks, color: "bg-yellow-500" },
    { title: "Overdue", value: data.overdueTasks, color: "bg-red-500" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <h1 className="text-3xl font-bold">Dashboard 📊</h1>
          <p className="text-gray-600 mt-2">
            Welcome, <span className="font-semibold">{data.name}</span> — you are logged in as <span className="font-semibold">{data.role}</span>.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className={`text-white p-5 rounded-xl shadow ${c.color}`}
            >
              <h2 className="text-lg">{c.title}</h2>
              <p className="text-2xl font-bold">{c.value || 0}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}