import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0441b4] md:px-6 text-white mt-10 rounded-t-md">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h1 className="font-bold text-2xl">Abroad Aura</h1>
          <p className="text-sm text-black-200 mt-2">
            Empowering students to study abroad with confidence and clarity.
          </p>
          {/* Social Icons */}
          <div className="flex gap-3 mt-6 text-[#0441b4]">
            <a
              href="https://www.instagram.com/abroadaura_official?igsh=aDM1MzgxNHF1ZHlr"
              className="bg-white p-2 rounded-full hover:bg-[#0441b4] hover:text-white border border-white hover:-translate-y-1 transition"
            >
              {/* <Facebook className="w-5 h-5" /> */}
                            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" className="w-5 h-5" alt="" /> */}
            <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="bg-white p-2 rounded-full hover:bg-[#0441b4] border border-white hover:text-white hover:-translate-y-1 transition"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/abroad-aura/"
              className="bg-white p-2 rounded-full hover:bg-[#0441b4] border border-white hover:text-white hover:-translate-y-1 transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm text-white">
            <li>
              <Link to={'/Consultation-form'} className="hover:text-gray-200 transition">
                Application Support
              </Link>
            </li>
            <li>
              <Link to={'/tools'} className="hover:text-gray-200 transition">
                Tools
              </Link>
            </li>
            <li>
              <Link to={'/about'} className="hover:text-gray-200 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to={'/contact'} className="hover:text-gray-200 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Stay Updated</h2>
          <p className="text-sm text-white mb-3">
            Subscribe to our newsletter for the latest career updates.
          </p>
          <form className="flex pt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md bg-white focus:outline-none text-gray-800"
            />
            <button
              type="submit"
              className="bg-[#0441b4] text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition border border-white"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-4 text-center text-sm text-gray-100">
        © 2025 Abroad Aura. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
