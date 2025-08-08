/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const [profile, setProfile] = useState({ name: "", role: "" });
  const [teamsPending, setTeamsPending] = useState([]);
  const [chartData, setChartData] = useState({ users: [0, 0], sponsors: [0, 0], teams: [0, 0] });
  const [gallery, setGallery] = useState({ eventName: "", uploads: 0 });
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const [form, setForm] = useState({ name: "", desc: "", prize: "", start: "", end: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pendingRes, profileRes, chartsRes, galleryRes, uploadsRes] = await Promise.all([
          axios.get("http://localhost:8000/admin/pending_teams", { withCredentials: true }),
          axios.get("http://localhost:8000/admin/profile", { withCredentials: true }),
          axios.get("http://localhost:8000/admin/charts_data", { withCredentials: true }),
          axios.get("http://localhost:8000/admin/gallery_data", { withCredentials: true }),
          axios.get("http://localhost:8000/admin/uploads", { withCredentials: true }),
        ]);

        setTeamsPending(pendingRes.data.pending_teams || []);
        setProfile(profileRes.data || {});
        setChartData(chartsRes.data || { users: [0, 0], sponsors: [0, 0], teams: [0, 0] });
        setGallery(galleryRes.data || { eventName: "", uploads: 0 });
        setUploads(uploadsRes.data.files || []);
      } catch (err) {
        console.error("Error loading dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Try again.");
    }
  };

  const handleEventUpload = async () => {
    try {
      await axios.post("http://localhost:8000/admin/create_event", form, { withCredentials: true });
      alert("Event created!");
      setForm({ name: "", desc: "", prize: "", start: "", end: "" });
    } catch (err) {
      alert("Event creation failed.");
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post("http://localhost:8000/admin/upload_file", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("File uploaded successfully!");
      setSelectedFile(null);

      // Re-fetch uploaded files
      const uploadsRes = await axios.get("http://localhost:8000/admin/uploads", { withCredentials: true });
      setUploads(uploadsRes.data.files || []);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    }
  };

  const chartUsers = {
    labels: ["Active", "Inactive"],
    datasets: [{ label: "Users", data: chartData.users, backgroundColor: ["#a855f7", "#6b7280"] }],
  };

  const chartSponsors = {
    labels: ["Current", "Past"],
    datasets: [{ label: "Sponsors", data: chartData.sponsors, backgroundColor: ["#6366f1", "#4b5563"] }],
  };

  const chartTeams = {
    labels: ["Pending", "Approved"],
    datasets: [{ label: "Teams", data: chartData.teams, backgroundColor: ["#ec4899", "#6b7280"] }],
  };

  const chartsRef = useRef(null);
  const uploadsRef = useRef(null);
  const [chartsVisible, setChartsVisible] = useState(false);
  const [uploadsVisible, setUploadsVisible] = useState(false);

  useEffect(() => {
    const observeSection = (ref, setter) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.2 }
      );
      if (ref.current) observer.observe(ref.current);
    };

    observeSection(chartsRef, setChartsVisible);
    observeSection(uploadsRef, setUploadsVisible);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 lg:px-8 fixed w-full top-0 z-50 backdrop-blur-xl bg-white/5">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center">
            <img src="/images/technothon.png" alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>
        <div className="hidden lg:flex gap-x-12 px-6 py-2 rounded-full ring-1 ring-white/10 bg-white/10 backdrop-blur-xl">
          {["home", "events", "about", "contact"].map((item) => (
            <Link
              key={item}
              to={`/${item}`}
              className="text-sm font-medium text-white hover:text-purple-300"
            >
              {item[0].toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-white hover:text-purple-300 transition-transform duration-200 transform hover:scale-105"
          >
            Log out <span aria-hidden="true">→</span>
          </button>
        </div>
      </nav>

      {/* Background */}
      {/* Background */}
<div className="fixed inset-0 -z-20">
  <div
    className="w-full h-full bg-cover bg-center blur-lg scale-105"
    style={{ backgroundImage: "url('/images/bg3.png')" }}
  />
  <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
</div>


      {/* Main */}
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-12 relative z-10 text-white">

        {/* Profile */}
        <div className={`flex items-center gap-4 mb-10 opacity-0 ${chartsVisible ? "animate-slide-in-top" : ""}`} ref={chartsRef}>
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold">
            {profile.name[0]}
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-300 to-purple-500 text-transparent bg-clip-text">
              {profile.name}
            </h1>
            <p className="text-sm text-purple-300">{profile.role}</p>
          </div>
        </div>

        {/* Charts */}
        <section className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10 opacity-0 ${chartsVisible ? "animate-popout" : ""}`}>
          {[{ title: "Users", data: chartUsers }, { title: "Sponsors", data: chartSponsors }, { title: "Gallery 📷" }, { title: "Teams", data: chartTeams }].map((card, i) => (
            <div key={i} className="p-6 rounded-2xl bg-purple-500/10 backdrop-blur-2xl border border-white/10 shadow-md text-white h-80">
              <h2 className="text-lg font-semibold text-purple-300 mb-4">{card.title} Chart</h2>
              {card.title === "Gallery 📷" ? (
                <>
                  <img src="/images/gallery_preview.png" alt="Gallery" className="w-full h-36 object-cover rounded mb-2" />
                  <h3 className="text-md font-semibold text-purple-200">At a glance</h3>
                  <p>{gallery.eventName}</p>
                  <p>Uploads: {gallery.uploads}</p>
                </>
              ) : (
                <div className="h-48">
                  <Pie data={card.data} options={{ maintainAspectRatio: false }} />
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Create Event & Uploads */}
        <section className={`grid md:grid-cols-2 gap-6 opacity-0 ${uploadsVisible ? "animate-slide-in-bottom" : ""}`} ref={uploadsRef}>

          {/* Create Event */}
          <div className="p-6 rounded-2xl bg-purple-500/10 backdrop-blur-2xl border border-white/10 text-white">
            <h2 className="text-lg font-semibold text-purple-300 mb-4">Create Event</h2>
            <div className="grid gap-3">
              {["name", "desc", "prize", "start", "end"].map((field) => (
                <input
                  key={field}
                  name={field}
                  type="text"
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-white/10 placeholder-purple-300"
                />
              ))}
              <div className="flex gap-2 mt-2">
                <button className="animated-gradient animated-gradient-hover px-4 py-1 rounded-full text-sm font-semibold transition-transform duration-200 transform hover:scale-105">
                  Cancel
                </button>
                <button
                  onClick={handleEventUpload}
                  className="animated-gradient animated-gradient-hover px-4 py-1 rounded-full text-sm font-semibold transition-transform duration-200 transform hover:scale-105"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>

          {/* Uploads */}
          <div className="p-6 rounded-2xl bg-purple-500/10 backdrop-blur-2xl border border-white/10 text-white">
            <h2 className="text-lg font-semibold text-purple-300 mb-4">Uploads</h2>
            <p className="mb-2 text-sm text-purple-300">Last Uploaded: {uploads[0] || "None"}</p>
            <input className="w-full mb-4 p-2 rounded bg-gray-900 text-white placeholder-purple-400 border border-white/10" placeholder="Search..." />
            <ul className="space-y-2 mb-4 text-sm">
              {uploads.map((file, i) => (
                <li key={i} className="flex justify-between items-center bg-gray-900 px-3 py-2 rounded border border-white/10">
                  <span>{file}</span>
                  <span className="text-xs text-purple-400">Date</span>
                </li>
              ))}
            </ul>

            {/* File Input + Upload */}
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="mb-4 w-full text-sm text-white"
            />
            <div className="flex gap-2">
              <button
                className="animated-gradient animated-gradient-hover px-4 py-1 rounded-full text-sm font-semibold transition-transform duration-200 transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleFileUpload}
                className="animated-gradient animated-gradient-hover px-4 py-1 rounded-full text-sm font-semibold transition-transform duration-200 transform hover:scale-105"
              >
                Upload
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
