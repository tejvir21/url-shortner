import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { decryptData } from "./helpers/secure";
import logo from "../assets/tinywrap.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  let user = null;
  try {
    user = decryptData(localStorage.getItem("user"));
  } catch (e) {
    // navigate("/login")
  }
  return (
    <nav className="bg-blue-600 text-white px-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        <img src={logo} alt="TinyWrap" className="h-25 w-30 inline-block" />
      </Link>
      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-4 items-center">
        <Link to="/home" className="hover:underline">
          Home
        </Link>
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
        <Link to="/analytics" className="hover:underline">
          Analytics
        </Link>
        {user === null ? (
          <Link
            to="/login"
            className="hover:underline bg-cyan-500 p-2 px-3 font-bold rounded-4xl"
            type="button"
          >
            SignIn
          </Link>
        ) : (
          <Link
            to="/logout"
            className="hover:underline bg-red-600 font-bold p-2 px-3 rounded-4xl"
            type="button"
          >
            LogOut
          </Link>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-600 text-center md:hidden flex flex-col space-y-2 p-4 z-50">
          <Link
            to="/home"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/analytics"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Analytics
          </Link>
          {user === null ? (
            <Link
              to="/login"
              className="hover:underline bg-cyan-500 p-2 px-3 font-bold rounded-4xl"
              onClick={() => setMenuOpen(false)}
            >
              SignIn
            </Link>
          ) : (
            <Link
              to="/logout"
              className="hover:underline bg-red-600 font-bold p-2 px-3 rounded-4xl"
              onClick={() => setMenuOpen(false)}
            >
              LogOut
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
