import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [eventFile, setEventFile] = useState(null);
  const [eventPreview, setEventPreview] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingAchievements, setEditingAchievements] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [newAchImage, setNewAchImage] = useState(null);
  const [newAchPreview, setNewAchPreview] = useState(null);
  const [newAchTitle, setNewAchTitle] = useState("");
  const [newAchDesc, setNewAchDesc] = useState("");
  const [newAchievement, setNewAchievement] = useState({
  title: "",
  description: "",
  image: null,
  preview: null,
});
const [showCertificateForm, setShowCertificateForm] = useState(false);
const [showEventForm, setShowEventForm] = useState(false);


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${id}`)
      .then((res) => {
        setUser(res.data);
        if (res.data.achievements) setAchievements(res.data.achievements);
      })
      .catch((err) => console.error("Failed to fetch user:", err));
  }, [id]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleEventFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setEventFile(selected);
      setEventPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("certificate", file);

    try {
      setUploading(true);
      const res = await axios.post(
        `http://localhost:5000/api/users/upload-certificate/${user._id}`,
        formData
      );
      setUser(res.data);
      setToastOpen(true);
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleEventUpload = async () => {
    if (!eventFile || !eventTitle) return alert("Title and image required");

    const formData = new FormData();
    formData.append("eventImage", eventFile);
    formData.append("title", eventTitle);
    formData.append("description", eventDescription);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/users/upload-event/${user._id}`,
        formData
      );
      setUser(res.data);
      setEventFile(null);
      setEventTitle("");
      setEventDescription("");
      setEventPreview(null);
      setToastOpen(true);
    } catch (err) {
      console.error("Event upload failed", err);
    }
  };

  const handleDelete = async (cert) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/users/delete-certificate/${user._id}/${cert}`
      );
      setUser(res.data);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleAchievementChange = (idx, value) => {
    const updated = [...achievements];
    updated[idx] = value;
    setAchievements(updated);
  };
  const handleNewAchImage = (e) => {
  const selected = e.target.files[0];
  if (selected) {
    setNewAchImage(selected);
    setNewAchPreview(URL.createObjectURL(selected));
  }
};

const handleAddAchievement = async () => {
  if (!newAchTitle || !newAchDesc || !newAchImage) {
    alert("All fields required");
    return;
  }

  const formData = new FormData();
  formData.append("image", newAchImage);
  formData.append("title", newAchTitle);
  formData.append("description", newAchDesc);

  try {
    const res = await axios.post(
      `http://localhost:5000/api/users/upload-achievement/${user._id}`,
      formData
    );
    setUser(res.data);
    setAchievements(res.data.achievements);
    setNewAchImage(null);
    setNewAchPreview(null);
    setNewAchTitle("");
    setNewAchDesc("");
    setToastOpen(true);
  } catch (err) {
    console.error("Achievement upload failed", err);
  }
};


  const saveAchievements = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${user._id}`, {
        ...user,
        achievements,
      });
      setUser(res.data);
      setEditingAchievements(false);
    } catch (err) {
      console.error("Failed to save achievements", err);
    }
  };

  const shareProfile = () => {
    const shareUrl = window.location.href;
    const message = `Check out ${user.name}'s profile on Technothon Dashboard: ${shareUrl}`;
    const encodedMsg = encodeURIComponent(message);

    const options = [
      `https://wa.me/?text=${encodedMsg}`,
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${user.name}'s Dashboard`,
      `https://twitter.com/intent/tweet?text=${encodedMsg}`,
      `mailto:?subject=Check%20this%20out&body=${encodedMsg}`,
    ];

    window.open(options[0], "_blank");
  };

  if (!user) return <div className="text-white p-10">User not found</div>;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 font-sans"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.2 } },
      }}
    >
      {/* Header */}
      <motion.header className="flex items-center justify-between mb-6" variants={fadeInUp}>
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
          <button
            onClick={() => navigate(`/edit/${user._id}`)}
            className="bg-purple-700 px-4 py-2 rounded hover:bg-purple-800 transition border-2 border-purple-500 hover:border-purple-300"
          >
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
        <motion.div className="bg-gray-800 p-4 rounded-xl border-2 border-purple-500 shadow-xl" variants={fadeInUp}>
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
  variants={fadeInUp}
