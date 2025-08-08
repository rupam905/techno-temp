import React from 'react';
import { Link } from "react-router-dom";

const event = [
  {
    id: 1,
    title: "AI UNLEASHED",
    description:
      "Landing page for SeaPhantom, an NFT project focusing on innovative and sustainable technologies. Exp...",
    image: "/images/image 34.png",
    route: "/events/ai-unleashed", // 👈 internal route
  },
  {
    id: 2,
    title: "IOT Exposition",
    description:
      "Landing page for SeaPhantom, an NFT project focusing on innovative and sustainable technologies. Exp...",
    image: "/images/image 35.png",
    route: "/events/iot-exposition", // 👈 internal route
  },
];

const Events = () => {
  return (
    <>
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
          <Link to="/login" className="text-sm font-medium text-white hover:text-violet-400">
            Log in <span aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 pt-36 min-h-screen bg-gradient-to-b from-[#0f011a] to-[#1b0b2e] text-white">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-4xl font-bold mb-4 text-center text-white">
            Featured <span className="text-violet-400">Events</span>
          </h2>
          <p className="text-center mb-12 max-w-2xl mx-auto text-gray-400">
            A DYNAMIC PLATFORM FOR SHOWCASING STUDENT INNOVATIONS IN AI AND IOT.
            ORGANIZED BY BATCH AND BACKED BY TECHNOTHON.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {event.map((event, key) => (
              <div
                key={key}
                className="group rounded-xl bg-[#1a1029] ring-1 ring-white/10 shadow-md overflow-hidden transform transition duration-300 hover:shadow-[0_0_25px_#a855f7] hover:scale-[1.02]"
              >
                <Link to={event.route}>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-400">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
