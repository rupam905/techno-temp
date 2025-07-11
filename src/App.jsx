import "./App.css";
import Head from "./components/Head";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      {/* <h1 className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors">
        Let's strat building guys
      </h1> */}
      <div className="min-h-screen">
        <Head />
        <Home />
        <Footer />
      </div>
    </>
  );
};

export default App;
