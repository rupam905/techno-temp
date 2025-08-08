import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/User_login", formData, {
        withCredentials: true, // if using cookies for sessions
      });

      if (response.data.success) {
        // Optionally store token/user
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // Redirect
        navigate("/user");
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-[#130f2a] flex flex-col lg:flex-row items-start justify-start px-6 pt-28 relative"
      style={{
        backgroundImage: "url('/images/bg2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 lg:px-8 fixed w-full top-0 z-50 bg-transparent">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center">
            <img src="/images/technothon.png" alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>

        <div className="hidden lg:flex gap-x-12 px-6 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/10 shadow-sm">
          <Link to="/home" className="text-sm font-medium text-white hover:text-violet-400">Home</Link>
          <Link to="/events" className="text-sm font-medium text-white hover:text-violet-400">Events</Link>
          <Link to="/about" className="text-sm font-medium text-white hover:text-violet-400">About</Link>
          <Link to="/contact" className="text-sm font-medium text-white hover:text-violet-400">Contact</Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/" className="text-sm font-medium text-white hover:text-violet-400">
            Log out <span aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>

      {/* Login Card */}
      <div className="backdrop-blur-lg bg-white/5 text-white p-10 sm:p-12 md:p-14 rounded-3xl shadow-2xl w-full max-w-xl z-10">
        <h2 className="text-3xl font-bold mb-2 text-purple-300 text-left">Sign In</h2>
        <p className="text-sm text-gray-300 mb-4">
          Don’t have an account?{" "}
          <Link to="/" className="text-purple-200 hover:underline">Create one.</Link>
        </p>

        {error && (
          <div className="text-red-400 text-sm mb-4 bg-red-500/10 px-4 py-2 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm mb-1 text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              className="w-full px-4 py-2 rounded-lg bg-[#2b1e4a] text-white border border-purple-700/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-[#2b1e4a] text-white border border-purple-700/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              className="text-sm text-gray-300 hover:underline"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-white font-medium transition duration-200 bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90"
            >
              Login
            </button>
          </div>
        </form>

        <div className="my-6 border-t border-white/20" />

        <p className="text-sm text-gray-300 mb-3">Or continue with</p>
        <div className="flex gap-4 mb-6">
          <button className="p-2 bg-[#2b1e4a] rounded-lg hover:bg-white/10 transition duration-200">
            <FcGoogle size={20} />
          </button>
          <button className="p-2 bg-[#2b1e4a] rounded-lg hover:bg-white/10 transition duration-200">
            <FaGithub size={20} />
          </button>
          <button className="p-2 bg-[#2b1e4a] rounded-lg hover:bg-white/10 transition duration-200">
            <FaLinkedin size={20} color="#0077b5" />
          </button>
        </div>

        <p className="text-xs text-gray-400">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
