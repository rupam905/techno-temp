/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/home" },
    { name: "Events", href: "/events" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const [user, setUser] = useState(null);
  const [attendance, setAttendance] = useState({ present: 0, total: 0 });
  const [events, setEvents] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const profileRef = useRef(null);
  const statsRef = useRef(null);
  const achievementsRef = useRef(null);
  const certificatesRef = useRef(null);

  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isAchievementsVisible, setIsAchievementsVisible] = useState(false);
  const [isCertificatesVisible, setIsCertificatesVisible] = useState(false);
  const [pastTeams, setPastTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          userRes,
          attRes,
          eventRes,
          achRes,
          certRes,
          pastTeamsRes,
          currentTeamRes,
        ] = await Promise.all([
          axios.get("/api/user/me", { withCredentials: true }),
          axios.get("/api/user/attendance", { withCredentials: true }),
          axios.get("/api/user/events", { withCredentials: true }),
          axios.get("/api/user/achievements", { withCredentials: true }),
          axios.get("/api/user/certificates", { withCredentials: true }),
          axios.get("/api/user/past-teams", { withCredentials: true }),
          axios.get("/api/user/current-team", { withCredentials: true }),
        ]);

        setUser(userRes.data);
        setAttendance(attRes.data || { present: 0, total: 0 });
        setEvents(eventRes.data?.events || []);
        setAchievements(achRes.data?.achievements || []);
        setCertificates(certRes.data?.certificates || []);
        setPastTeams(pastTeamsRes.data?.teams || []);
        setCurrentTeam(currentTeamRes.data?.team || null);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
        navigate("/login");
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const attendanceText = `${attendance.present}/${attendance.total}`;

  useEffect(() => {
    const createObserver = (ref, setVisible) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.3 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    };

    createObserver(profileRef, setIsProfileVisible);
    createObserver(statsRef, setIsStatsVisible);
    createObserver(achievementsRef, setIsAchievementsVisible);
    createObserver(certificatesRef, setIsCertificatesVisible);
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
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get("/api/teams/user-teams", {
          withCredentials: true,
        });
        setPastTeams(res.data.pastTeams);
        setCurrentTeam(res.data.currentTeam);
      } catch (err) {
        console.error("Error fetching team data", err);
      }
    };
    fetchTeams();
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-[4px]"
        style={{
          backgroundImage: "url('/images/bg3.png')", // FIXED: correct file path
        }}
      ></div>

      {/* Optional Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 lg:px-8 fixed w-full top-0 z-50 bg-transparent">
        {/* Left - Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center">
            <img
              src="/images/technothon.png"
              alt="Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Middle - Blurred Links Section */}
        <div className="hidden lg:flex gap-x-12 px-6 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/10 shadow-sm">
          <Link
            to="/home"
            className="text-sm font-medium text-white hover:text-violet-400"
          >
            Home
          </Link>
          <Link
            to="/events"
            className="text-sm font-medium text-white hover:text-violet-400"
          >
            Events
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-white hover:text-violet-400"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-white hover:text-violet-400"
          >
            Contact
          </Link>
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
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Profile */}
        <div
          ref={profileRef}
          className={`flex justify-between items-center mb-12 opacity-0 ${
            isProfileVisible ? "animate-slide-in-top" : ""
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-pink-400 to-purple-200 bg-clip-text text-transparent">
                {user?.name || "User Name"}
              </h1>
              <p className="text-gray-400">
                {user?.email || "Email not available"}
              </p>
            </div>
          </div>
          <button className="animated-gradient animated-gradient-hover px-6 py-2 rounded-full text-sm font-semibold text-white transition-transform duration-500 ease-out hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]">
            Edit Profile
          </button>
        </div>

        {/* Attendance & Events */}
        <div
          ref={statsRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 opacity-0 ${
            isStatsVisible ? "animate-popout" : ""
          }`}
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2e014c] to-[#440658] backdrop-blur-lg border border-purple-700/30 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all">
            <h4 className="uppercase text-purple-300 text-sm mb-3">
              Attendance
            </h4>
            <div className="text-4xl font-bold text-purple-400">
              {attendanceText}
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2e014c] to-[#440658] backdrop-blur-lg border border-purple-700/30 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all">
            <h4 className="uppercase text-purple-300 text-sm mb-3">Events</h4>
            {events.length === 0 ? (
              <p className="text-gray-400 text-sm">No events joined yet.</p>
            ) : (
              <ul className="space-y-2 text-gray-300">
                {events.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Achievements */}
        <div
          ref={achievementsRef}
          className={`p-6 rounded-2xl bg-gradient-to-br from-[#2e014c] to-[#440658] backdrop-blur-lg border border-purple-700/30 mb-12 opacity-0 ${
            isAchievementsVisible ? "animate-slide-in-top" : ""
          }`}
        >
          <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-300 via-pink-400 to-purple-200 bg-clip-text text-transparent">
            Past Achievements 🏆
          </h4>
          {achievements.length === 0 ? (
            <p className="text-gray-400 text-sm">No achievements yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {achievements.map((ach, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-lg text-white flex flex-col items-center"
                >
                  {ach.image && (
                    <img
                      src={ach.image}
                      alt={ach.title}
                      className="w-24 h-24 object-cover rounded-md mb-2"
                    />
                  )}
                  <p className="font-semibold">{ach.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Certificates & Share */}
        <div
          ref={certificatesRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 opacity-0 ${
            isCertificatesVisible ? "animate-slide-in-bottom" : ""
          }`}
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2e014c] to-[#440658] backdrop-blur-lg border border-purple-700/30">
            <h4 className="text-lg font-semibold mb-3 bg-gradient-to-r from-purple-300 via-pink-400 to-purple-200 bg-clip-text text-transparent">
              Certificates 📜
            </h4>
            {certificates.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No certificates uploaded yet.
              </p>
            ) : (
              <ul className="space-y-4 text-gray-300 text-sm">
                {certificates.map((cert, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    {cert.image && (
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                    )}
                    <span>
                      {cert.name} - {cert.issuer}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2e014c] to-[#440658] backdrop-blur-lg border border-purple-700/30 flex flex-col justify-between">
            <h4 className="text-lg font-semibold mb-3 bg-gradient-to-r from-purple-300 via-pink-400 to-purple-200 bg-clip-text text-transparent">
              Share Your Profile
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Let others see your achievements!
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Profile link copied to clipboard!");
              }}
              className="animated-gradient animated-gradient-hover px-6 py-2 rounded-full text-sm font-semibold text-white transition-transform duration-500 ease-out hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]"
            >
              Share Profile
            </button>
          </div>
        </div>
      </div>
      {/* Past and Current Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {/* Past Teams */}
        <div className="rounded-2xl p-6 min-h-[160px] bg-purple-900 shadow-md text-white flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-semibold mb-2">Past Teams 👥</h4>
            {Array.isArray(pastTeams) && pastTeams.length === 0 ? (
              <p className="text-gray-300 text-sm">No past teams found.</p>
            ) : (
              <ul className="space-y-1 text-sm text-purple-100 max-h-[100px] overflow-y-auto pr-1">
                {pastTeams?.map((team, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span>{team.name}</span>
                    <Link
                      to={`/team/${team.id}`}
                      className="text-purple-300 hover:underline text-xs"
                    >
                      View →
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Current Team */}
        <div className="rounded-2xl p-6 min-h-[160px] bg-purple-900 shadow-md text-white flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-semibold mb-2">Current Team 🏅</h4>
            {currentTeam ? (
              <>
                <p className="text-sm text-gray-300 mb-2">
                  You're part of <strong>{currentTeam.name}</strong>
                </p>
                <Link
                  to={`/team/${currentTeam.id}`}
                  className="inline-block w-fit px-4 py-1 mt-2 bg-purple-700 text-white rounded-full text-xs font-medium hover:bg-purple-800 transition"
                >
                  View Team →
                </Link>
              </>
            ) : (
              <p className="text-gray-300 text-sm">
                You are not part of any current team.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