>
  <div className="flex items-center justify-between mb-2">
    <h2 className="text-lg font-semibold">Past Achievements 🏆</h2>
    {editingAchievements ? (
      <IconButton size="small" onClick={saveAchievements} color="success">
        <SaveIcon />
      </IconButton>
    ) : (
      <IconButton size="small" onClick={() => setEditingAchievements(true)} color="primary">
        <EditIcon />
      </IconButton>
    )}
  </div>

  {editingAchievements && (
    <div className="space-y-2 mb-4">
      <TextField
        label="Title"
        fullWidth
        value={newAchievement.title || ""}
        onChange={(e) =>
          setNewAchievement((prev) => ({ ...prev, title: e.target.value }))
        }
        InputLabelProps={{ style: { color: "#ccc" } }}
        InputProps={{ style: { color: "#fff" } }}
      />
      <TextField
        label="Description"
        fullWidth
        multiline
        value={newAchievement.description || ""}
        onChange={(e) =>
          setNewAchievement((prev) => ({ ...prev, description: e.target.value }))
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
          if (!newAchievement.title || !newAchievement.image) return alert("Title and image required");
          setAchievements((prev) => [...prev, newAchievement]);
          setNewAchievement({ title: "", description: "", image: null, preview: null });
        }}
      >
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
        custom={idx}
      >
        <img
          src={
            typeof ach.image === "string"
              ? `http://localhost:5000/api/users/uploads/${ach.image}`
              : ach.preview
          }
          alt="Achievement"
          className="w-full h-28 object-cover rounded mb-2"
        />
        <h3 className="font-bold text-white">{ach.title}</h3>
        <p className="text-sm text-white">{ach.description}</p>
      </motion.div>
    ))}
  </div>
</motion.div>


        <motion.div className="bg-gray-800 p-4 rounded-xl border-2 border-purple-500 shadow-xl" variants={fadeInUp}>
  <h2 className="text-lg font-semibold mb-2">Certificates 📜</h2>

  <div className="mb-4 space-y-2">
    <input type="file" accept="image/*" onChange={handleFileChange} />
    {preview && (
      <img
        src={preview}
        alt="Preview"
        className="w-48 h-32 object-cover rounded border border-purple-500"
      />
    )}
    <button
      onClick={handleUpload}
      className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
      disabled={uploading}
    >
      {uploading ? "Uploading..." : "Upload Certificate"}
    </button>
  </div>

  <div className="flex gap-4 overflow-x-auto pb-2">
    {user.certificates?.map((img, idx) => (
      <motion.div
        key={idx}
        className="relative flex-shrink-0 w-48 h-32 border-2 border-purple-500 hover:border-purple-300 rounded-lg shadow hover:shadow-2xl transition"
        variants={fadeInUp}
        custom={idx}
      >
        <img
          src={`http://localhost:5000/api/users/uploads/${img}`}
          alt={`cert-${idx}`}
          className="w-full h-full object-cover rounded-lg"
        />
        <button
          onClick={() => handleDelete(img)}
          className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white"
        >
          <DeleteIcon fontSize="small" />
        </button>
      </motion.div>
    ))}
  </div>
</motion.div>


        {/* Events Attended */}
        <motion.div className="bg-gray-800 p-4 rounded-xl border-2 border-purple-500 shadow-xl" variants={fadeInUp}>
  <h2 className="text-lg font-semibold mb-2">Events Attended 🎓</h2>

  <div className="mb-4 space-y-2">
    <input type="file" accept="image/*" onChange={handleEventFileChange} />
    {eventPreview && (
      <img
        src={eventPreview}
        alt="Event Preview"
        className="w-48 h-32 object-cover rounded border border-purple-500"
      />
    )}
    <TextField
      fullWidth
      label="Event Title"
      value={eventTitle}
      onChange={(e) => setEventTitle(e.target.value)}
      variant="filled"
      InputLabelProps={{ style: { color: "#ccc" } }}
      InputProps={{ style: { color: "#fff" } }}
    />
    <TextField
      fullWidth
      label="Event Description"
      multiline
      rows={2}
      value={eventDescription}
      onChange={(e) => setEventDescription(e.target.value)}
      variant="filled"
      InputLabelProps={{ style: { color: "#ccc" } }}
      InputProps={{ style: { color: "#fff" } }}
    />
    <button
      onClick={handleEventUpload}
      className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
    >
      Upload Event
    </button>
  </div>

  <div className="flex gap-4 overflow-x-auto pb-2">
    {(user.events || []).map((ev, idx) => (
      <motion.div
        key={idx}
        className="bg-gray-700 border-2 border-purple-500 hover:border-purple-300 rounded-lg w-56 p-3 shadow hover:shadow-2xl"
        variants={fadeInUp}
        custom={idx}
      >
        <img
          src={`http://localhost:5000/api/users/uploads/${ev.image}`}
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

      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={() => setToastOpen(false)}>
        <Alert severity="success" sx={{ width: "100%" }} onClose={() => setToastOpen(false)}>
          Upload successful!
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default UserDashboard;
