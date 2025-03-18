import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Analytics from "./pages/Analytics";
import RedirectPage from "./pages/RedirectPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Intro from "./pages/Intro";

function App() {
  return (
    <Router>
      <Header />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/:shortId" element={<RedirectPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
