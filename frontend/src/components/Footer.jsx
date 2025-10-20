import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-amber-300 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/collection" className="hover:text-amber-300 transition">
                Collection
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-amber-300 transition">
              <Facebook />
            </a>
            <a href="#" className="hover:text-amber-300 transition">
              <Twitter />
            </a>
            <a href="#" className="hover:text-amber-300 transition">
              <Instagram />
            </a>
            <a href="#" className="hover:text-amber-300 transition">
              <Linkedin />
            </a>
          </div>
        </div>

        {/* Address */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <p className="text-gray-300">
            123 Market Street, <br />
            Mumbai, India <br />
            +91 98765 43210
          </p>
        </div>

        {/* Query Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Send a Query</h2>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <textarea
              placeholder="Your Message"
              rows="3"
              className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
            ></textarea>
            <button
              type="submit"
              className="bg-amber-300 text-black font-semibold px-4 py-2 rounded hover:bg-amber-400 transition w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 mt-8">
        <p>© {new Date().getFullYear()} YourBrand™. All Rights Reserved.</p>
        <p className="text-sm">Designed & Developed by Ibrahim Mogal</p>
      </div>
      <div className="h-16"></div>
    </footer>
  );
};

export default Footer;
