import React, { useEffect, useState } from "react";
import "./AboutSection.css";

const images = ["team3.jpg", "salman.jpg", "Ranbir.jpg", "deepika.jpeg", "/img5.jpg"];

export default function AboutSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="intro-text">
        <div className="team-header">
        <h1 className="team-subheading shine-text">ABOUT US</h1>
        
      </div>
        
      </div>

      <div className="about-content">
        <div className="image-grid">
          {images.map((src, index) => (
            <div
              key={index}
              className={`image-slide ${index === currentImage ? "active" : ""}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>

        <div className="about-text">
          <h2>Technothon</h2>
          <p>
            Technothon, a technical club at Techno India University founded in 2019, nurtures
            innovative ideas using AI, Python, IoT, and emerging technologies to build
            real‑world solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
