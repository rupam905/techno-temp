// src/components/TeamDetailsModal.js
import React from "react";

const TeamDetailsModal = ({ team, onClose }) => {
  if (!team) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
      <div className="bg-[#1a0d2e] rounded-2xl shadow-lg max-w-2xl w-full p-6 relative text-white border border-purple-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-violet-400"
        >
          &times;
        </button>

        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-md">
            <img
              src="/images/team-placeholder.png" // 👈 Replace with actual team image if available
              alt={team.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-3xl font-bold text-violet-300">{team.name}</h2>

          <p className="text-md text-gray-300">
            <strong className="text-violet-400">Team Leader:</strong> {team.leader}
          </p>

          <div className="text-md text-gray-300">
            <strong className="text-violet-400">Members:</strong>{" "}
            {team.members.join(", ")}
          </div>

          <div className="text-md text-gray-300 text-center">
            <strong className="text-violet-400">Topic:</strong> {team.topic}
          </div>

          <div className="mt-4 w-full">
            <iframe
              className="w-full aspect-video rounded-lg border border-purple-700 shadow-md"
              src={team.video}
              title={`${team.name} Video`}
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsModal;
