import React, { useState, useEffect, useRef } from "react";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronRight, ArrowRight, LogOut, ChevronDown, Bell } from "lucide-react";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNotification } from "../context/NotificationContext";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const dropdownRef = useRef(null);
  const moreDropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);


const {
  notifications,
  unreadCount,
  loading,
  markAllAsRead,
  fetchNotifications
} = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setShowProfileDropdown(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setShowMoreDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
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
    { name: "More" },
  ];


  // More dropdown items
  const moreItems = [
    { name: "Tools", path: "/tools" },
    { name: "Blog", path: "/blog" },
    { name: "Courses", path: "/courses" },
    { name: "Resources", path: "/resources" },
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
        <div className="md:mx-20 mx-3 bg-white">
          <div className="flex items-center justify-between ">
            {/* Mobile Menu Button - Left Side */}
            <div className="flex justify-center items-center ">
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
                  src="https://res.cloudinary.com/dvrfowc4a/image/upload/v1769857410/logo4_ew3okh.png"
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
            <div className="flex items-center gap-2 md:gap-6">
              <ul className="hidden md:flex items-center gap-5">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {link.name === "More" ? (
                      <div className="relative" ref={moreDropdownRef}>
                        <button
                          onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                          onMouseEnter={() => {
                            setShowMoreDropdown(true);
                            setShowProfileDropdown(false);
                          }}
                          className={`relative px-1 py-2 text-gray-700 hover:text-[#0441b4] transition-all duration-300 group flex items-center gap-1 ${
                            showMoreDropdown
                              ? "text-[#0441b4] font-semibold"
                              : "hover:font-medium"
                          }`}
                        >
                          {link.name}
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${
                              showMoreDropdown ? "rotate-180" : ""
                            }`}
                          />
                          {/* <span
                            className={`absolute left-0 bottom-0 w-0 h-0.5 bg-[#0441b4] rounded-full transition-all duration-300 group-hover:w-full ${
                              showMoreDropdown ? "w-full" : ""
                            }`}
                          /> */}
                        </button>

                        {/* More Dropdown Menu */}
                        {showMoreDropdown && (
                          <div
                            className="absolute -right-5 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                            onMouseLeave={() => setShowMoreDropdown(false)}
                          >
                            {moreItems.map((item) => (
                              <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={() => setShowMoreDropdown(false)}
                                className={({ isActive }) =>
                                  `flex items-center px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-[#0441b4] transition-colors duration-200 ${
                                    isActive
                                      ? "bg-blue-50 text-[#0441b4] font-medium"
                                      : ""
                                  }`
                                }
                              >
                                <ChevronRight size={16} className="mr-2" />
                                <span>{item.name}</span>
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
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
                        {/* <span
                          className={`absolute left-0 bottom-0 w-0 h-0.5 bg-[#0441b4] rounded-full transition-all duration-300 group-hover:w-full ${
                            location.pathname === link.path ? "w-full" : ""
                          }`}
                        /> */}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>

              <NavLink
                to={"/ai"}
                className="flex items-center justify-center gap-1 text-[#0441b4] hover:scale-102"
              >
                <img
                  src="https://res.cloudinary.com/dvrfowc4a/image/upload/v1769857410/sparkles_i1azok.png"
                  className="w-[30px] md:w-[25px]  rounded-lg"
                  alt=""
                />
                <p className="relative hidden md:block">
                  Radiator{" "}
                  <span className="absolute -right-3 text-[11px]">AI</span>
                </p>
              </NavLink>

              {user ? (
                <>
                  {/* Notification Bell */}
                  <div className="relative" ref={notificationRef}>
                    <button
                      onClick={() => {setShowNotifications(!showNotifications);  fetchNotifications();}}
                      className={`relative p-1 md:p-2.5 rounded-lg hover:bg-gray-100 ${showNotifications && "bg-gray-100"} transition group`}
                    >
                      <Bell
                        size={22}
                        className={`text-gray-600 rounded-lg hover:bg-gray-100 group-hover:text-[#0441b4] ${showNotifications && "text-[#0441b4]"} transition `}
                      />

                      {/* Unread Badge */}
                      {unreadCount > 0 && (
                      <span className="absolute top-0.5 left-4 md:top-1.5 md:left-5.5 w-2.5 h-2.5 px-1 flex items-center justify-center bg-red-500 text-white text-xs font-semibold rounded-full ring-2 ring-white"></span>
                      )}
                    </button>

                    {/* Notification Popup */}
                    {showNotifications && (
                      <div className="absolute md:right-0 -right-7 top-full mt-2 w-60 sm:w-90 bg-white shadow-xl rounded-xl border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">
                            Notifications
                          </h3>
                          {unreadCount > 0 && (
                            <span className="text-xs bg-blue-100 text-[#0441b4] px-2 py-1 rounded-full">
                              {unreadCount} new
                            </span>
                          )}
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <div className="p-4 text-center">
                              <div className="w-8 h-12 mx-auto mb-3 flex items-center justify-center bg-gray-100 rounded-full">
                                <Bell size={24} className="text-gray-400" />
                              </div>
                              <p className="text-gray-500 text-sm">
                                No notifications yet
                              </p>
                              <p className="text-gray-400 text-xs mt-1">
                                We'll notify you when something arrives
                              </p>
                            </div>
                          ) : (
                            !loading &&
                            notifications.map((n) => (
                              <div
                                key={n._id}
                                className={`p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer `}
                                onClick={() => {
                                  // Handle notification click
                                  setShowNotifications(false);
                                }}
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className={`w-2 h-2 mt-2 rounded-full ${!n.isRead ? "bg-blue-500" : "bg-gray-300"}`}
                                  />
                                  <div className="flex-1">
                                    <p
                                      className={`font-medium ${!n.isRead ? "text-gray-800" : "text-gray-400"} text-sm`}
                                    >
                                      {n.title}
                                    </p>
                                    <p
                                      className={` text-xs mt-1  ${!n.isRead ? "text-gray-800" : "text-gray-400"}`}
                                    >
                                      {n.message}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}

                          {loading && (
                            <div className="bg-white p-4 rounded-2xl flex items-center justify-center gap-4">
                              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                              <div>
                                <p className="text-sm text-gray-600">
                                  Please wait...
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-gray-100">
                          <button
                            onClick={() => {
                              markAllAsRead();
                              setShowNotifications(false);
                            }}
                            className="w-full text-center text-sm text-blue-700 hover:text-[#0441b4] font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            Mark all as read
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative" ref={dropdownRef}>
                    <div
                      onClick={() =>
                        setShowProfileDropdown(!showProfileDropdown)
                      }
                      onMouseEnter={() => {
                        setShowProfileDropdown(true);
                        setShowMoreDropdown(false);
                      }}
                      className="flex items-center md:gap-3 cursor-pointer select-none group relative"
                    >
                      <div className="relative">
                        <img
                          src={profileImg}
                          alt="User profile"
                          className="w-7 h-7 lg:w-9 lg:h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[#0441b4] transition-all"
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
                        <div className="px-4 py-2  border-gray-100">
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
                            className="w-full text-sm flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-0.5"
                          >
                            <LogOut size={16} />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm md:px-6 md:py-2.5 bg-linear-to-r from-[#0441b4] to-[#0a63e9] text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1 md:gap-2"
                >
                  Get Start
                  <ArrowRight size={18} className="hidden md:block" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 h-full overflow-y-scroll w-80 max-w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
            showMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img className="w-10" src='https://res.cloudinary.com/dvrfowc4a/image/upload/v1769857410/logo4_ew3okh.png' alt="Abroad Aura Logo" />
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
          <div className="px-6">
            <ul className="space-y-2">
              {navLinks
                .filter((link) => link.name !== "More")
                .map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      onClick={() => setShowMenu(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-blue-50 text-[#0441b4] font-semibold"
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

              {moreItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 text-[#0441b4] font-semibold"
                          : "hover:bg-gray-50 text-gray-700"
                      }`
                    }
                  >
                    <span className="text-lg">{item.name}</span>
                    <ChevronRight
                      size={20}
                      className={
                        location.pathname === item.path
                          ? "text-[#0441b4]"
                          : "text-gray-400"
                      }
                    />
                  </NavLink>
                </li>
              ))}

            </ul>

            {user && (
              <div className="pt-2 border-t border-gray-100 px-2">
                <button
                  onClick={handleSignOut}
                  className="w-full text-sm flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r text-gray-700 rounded-lg hover:shadow-lg hover:shadow-gray-500/30 transition-all duration-300"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* Footer Info */}
            <div className="mt-8 px-4 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600 text-center">
                Need help? <br />
                <a
                  href="mailto:info@abroadaura.com"
                  className="text-[#0441b4] font-medium hover:underline"
                >
                  abroadauracare@gmail.com
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