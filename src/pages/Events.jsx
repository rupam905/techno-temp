import React from 'react';
import StarBorder from "../components/ui/StarBorder";


const Events = () => {
  return (
    <>
      <h1 className='text-center font-bold pt-30'>AI UNLEASHED</h1>
      <p className='text-center text-gray-400 mt-20 mb-12 max-w-xl mx-auto'>
        AI UNLEASHED is a dynamic event showcasing cutting-edge innovations in Artificial Intelligence through engaging workshops, demos, and tech talks.
        Dive into the future of AI with hands-on experiences, expert insights, and real-world applications.
      </p>

      {/* 🌟 Animated Register Now Button */}
      <div className="flex justify-center mt-[50px]">
        <StarBorder color="#e0e3e9ff" speed="0s" thickness={2}>
          REGISTER NOW
        </StarBorder>
      </div>

      {/* Header and Year Filter */}
      <div className='flex justify-between h-[30px] w-full mt-[50px] mb-[60px]'>
        <h1 className='font-poppins ml-10'>Other Events</h1>
        <select
          name="year"
          id="year"
          className="mt-5 mr-15 w-30 h-9 px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 hover:border-blue-400 transition duration-300"
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      {/* Event Cards */}
      <section>
        <div className='flex flex-wrap gap-[25px] justify-center w-full'>
          {/* Card 1 */}
          <div className="relative group bg-white rounded-[10px] shadow-md w-[530px] h-[350px] p-[20px] overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
            <img src="https://via.placeholder.com/300x150" alt="Image 1" className="w-full h-auto rounded-[8px]" />
            <h3 className="mt-[150px] text-[20px] font-semibold text-black z-10 relative">IOT EXPOSITION</h3>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 relative">
              <p className="text-[14px] text-[#555555] mt-2">
                This is a description for the first card. You can include course or product details here.
              </p>
              <button className="mt-[10px] px-[15px] py-[10px] bg-[#007BFF] text-white rounded-[20px] cursor-pointer transition-all duration-300 hover:bg-[white] hover:text-blue-400">
                Learn More
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative group bg-white rounded-[10px] shadow-md w-[530px] h-[350px] p-[20px] overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
            <img src="https://via.placeholder.com/300x150" alt="Image 1" className="w-full h-auto rounded-[8px]" />
            <h3 className="mt-[150px] text-[20px] font-semibold text-black z-10 relative">AI UNLEASHED</h3>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 relative">
              <p className="text-[14px] text-[#555555] mt-2">
                This is a description for the first card. You can include course or product details here.
              </p>
              <button className="mt-[10px] px-[15px] py-[10px] bg-[#007BFF] text-white rounded-[20px] cursor-pointer transition-all duration-300 hover:bg-[white] hover:text-blue-400">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
