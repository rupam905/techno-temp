import React, { useState, useEffect, useRef } from "react";
import Cursor from "./Cursor";

const HeroSection = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2, // 20% of hero visible
      }
    );

    if (heroRef.current) observer.observe(heroRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  return (
    <div className="relative">
      {/* Always render Cursor, but control its visibility */}
      <Cursor isVisible={isHeroVisible} />

      <section
        ref={heroRef}
        className={`min-h-[80vh] flex flex-col items-center justify-center text-center transition-opacity duration-1000 ease-in ${
          isHeroVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src="/images/technothon.png"
          alt="Technothon Main Logo"
          className="w-72 h-auto sm:w-96"
        />
      </section>
    </div>
  );
};

export default HeroSection;