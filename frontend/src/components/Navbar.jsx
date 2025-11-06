import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore.js";
import { Link, useLocation } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore.js";
import Hamburger from "./ui/Hamburger.jsx";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // 🧠 Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🏠 Detect if we're on Home page
  const isHome = location.pathname === "/";

  // 🎨 Dynamic background classes
  const navbarClasses = `
    fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b
    ${isHome && !isScrolled
      ? "bg-transparent border-transparent"
      : "bg-black bg-opacity-90 backdrop-blur-md border-gray-800 shadow-lg"
    }
  `;

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`text-3xl font-bold flex items-center space-x-2 transition-colors duration-300 ${
              isHome && !isScrolled ? "text-white hover:text-amber-300" : "text-gray-300 hover:text-gray-400"
            }`}
          >
            E-Commerce
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-wrap items-center gap-4">
            <Link
              to={"/"}
              className={`${isHome && !isScrolled ? "text-white" : "text-gray-300 hover:text-gray-400"} hover:text-amber-300 transition duration-300 ease-in-out`}
            >
              Home
            </Link>
            <Link
              to={"/collection"}
              className={`${isHome && !isScrolled ? "text-white" : "text-gray-300 hover:text-gray-400"} hover:text-amber-300 transition duration-300 ease-in-out`}
            >
              Collection
            </Link>

            {user && (
              <Link
                to={"/cart"}
                className={`${isHome && !isScrolled ? "text-white" : "text-gray-300 hover:text-gray-400"} hover:text-amber-300 transition duration-300 ease-in-out relative group`}
              >
                <ShoppingCart className="inline-block mr-1" size={20} />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-amber-300 text-black rounded-full px-2 py-0.5 text-xs">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {/* Admin Only */}
            {isAdmin && (
              <Link
                to={"/secret-dashboard"}
                className="text-black bg-amber-300 hover:bg-amber-400/80 transition duration-300 px-3 py-1 rounded-md font-medium flex items-center"
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {/* Auth Buttons */}
            {user ? (
              <button
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md font-medium flex items-center group text-white transition duration-300 ease-in-out"
                onClick={logout}
              >
                <LogOut className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="text-gray-300 hover:text-amber-300 transition duration-300 ease-in-out"
                >
                  <UserPlus className="inline-block mr-1" size={18} />
                  <span className="hidden sm:inline">SignUp</span>
                </Link>
                <Link
                  to={"/login"}
                  className="text-gray-300 hover:text-amber-300 transition duration-300 ease-in-out"
                >
                  <LogIn className="inline-block mr-1" size={18} />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu */}
          <nav className="flex md:hidden items-center gap-2 text-sm text-gray-600">
            <Hamburger />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
