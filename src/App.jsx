import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import TeamRegistration from "./pages/TeamReg";
import CurrentTeam from "./pages/CurrentTeam";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import PaymentPage from "./pages/PaymentPage";
import AboutUs from "./pages/About";
import UserDashboard from "./pages/UserDashboard";
import Edit from "./pages/Edit";
import AdminLogin from "./pages/AdminLogin";
import AIUnleashed from "./pages/AIUnleashed";
import IOTExposition from "./pages/IOTExposition";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/team-registration" element={<TeamRegistration />} />
          <Route path="/curteam" element={<CurrentTeam />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/admin-login" element={<AdminLogin />} />
           <Route path="/events/ai-unleashed" element={<AIUnleashed />} />
        <Route path="/events/iot-exposition" element={<IOTExposition />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
