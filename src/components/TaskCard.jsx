import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

export default function TaskCard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [project, setProject] = useState("");
  const [dueDate, setDueDate] = useState("");

  // 🔄 Fetch all data
  const fetchData = async () => {
    try {
      const [taskRes, userRes, projectRes] = await Promise.all([
        API.get("/tasks"),
        API.get("/auth/users"),
        API.get("/projects"),
      ]);

      setTasks(taskRes.data);
      setUsers(userRes.data);
      setProjects(projectRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ➕ Create Task
  const createTask = async () => {
    try {
      await API.post("/tasks", {
        title,
        description,
        assignedTo,
        project,
        dueDate,
      });

      alert("Task Created ✅");

      // reset form
      setTitle("");
      setDescription("");
      setAssignedTo("");
      setProject("");
      setDueDate("");

      fetchData();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Error creating task");
    }
  };

  // 🔄 Update Status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Task Manager 🧠</h1>

      {/* ================= CREATE TASK ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow mb-6 max-w-lg"
      >
        <h2 className="text-xl font-bold mb-4">Create Task</h2>

        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* 👇 PROJECT DROPDOWN */}
        <select
          className="input"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* 👇 USER DROPDOWN */}
        <select
          className="input"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Assign To</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>

        <input
          type="date"
          className="input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white w-full p-2 rounded mt-2"
          onClick={createTask}
        >
          Create Task
        </motion.button>
      </motion.div>

      {/* ================= TASK LIST ================= */}
      <div className="grid gap-4">

        {tasks.map((task, i) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>

            <div className="flex justify-between items-center mt-3">

              {/* STATUS */}
              <span
                className={`px-3 py-1 rounded text-white text-sm ${
                  task.status === "completed"
                    ? "bg-green-500"
                    : task.status === "pending"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {task.status}
              </span>

              {/* UPDATE */}
              <select
                value={task.status}
                onChange={(e) =>
                  updateStatus(task._id, e.target.value)
                }
                className="border p-1 rounded"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <p className="text-xs mt-2 text-gray-500">
              Due: {task.dueDate?.slice(0, 10)}
            </p>
          </motion.div>
        ))}

      </div>
    </div>
  );
}