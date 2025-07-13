import React from 'react';

 const Events = () => {
  return (
    <>
    <h1 className='text-center mt-[40px]'>AI UNLEASHED</h1>
    <p className='text-center mt-[170px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos quae autem ipsam magni veniam eum?Lorem ipsum dolor sit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, laudantium?Lorem ipsum dolor sit amet.</p>
    <div className="flex justify-center">
  <div className="flex justify-center">
  <button className="mt-[50px] px-[20px] py-[10px] rounded-[20px] cursor-pointer text-blue-600 border border-blue-300 transition-all duration-300 hover:bg-blue-300 hover:text-white hover:scale-105 hover:shadow-[0_0_15px_#93c5fd ">
    REGISTER NOW
  </button>
</div>
</div>
<div className='flex justify-between h-[30px] w-full mt-[30px] mb-[30px]'>
<h1 className='font-poppins'>Other Events</h1>
<select name="year" id="year"
  class="mt-4 w-30 h-9 px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 hover:border-blue-400 transition duration-300">
  <option value="2025">2025</option>
  <option value="2024">2024</option>
  <option value="2023">2023</option>
</select>

  </div>

<section>
  <div className='flex flex-wrap gap-[25px] justify-center w-full'>
 <div className="relative group bg-white rounded-[10px] shadow-md w-[530px] h-[350px] p-[20px] overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
  <img src="https://via.placeholder.com/300x150" alt="Image 1" className="w-full h-auto rounded-[8px]" />
  
  {/* Always visible heading */}
  <h3 className="mt-[150px] text-[20px] font-semibold text-black z-10 relative">IOT EXPOSITION</h3>

  {/* Hidden paragraph and button */}
  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 relative">
    <p className="text-[14px] text-[#555555] mt-2">
      This is a description for the first card. You can include course or product details here.
    </p>
    <button className="mt-[10px] px-[15px] py-[10px] bg-[#007BFF] text-white rounded-[20px] cursor-pointer transition-all duration-300 hover:bg-[white] hover:text-blue-400">
      Learn More
    </button>
  </div>
</div>



  <div className="relative group bg-white rounded-[10px] shadow-md w-[530px] h-[350px] p-[20px] overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
  <img src="https://via.placeholder.com/300x150" alt="Image 1" className="w-full h-auto rounded-[8px]" />
  
  {/* Always visible heading */}
  <h3 className="mt-[150px] text-[20px] font-semibold text-black z-10 relative">AI UNLEASHED</h3>

  {/* Hidden paragraph and button */}
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
