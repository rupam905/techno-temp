// src/pages/UserDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [editingAchievements, setEditingAchievements] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
    image: null,
    preview: null,
  });

  useEffect(() => {
    // Simulate loading user from backend
    const fakeUser = {
      _id: "demo123",
      name: "Soham Ghosh",
      course: "B.Tech CSE",
      className: "A",
      attendance: 92,
      certificates: [
        "https://via.placeholder.com/300x200?text=Certificate+1",
        "https://via.placeholder.com/300x200?text=Certificate+2",
      ],
      events: [
        {
          image: "https://via.placeholder.com/300x200?text=Event+1",
          title: "Hackathon 2024",
          description: "Built a full-stack app in 24 hours.",
        },
      ],
      achievements: [
        {
          image: "https://via.placeholder.com/300x200?text=Achievement+1",
          title: "Winner at CodeFest",
          description: "Secured 1st place among 100+ teams.",
        },
      ],
    };
    setUser(fakeUser);
    setAchievements(fakeUser.achievements);
  }, []);

  const saveAchievements = () => {
    setUser((prev) => ({ ...prev, achievements }));
    setEditingAchievements(false);
  };

  const shareProfile = () => {
    const shareUrl = window.location.href;
    const message = `Check out ${user.name}'s profile: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (!user) return <div className="text-white p-10">Loading...</div>;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 font-sans"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.2 } },
      }}>
      {/* Header */}
      <motion.header
        className="flex items-center justify-between mb-6"
        variants={fadeInUp}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl shadow-xl">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-wide">{user.name}</h1>
            <p className="text-sm text-gray-400">
              {user.course} - {user.className}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-purple-700 px-4 py-2 rounded hover:bg-purple-800 transition border-2 border-purple-500 hover:border-purple-300">
            Edit ✏️
          </button>
          <Tooltip title="Share Profile">
            <IconButton onClick={shareProfile} color="primary">
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </div>
      </motion.header>

      {/* Grid Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance */}
        <motion.div
          className="bg-gray-800 p-4 rounded-xl border-2 border-purple-500 shadow-xl"
          variants={fadeInUp}>
          <h2 className="text-lg mb-4 font-semibold">Attendance</h2>
          <div className="flex items-center gap-6">
            <CircularProgress
              variant="determinate"
              value={user.attendance}
              size={80}
              thickness={4}
              sx={{ color: "#a855f7" }}
            />
            <div>
              <p className="text-xl font-bold">{user.attendance}/100</p>
              <p className="text-gray-400">Overall Attendance</p>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="bg-gray-800 p-4 rounded-xl border-2 border-purple-500 shadow-xl"
          variants={fadeInUp}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Past Achievements 🏆</h2>
            {editingAchievements ? (
              <IconButton
                size="small"
                onClick={saveAchievements}
                color="success">
                <SaveIcon />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                onClick={() => setEditingAchievements(true)}
                color="primary">
                <EditIcon />
              </IconButton>
            )}
          </div>

          {editingAchievements && (
            <div className="space-y-2 mb-4">
              <TextField
                label="Title"
                fullWidth
                value={newAchievement.title}
                onChange={(e) =>
                  setNewAchievement((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{ style: { color: "#fff" } }}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                value={newAchievement.description}
                onChange={(e) =>
                  setNewAchievement((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{ style: { color: "#fff" } }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setNewAchievement((prev) => ({
                      ...prev,
                      image: file,
                      preview: URL.createObjectURL(file),
                    }));
                  }
                }}
              />
              {newAchievement.preview && (
                <img
                  src={newAchievement.preview}
                  alt="Preview"
                  className="w-48 h-32 object-cover rounded-lg border border-purple-500"
                />
              )}
              <button
                className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                onClick={() => {
                  if (!newAchievement.title || !newAchievement.preview) {
                    return alert("Title and image required");
                  }
                  setAchievements((prev) => [...prev, newAchievement]);
                  setNewAchievement({
                    title: "",
                    description: "",
                    image: null,
                    preview: null,
                  });
                }}>
                Add Achievement
              </button>
            </div>
          )}

          <div className="flex gap-4 overflow-x-auto pb-2">
            {achievements.map((ach, idx) => (
              <motion.div
                key={idx}
                className="flex-shrink-0 w-56 bg-purple-600 rounded-lg p-4 border-2 border-purple-400 hover:border-purple-200 transition shadow hover:shadow-2xl"
                variants={fadeInUp}
                custom={idx}>
                <img
                  src={ach.image || ach.preview}
                  alt="Achievement"
                  className="w-full h-28 object-cover rounded mb-2"
                />
                <h3 className="font-bold text-white">{ach.title}</h3>
                <p className="text-sm text-white">{ach.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certificates */}
        <motion.div
          className="bg-gray-800 p-4 rounded-xl border-2 border-purple-500 shadow-xl"
          variants={fadeInUp}>
          <h2 className="text-lg font-semibold mb-2">Certificates 📜</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {user.certificates.map((img, idx) => (
              <motion.div
                key={idx}
                className="relative flex-shrink-0 w-48 h-32 border-2 border-purple-500 hover:border-purple-300 rounded-lg shadow hover:shadow-2xl transition"
                variants={fadeInUp}
                custom={idx}>
                <img
                  src={img}
                  alt={`cert-${idx}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white">
                  <DeleteIcon fontSize="small" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Events */}
        <motion.div
          className="bg-gray-800 p-4 rounded-xl border-2 border-purple-500 shadow-xl"
          variants={fadeInUp}>
          <h2 className="text-lg font-semibold mb-2">Events Attended 🎓</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {user.events.map((ev, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-700 border-2 border-purple-500 hover:border-purple-300 rounded-lg w-56 p-3 shadow hover:shadow-2xl"
                variants={fadeInUp}
                custom={idx}>
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="font-bold text-white">{ev.title}</h3>
                <p className="text-sm text-gray-300">{ev.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}>
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={() => setToastOpen(false)}>
          Upload successful!
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default UserDashboard;
