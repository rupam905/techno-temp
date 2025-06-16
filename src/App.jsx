import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors">
        Let's strat building guys
      </h1>
    </>
  );
}

export default App;
