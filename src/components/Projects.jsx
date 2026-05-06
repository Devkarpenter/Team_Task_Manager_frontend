import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const createProject = async () => {
    await API.post("/projects", { name });
    setName("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Projects 🚀</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="input"
          placeholder="New Project"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn w-40" onClick={createProject}>
          Add
        </button>
      </div>

      <div className="grid gap-3">
        {projects.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            className="card"
          >
            {p.name}
          </motion.div>
        ))}
      </div>
    </div>
  );
}