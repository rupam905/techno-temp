import React, { useState } from "react";
import ProfileCard from "./ProfileCard.jsx";
import "./TeamSection.css";

const teamMembers = [
  {
    role: "frontend",
    avatarUrl: "team3.jpg",
    miniAvatarUrl: "team3.jpg",
    name: " MD YAHIYA",
    title: "Frontend Developer",
    handle: "YAHIYA",
    status: "Online",
    contactText: "Contact Me"
  },
  {
    role: "backend",
    avatarUrl: "/images/avatar2.jpg",
    miniAvatarUrl: "/images/avatar2-mini.jpg",
    name: "Anirban Roy",
    title: "Project Manager",
    handle: "anirbanPM",
    status: "Offline",
    contactText: "Message Anirban"
  },
  {
    role: "backend",
    avatarUrl: "/images/avatar2.jpg",
    miniAvatarUrl: "/images/avatar2-mini.jpg",
    name: "Anirban Roy",
    title: "Project Manager",
    handle: "anirbanPM",
    status: "Offline",
    contactText: "Message Anirban"
  },
  {
    role: "backend",
    avatarUrl: "/images/avatar2.jpg",
    miniAvatarUrl: "/images/avatar2-mini.jpg",
    name: "Anirban Roy",
    title: "Project Manager",
    handle: "anirbanPM",
    status: "Offline",
    contactText: "Message Anirban"
  },
  {
    role: "backend",
    avatarUrl: "/images/avatar2.jpg",
    miniAvatarUrl: "/images/avatar2-mini.jpg",
    name: "Anirban Roy",
    title: "Project Manager",
    handle: "anirbanPM",
    status: "Offline",
    contactText: "Message Anirban"
  },
  
  
  
  // Add more team members as needed...
];

export default function TeamSection() {
  const [filter, setFilter] = useState("all");

  const filteredMembers = teamMembers.filter(member =>
    filter === "all" ? true : member.role === filter
  );

  return (
    <section id="team" className="team-section">
      <h2>Meet the Team</h2>

      <div className="team-header">
        <h3 className="team-subheading shine-text">Our Developers</h3>
      </div>

      <div className="team-filter left-align">
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          aria-label="Filter team members"
        >
          <option value="all">All</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>

      <div className="team-grid">
        {filteredMembers.map(member => (
          <ProfileCard
            key={member.handle}
            {...member}
            showUserInfo
            enableTilt
            onContactClick={() => console.log(`Contact ${member.name}`)}
          />
        ))}
      </div>
    </section>
  );
}
