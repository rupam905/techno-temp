import { useState } from 'react';

export default function TailwindDemo() {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`mt-10 p-6 rounded-xl shadow-lg ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}`}>
      <h2 className="text-2xl font-bold mb-4">Tailwind CSS Demo</h2>
      
      <div className="flex flex-col gap-4">
        <div className="p-4 mb-4 bg-yellow-100 text-yellow-800 rounded-lg hidden xs:block">
          <p className="font-medium">This message only appears on screens 480px and larger (xs breakpoint)</p>
        </div>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 transition-colors">
            <h3 className="font-medium">Card 1</h3>
            <p className="text-sm opacity-80">Hover me</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow hover:scale-105 transition-transform">
            <h3 className="font-medium">Card 2</h3>
            <p className="text-sm opacity-80">Hover me</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg shadow hover:rotate-1 transition-transform">
            <h3 className="font-medium">Card 3</h3>
            <p className="text-sm opacity-80">Hover me</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <button 
            onClick={toggleTheme}
            className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark focus:ring-2 focus:ring-brand-light focus:ring-offset-2 transition-all"
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
          
          <div className="flex gap-2">
            <span className="w-4 h-4 bg-red-500 rounded-full"></span>
            <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
            <span className="w-4 h-4 bg-green-500 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
