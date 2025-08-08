import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const registerModalRef = useRef();
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [studentIdValid, setStudentIdValid] = useState(false);
  const [studentIdMessage, setStudentIdMessage] = useState("");
  const [studentIdValidating, setStudentIdValidating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (
        registerModalRef.current &&
        !registerModalRef.current.contains(e.target)
      ) {
        navigate(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [navigate]);

  useEffect(() => {
    const validateStudentId = async () => {
      const id = studentId.trim();
      if (id.length < 1) {
        setStudentIdMessage("");
        setStudentIdValid(false);
        return;
      }

      setStudentIdValidating(true);
      try {
        const response = await axios.post(
          "http://localhost:8000/validate_student_id",
          { college_id: id }
        );

        if (response.status === 200 && response.data.status === "valid") {
          setStudentIdMessage("Student ID is valid!");
          setStudentIdValid(true);
        }
      } catch (error) {
        const errorMsg =
          error.response?.data?.detail ||
          "Student ID hasn't matched or already registered";
        setStudentIdMessage(errorMsg);
        setStudentIdValid(false);
      } finally {
        setStudentIdValidating(false);
      }
    };

    const debounceTimer = setTimeout(validateStudentId, 500);
    return () => clearTimeout(debounceTimer);
  }, [studentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!studentIdValid) {
      setErrorMessage("Please enter a valid Student ID!");
      return;
    }
    if (!name.trim()) {
      setErrorMessage("Full Name is required!");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/User_register", {
        college_id: studentId.trim(),
        name: name.trim(),
        email: email.trim(),
        password: password,
        phone_no: contactNo,
        whatsapp_no: whatsappNo,
      });

      if (response.status >= 200 && response.status < 300) {
        navigate(response.data.redirect || "/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMsg = error.response?.data?.detail || "Registration failed";
      setErrorMessage("Error: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div
      className="min-h-screen w-full bg-[#130f2a] px-2 pt-24"
      style={{
        backgroundImage: "url('/images/bg2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
     {/* Navbar */}
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
    <Link to="/login" className="text-sm font-medium text-white hover:text-violet-400">
      Log in <span aria-hidden="true">→</span>
    </Link>
  </div>
</nav>

      {/* Registration Card */}
      <div className="flex items-center justify-start">
        <div
          ref={registerModalRef}
          className="backdrop-blur-lg bg-white/5 border border-white/10 text-white p-10 sm:p-12 md:p-14 rounded-3xl shadow-2xl w-full max-w-xl md:ml-20 z-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-purple-300">
            Create an Account
          </h2>
          <p className="text-sm mb-6 text-gray-300">
            Already have an account?{" "}
            <a href="/login" className="text-purple-200 hover:underline">
              Log in
            </a>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#2b1e4a] border border-purple-700/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              {studentIdValidating && (
                <p className="text-blue-400 text-xs mt-1">Validating...</p>
              )}
              {studentIdMessage && (
                <p
                  className={`text-xs mt-1 font-medium ${
                    studentIdValid ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {studentIdMessage}
                </p>
              )}
            </div>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#2b1e4a] border border-purple-700/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
              disabled={!studentIdValid}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#2b1e4a] border border-purple-700/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
              disabled={!studentIdValid}
              required
            />

            <input
              type="tel"
              placeholder="Contact No"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value.replace(/\D/g, ""))}
              className="w-full px-4 py-2 rounded-lg bg-[#2b1e4a] border border-purple-700/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
              disabled={!studentIdValid}
              maxLength={10}
              required
            />

            <div>
              <input
                type="tel"
                placeholder="WhatsApp No"
                value={whatsappNo}
                onChange={(e) => setWhatsappNo(e.target.value.replace(/\D/g, ""))}
                className="w-full px-4 py-2 rounded-lg bg-[#2b1e4a] border border-purple-700/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
                disabled={!studentIdValid}
                maxLength={10}
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                (If same as contact, fill same number in both)
              </p>
            </div>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#2b1e4a] border border-purple-700/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
              disabled={!studentIdValid}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#2b1e4a] border border-purple-700/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
              disabled={!studentIdValid}
              required
            />

            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1" />
              <span className="text-xs">
                I agree to the{" "}
                <a href="#" className="text-purple-200 underline">
                  Terms &amp; Conditions
                </a>
              </span>
            </div>

            {errorMessage && (
              <p className="text-sm text-red-400 font-medium">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 text-white py-2 rounded-lg transition"
              disabled={!studentIdValid || loading}
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
