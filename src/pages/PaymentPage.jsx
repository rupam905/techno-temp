import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // for navbar links

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    merchantName: "",
    paymentType: "UPI Address",
    upiId: "",
    amount: "",
    description: "",
    paymentMode: "",
    utrNumber: "",
    transactionId: "",
    userId: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/me", {
          withCredentials: true,
        });
        setFormData((prev) => ({
          ...prev,
          userId: res.data.id || res.data.user_id,
        }));
      } catch (err) {
        console.error("Failed to fetch user session:", err);
        alert("Please login to submit payment.");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/payment/submit", formData, {
        withCredentials: true,
      });
      alert("Payment info saved!");
      setFormData({
        merchantName: "",
        paymentType: "UPI Address",
        upiId: "",
        amount: "",
        description: "",
        paymentMode: "",
        utrNumber: "",
        transactionId: "",
        userId: formData.userId,
      });
    } catch (err) {
      console.error("Payment error:", err);
      alert("Error saving payment details.");
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
      className="min-h-screen px-6 py-12 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/bg2.png')",
        backgroundColor: "#0f0b1f",
      }}
    >
      {/* Navbar */}
      <nav
        aria-label="Global"
        className="flex items-center justify-between z-40 p-6 lg:px-8 fixed w-350 h-10"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex">
            <img
              src="/images/technothon.png"
              alt="Logo"
              className="h-15 mx-auto"
            />
          </Link>
        </div>

        <div className="flex gap-x-12 rounded-full ring-1 ring-gray-200/20 px-7 py-2 backdrop-blur-3xl">
          <Link to="/home" className="text-sm/6 font-semibold text-gray-900">
            Home
          </Link>
          <Link to="/events" className="text-sm/6 font-semibold text-gray-900">
            Events
          </Link>
          <Link to="/about" className="text-sm/6 font-semibold text-gray-900">
            About
          </Link>
          <Link to="/contact" className="text-sm/6 font-semibold text-gray-900">
            Contact
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-white hover:text-violet-400"
          >
            Log out <span aria-hidden="true">→</span>
          </button>
        </div>
      </nav>

      {/* Payment Section */}
      <div className="mt-24 max-w-6xl mx-auto px-6">
        <div
          className="pt-28 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 
  bg-white/5 backdrop-blur-xl border border-white/10 
  shadow-lg rounded-2xl px-10 py-12"
        >
          {/* Left Form Section */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-3xl font-bold text-white">
              Submit Payment Info
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm text-purple-300">Payee Name</label>
                <input
                  type="text"
                  name="merchantName"
                  value={formData.merchantName}
                  onChange={handleChange}
                  className="w-full bg-purple-950 border border-purple-800 p-2 rounded text-white placeholder-purple-400"
                  required
                />
              </div>

              {/* <div>
              <label className="text-sm text-purple-300">Payment Type</label>
              <select
                name="paymentType"
                value={formData.paymentType}
                onChange={handleChange}
                className="w-full bg-purple-950 border border-purple-800 p-2 rounded text-white"
              >
                <option>UPI Address</option>
                <option>QR Code</option>
                <option>Bank Transfer</option>
              </select>
            </div> */}
            </div>

            <div>
              <label className="text-sm text-purple-300">UPI ID</label>
              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                className="w-full bg-purple-950 border border-purple-800 p-2 rounded text-white"
                required
              />
            </div>

            <div>
              <label className="text-sm text-purple-300">
                Transaction Amount (₹)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full bg-purple-950 border border-purple-800 p-2 rounded text-white"
                required
              />
            </div>

            {/* <div>
              <label className="text-sm text-purple-300">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-purple-950 border border-purple-800 p-2 rounded text-white"
                rows={2}
              />
            </div> */}

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm text-purple-300">Payment App</label>
                <input
                  type="text"
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  className="w-full bg-purple-950 border border-purple-800 p-2 rounded text-white"
                  required
                />
              </div>
              {/* <div>
                <label className="text-sm text-purple-300">UTR Number</label>
                <input
                  type="text"
                  name="utrNumber"
                  value={formData.utrNumber}
                  onChange={handleChange}
                  className="w-full bg-purple-950 border border-purple-800 p-2 rounded text-white"
                />
              </div> */}
            </div>

            <div>
              <label className="text-sm text-purple-300">Transaction ID</label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                className="w-full bg-purple-950 border border-purple-800 p-2 rounded text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded font-semibold"
            >
              Submit Payment Info
            </button>
          </form>

          {/* Right QR Display Section */}
          <div className="flex flex-col items-center justify-center bg-purple-950/30 border border-purple-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Scan QR to Pay
            </h2>
            <img
              src="/images/qrcode.jpg"
              alt="QR Code"
              className="w-60 h-60 rounded-lg border border-purple-700 mb-4"
            />
            <div className="w-full text-sm text-purple-200 space-y-2 mt-4">
              <div className="flex justify-between">
                <span>Payment For</span>
                <span>Custom UPI</span>
              </div>
              <div className="flex justify-between font-bold text-white border-t border-purple-700 pt-2">
                <span>Total</span>
                <span>₹{formData.amount || "0.00"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
