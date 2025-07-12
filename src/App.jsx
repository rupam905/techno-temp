import "./App.css";
import Head from "./components/Head";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <div className="min-h-screen">
        <Head />
        <Home />
        <Footer />
      </div>
    </>
  );
};

export default App;
