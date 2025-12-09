import React, { useState, useEffect, useRef } from "react";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronRight, ArrowRight, LogOut, User, Mail } from "lucide-react";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const dropdownRef = useRef(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setShowProfileDropdown(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const profileImg =
    user?.photoURL ||
    "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Backdrop for mobile menu */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setShowMenu(false)}
        />
      )}

      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg py-3" : "bg-white py-3"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button - Left Side */}
            <div className="flex justify-center items-center">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                aria-label="Toggle Menu"
              >
                {showMenu ? (
                  <X size={24} className="text-gray-700" />
                ) : (
                  <Menu size={24} className="text-gray-700" />
                )}
              </button>

              {/* Logo and Title - Center */}
              <NavLink
                to="/"
                className="flex gap-3 group cursor-pointer mx-auto md:mx-0"
                onClick={() => setShowMenu(false)}
              >
                <img
                  className="w-10 md:w-12 transition-transform group-hover:scale-105 hidden sm:block"
                  src={assets.logo4}
                  alt="Abroad Aura Logo"
                />
                <div className="leading-tight">
                  <p className="text-xl md:text-2xl text-[#0441b4]">
                    Abroad Aura
                  </p>
                  <p className="text-xs text-gray-600 hidden sm:block">
                    Shaping futures beyond borders
                  </p>
                </div>
              </NavLink>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `relative px-1 py-2 text-gray-700 hover:text-[#0441b4] transition-all duration-300 group ${
                          isActive
                            ? "text-[#0441b4] font-semibold"
                            : "hover:font-medium"
                        }`
                      }
                    >
                      {link.name}
                      <span
                        className={`absolute left-0 bottom-0 w-0 h-0.5 bg-[#0441b4] rounded-full transition-all duration-300 group-hover:w-full ${
                          location.pathname === link.path ? "w-full" : ""
                        }`}
                      />
                    </NavLink>
                  </li>
                ))}
              </ul>

              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    onMouseEnter={() => setShowProfileDropdown(true)}
                    className="flex items-center gap-3 cursor-pointer select-none group relative"
                  >
                    <div className="relative">
                      <img
                        src={profileImg}
                        alt="User profile"
                        className="w-8 h-8 lg:w-9 lg:h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-purple-200 transition-all"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
                    </div>
                  </div>

                  {/* Profile Dropdown */}
                  {showProfileDropdown && (
                    <div
                      className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                      onMouseLeave={() => setShowProfileDropdown(false)}
                    >
                      {/* User Info Section */}
                      <div className="px-4 py-3  border-gray-100">
                        <div className="flex items-center flex-col gap-3">
                          <img
                            src={profileImg}
                            alt="User profile"
                            className="w-15 h-15 rounded-full object-cover"
                          />
                          <p className="font-semibold uppercase text-gray-900 truncate">
                            {user.displayName || "User"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email || "No email provided"}
                          </p>
                        </div>
                      </div>

                      {/* Menu Items */}

                      {/* Sign Out Button */}
                      <div className="pt-2 border-t border-gray-100 px-2">
                        <button
                          onClick={handleSignOut}
                          className="w-full text-sm flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-0.5"
                        >
                          <LogOut size={18} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2.5 bg-linear-to-r from-[#0441b4] to-[#0a63e9] text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight size={18} />
                </button>
              )}
            </div>

            {/* Mobile Profile/Get Started Button - Right Side */}
            {user ? (
              <div className="md:hidden flex items-center gap-3">
                <div
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-3 cursor-pointer select-none group relative"
                >
                  <div className="relative">
                    <img
                      src={profileImg}
                      alt="User profile"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-purple-200 transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
                  </div>
                </div>

                {/* Mobile Dropdown */}
                {showProfileDropdown && (
                  <>
                    <div
                      className="fixed inset-0  z-40"
                      onClick={() => setShowProfileDropdown(false)}
                    />
                    <div className="fixed top-16 right-4 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 pointer-events-auto">
                      {/* User Info Section */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex flex-col items-center gap-3">
                          <img
                            src={profileImg}
                            alt="User profile"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <p className="font-semibold uppercase text-gray-900 truncate">
                            {user.displayName || "User"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email || "No email provided"}
                          </p>
                        </div>
                      </div>

                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="md:hidden px-4 py-2 bg-linear-to-r from-[#0441b4] to-[#0a63e9] text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 active:scale-95 flex items-center gap-1 text-sm"
              >
                <span>Get Start</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-80 max-w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
            showMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img className="w-10" src={assets.logo4} alt="Abroad Aura Logo" />
              <div>
                <p className="font-bold text-lg text-[#0441b4]">Abroad Aura</p>
                <p className="text-xs text-gray-500">Beyond borders</p>
              </div>
            </div>
            <button
              onClick={() => setShowMenu(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="p-6">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 text-[#0441b4] font-semibold border-l-4 border-[#0441b4]"
                          : "hover:bg-gray-50 text-gray-700"
                      }`
                    }
                  >
                    <span className="text-lg">{link.name}</span>
                    <ChevronRight
                      size={20}
                      className={
                        location.pathname === link.path
                          ? "text-[#0441b4]"
                          : "text-gray-400"
                      }
                    />
                  </NavLink>
                </li>
              ))}
            </ul>
            
            {user && <div className="pt-2 border-t border-gray-100 px-2">
              <button
                onClick={handleSignOut}
                className="w-full text-sm flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r  text-gray-700 rounded-lg hover:shadow-lg hover:shadow-gray-500/30 transition-all duration-300"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>}

            {/* Footer Info */}
            <div className="mt-8 px-4 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600 text-center">
                Need help? <br />
                <a
                  href="mailto:info@abroadaura.com"
                  className="text-[#0441b4] font-medium hover:underline"
                >
                  info@abroadaura.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;