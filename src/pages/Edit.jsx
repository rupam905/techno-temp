import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

const Edit = () => {
  const [achievements, setAchievements] = useState([{ title: "", description: "", image: null }]);
  const [certificates, setCertificates] = useState([{ name: "", issuer: "", image: null }]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleAchievementChange = (index, field, value) => {
    const updated = [...achievements];
    updated[index][field] = value;
    setAchievements(updated);
  };

  const handleCertificateChange = (index, field, value) => {
    const updated = [...certificates];
    updated[index][field] = value;
    setCertificates(updated);
  };

  const handleImageUpload = (event, index, section) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (section === "achievement") {
        const updated = [...achievements];
        updated[index].image = reader.result;
        setAchievements(updated);
      } else {
        const updated = [...certificates];
        updated[index].image = reader.result;
        setCertificates(updated);
      }
    };
    if (file) reader.readAsDataURL(file);
  };

  const addAchievement = () => {
    setAchievements([...achievements, { title: "", description: "", image: null }]);
  };

  const addCertificate = () => {
    setCertificates([...certificates, { name: "", issuer: "", image: null }]);
  };

  const deleteAchievement = (index) => {
    const updated = [...achievements];
    updated.splice(index, 1);
    setAchievements(updated);
  };

  const deleteCertificate = (index) => {
    const updated = [...certificates];
    updated.splice(index, 1);
    setCertificates(updated);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");

      const payload = {
        achievements,
        certificates,
      };

      const response = await axios.post("/api/user/update", payload); // Adjust this route as needed
      setMessage("✅ Changes saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      setMessage("❌ Error saving data. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* Blurred Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/bg3.png" // 👈 Replace with your image path
          alt="Background"
          className="w-full h-full object-cover blur-md brightness-50"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 p-6">
        <div className="backdrop-blur-sm bg-black/60 rounded-xl max-w-5xl mx-auto p-6 shadow-2xl border border-purple-700">
          <h1 className="text-4xl font-bold mb-6 text-center text-purple-300">Edit Profile Details</h1>

          {/* Achievements Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-purple-200">Achievements 🏆</h2>
            {achievements.map((item, index) => (
              <div key={index} className="mb-6 border border-purple-500 p-4 rounded-lg relative bg-black/40">
                <button
                  onClick={() => deleteAchievement(index)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                  title="Delete Achievement"
                >
                  <FaTrash />
                </button>
                <input
                  type="text"
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) => handleAchievementChange(index, "title", e.target.value)}
                  className="w-full p-2 mb-2 bg-transparent border border-purple-500 rounded-md text-white"
                />
                <textarea
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleAchievementChange(index, "description", e.target.value)}
                  className="w-full p-2 mb-2 bg-transparent border border-purple-500 rounded-md text-white"
                />
                <label
                  htmlFor={`achievement-image-${index}`}
                  className="inline-block mb-2 px-4 py-1 cursor-pointer bg-purple-600 hover:bg-purple-700 rounded text-sm"
                >
                  📤 Upload Image
                </label>
                <input
                  type="file"
                  id={`achievement-image-${index}`}
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, index, "achievement")}
                  className="hidden"
                />
                {item.image && (
                  <img
                    src={item.image}
                    alt="Achievement"
                    className="w-48 rounded-lg mt-2 border border-purple-400"
                  />
                )}
              </div>
            ))}
            <button
              onClick={addAchievement}
              className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md"
            >
              + Add Achievement
            </button>
          </div>

          {/* Certificates Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-purple-200">Certificates 📜</h2>
            {certificates.map((item, index) => (
              <div key={index} className="mb-6 border border-purple-500 p-4 rounded-lg relative bg-black/40">
                <button
                  onClick={() => deleteCertificate(index)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                  title="Delete Certificate"
                >
                  <FaTrash />
                </button>
                <input
                  type="text"
                  placeholder="Certificate Name"
                  value={item.name}
                  onChange={(e) => handleCertificateChange(index, "name", e.target.value)}
                  className="w-full p-2 mb-2 bg-transparent border border-purple-500 rounded-md text-white"
                />
                <input
                  type="text"
                  placeholder="Issued By"
                  value={item.issuer}
                  onChange={(e) => handleCertificateChange(index, "issuer", e.target.value)}
                  className="w-full p-2 mb-2 bg-transparent border border-purple-500 rounded-md text-white"
                />
                <label
                  htmlFor={`certificate-image-${index}`}
                  className="inline-block mb-2 px-4 py-1 cursor-pointer bg-purple-600 hover:bg-purple-700 rounded text-sm"
                >
                  📤 Upload Image
                </label>
                <input
                  type="file"
                  id={`certificate-image-${index}`}
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, index, "certificate")}
                  className="hidden"
                />
                {item.image && (
                  <img
                    src={item.image}
                    alt="Certificate"
                    className="w-48 rounded-lg mt-2 border border-purple-400"
                  />
                )}
              </div>
            ))}
            <button
              onClick={addCertificate}
              className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md"
            >
              + Add Certificate
            </button>
          </div>

          {/* Save Button */}
          <div className="text-center mt-10">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg font-semibold"
              disabled={saving}
            >
              {saving ? "Saving..." : "💾 Save Changes"}
            </button>
            {message && (
              <div className="mt-4 text-sm text-purple-300">{message}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
