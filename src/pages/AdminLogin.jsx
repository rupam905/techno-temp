import React, { useState } from "react";
import { FaLinkedin, FaGoogle, FaTwitter, FaPhone } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/admin/login", {
        email,
        password,
      }, { withCredentials: true });

      if (res.data?.status === "success") {
        navigate("/admin"); // redirect to admin dashboard
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };
const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Try again.");
    }
  };
  return (
    <div
      className="min-h-screen w-full bg-[#130f2a] flex items-center justify-start px-2"
      style={{
        backgroundImage: "url('/images/bg1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <nav className="flex items-center justify-between p-6 lg:px-8 fixed w-full top-0 z-50 bg-transparent">
  {/* Left - Logo */}
  <div className="flex lg:flex-1">
    <Link to="/" className="-m-1.5 p-1.5 flex items-center">
      <img src="/images/technothon.png" alt="Logo" className="h-8 w-auto" />
    </Link>
  </div>

  {/* Middle - Blurred Links Section */}
  <div className="hidden lg:flex gap-x-12 px-6 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/10 shadow-sm">
    <Link to="/home" className="text-sm font-medium text-white hover:text-violet-400">Home</Link>
    <Link to="/events" className="text-sm font-medium text-white hover:text-violet-400">Events</Link>
    <Link to="/about" className="text-sm font-medium text-white hover:text-violet-400">About</Link>
    <Link to="/contact" className="text-sm font-medium text-white hover:text-violet-400">Contact</Link>
  </div>

  {/* Right - Login Link */}
  <div className="hidden lg:flex lg:flex-1 lg:justify-end">
    <button
            onClick={handleLogout}
            className="text-sm font-medium text-white hover:text-violet-400"
          >
            Log out <span aria-hidden="true">→</span>
          </button>
  </div>
</nav>

      <div className="backdrop-blur-lg bg-white/5 border border-white/10 text-white p-10 sm:p-12 md:p-14 rounded-3xl shadow-2xl w-full max-w-xl md:ml-20 z-10">
        <h2 className="text-3xl font-bold mb-2 text-purple-300">Admin Log In</h2>
        <p className="text-sm text-gray-300 mb-4">
          Not admin yet?{" "}
          <a href="#" className="text-purple-200 hover:underline">
            Request access.
          </a>
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm mb-1 text-gray-200">Email address</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#2b1e4a] text-white border border-purple-700/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-200">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#2b1e4a] text-white border border-purple-700/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex justify-between items-center">
            <button
              type="button"
              className="text-sm text-gray-300 hover:underline"
              onClick={() => {
                setEmail("");
                setPassword("");
                setError("");
              }}
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition duration-200"
            >
              Log In
            </button>
          </div>
        </form>

        {/* <div className="my-6 border-t border-white/20"></div>

        <p className="text-sm text-gray-300 mb-3">Or continue with</p>
        <div className="flex gap-4 mb-6">
          <button className="p-2 bg-[#2b1e4a] rounded-lg hover:bg-purple-500 transition duration-200">
            <FaLinkedin size={20} />
          </button>
          <button className="p-2 bg-[#2b1e4a] rounded-lg hover:bg-red-500 transition duration-200">
            <FaGoogle size={20} />
          </button>
          <button className="p-2 bg-[#2b1e4a] rounded-lg hover:bg-sky-500 transition duration-200">
            <FaTwitter size={20} />
          </button>
        </div> */}

        <div className="flex items-center gap-2 text-sm text-gray-300">
          <FaPhone />
          Any questions? Call us now.
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
