import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TailwindDemo from "./TailwindDemo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="h-16 w-16 animate-spin-slow"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-blue-500 mt-6">
        Vite + React + Tailwind
      </h1>
      <div className="p-6 bg-slate-800 rounded-lg shadow-lg mt-6">
        <button
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-300">
          Edit <code className="bg-gray-700 px-1 rounded">src/App.jsx</code> and
          save to test HMR
        </p>
      </div>
      <p className="mt-6 text-gray-400">
        Click on the Vite and React logos to learn more
      </p>

      <TailwindDemo />
    </>
  );
}

export default App;
