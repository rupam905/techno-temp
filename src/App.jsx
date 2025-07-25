import Head from "./components/Head";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import TeamRegistration from "./pages/TeamReg";
import UserDashboard from "./pages/UserDashboard";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen">
          <Head />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/team-registration" element={<TeamRegistration/>} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
