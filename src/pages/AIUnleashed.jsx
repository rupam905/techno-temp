import React, { useEffect, useState } from "react";
import TeamDetailsModal from "../components/TeamDetailsModal";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AIUnleashed = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [jury, setJury] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [winners, setWinners] = useState([]);
  const [teams, setTeams] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const [juryRes, sponsorRes, winnerRes, teamRes] = await Promise.all([
          axios.get("/api/aiunleashed/jury"),
          axios.get("/api/aiunleashed/sponsors"),
          axios.get("/api/aiunleashed/winners"),
          axios.get("/api/aiunleashed/teams"),
        ]);

        setJury(juryRes.data);
        setSponsors(sponsorRes.data);
        setWinners(winnerRes.data);
        setTeams(teamRes.data);
      } catch (error) {
        console.error("Failed to load AI Unleashed data", error);
      }
    };

    fetchEventData();
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

  return (
    <div className="bg-[#0f011a] text-white min-h-screen p-6 pt-28">
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
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-white hover:text-violet-400"
          >
            Log out <span aria-hidden="true">→</span>
          </button>
        </div>
      </nav>

      {/* Background Header */}
      <section
        className="relative h-[60vh] w-full mb-12 rounded-2xl overflow-hidden shadow-xl"
        style={{
          backgroundImage: `url('/images/bg2.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Welcome to AI Unleashed
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-md">
            Explore groundbreaking projects pushing the limits of Artificial Intelligence.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">AI Unleashed</h1>
        <p className="text-lg text-gray-300">
          AI Unleashed is a premier event spotlighting the latest in Artificial Intelligence.
          From autonomous systems to machine learning breakthroughs, the event showcases
          cutting-edge innovations created by visionary teams and researchers.
        </p>
      </section>

      {/* Jury */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-violet-400 text-center mb-8">
          Jury Members
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {jury.map(j => (
            <div key={j} className="bg-white/10 p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 backdrop-blur">
              <h3 className="text-xl font-semibold">{j}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsors */}
      <section className="mb-20 text-center">
        <h2 className="text-3xl font-bold text-violet-400 text-center mb-8">
          Sponsors
        </h2>
        <p className="mb-6 text-gray-400 uppercase tracking-wide text-sm">Presented by OpenAI</p>
        <div className="flex justify-center flex-wrap gap-10">
          {sponsors.map((s) => (
            <img
              key={s.name}
              src={s.logo}
              alt={s.name}
              className="h-20 w-auto rounded-lg object-contain bg-white p-2 shadow-lg border border-white/20"
            />
          ))}
        </div>
      </section>

      {/* Winners */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-violet-400 text-center mb-8">
          Winners
        </h2>
        <div className="flex flex-wrap justify-center gap-12">
          {winners.map((w) => (
            <div
              key={w.name}
              onClick={() => setSelectedWinner(w)}
              className="flex flex-col items-center bg-white/10 p-4 rounded-xl backdrop-blur-md hover:scale-105 transition cursor-pointer"
            >
              <img
                src={w.logo}
                alt={w.name}
                className="h-24 w-24 rounded-full object-cover border-4 border-violet-500 shadow"
              />
              <span className="mt-3 text-md font-medium">{w.name}</span>
              {w.awardType && (
                <span className="text-sm text-yellow-400 font-semibold mt-1">{w.awardType}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Participating Teams */}
      <section className="mb-28">
        <h2 className="text-3xl font-bold text-violet-400 text-center mb-8">
          Participating Teams
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {teams.map(team => (
            <div
              key={team.name}
              onClick={() => setSelectedTeam(team)}
              className="cursor-pointer text-center hover:scale-105 transition"
            >
              <img
                src={team.logo}
                alt={team.name}
                className="h-24 w-24 rounded-full object-cover border-2 border-white shadow"
              />
              <span className="block mt-2 text-md font-semibold">{team.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Winner/Team */}
      <TeamDetailsModal
        team={selectedTeam || selectedWinner}
        onClose={() => {
          setSelectedTeam(null);
          setSelectedWinner(null);
        }}
      />
    </div>
  );
};

export default AIUnleashed;
