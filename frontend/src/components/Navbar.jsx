import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Home, ChevronLeft } from "lucide-react";
import { useUserStore } from "../stores/useUserStore.js";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore.js";
import Hamburger from "./ui/Hamburger.jsx";


const Navbar = () => {
  const { user, loading, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";

  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <Link
            to="/"
            className="text-3xl font-bold text-gray-300 hover:text-gray-500 items-center space-x-2 flex transition-colors duration-400"
          >
            E-Commerce
          </Link>

          <nav className="hidden md:flex flex-wrap items-center gap-4">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-gray-500 transition duration-400 ease-in-out"
            >
              Home
            </Link>
            {user && (
              <Link
                to={"/cart"}
                className="relative group text-gray-300 hover:text-gray-500 transition duration-400 ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group hover:text-gray-500"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-amber-300 text-black rounded-full px-2 py-0.5 text-xs">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
            {/* admin only dashboard*/}
            {isAdmin && (
              <Link
                to={"/secret-dashboard"}
                className="text-black bg-amber-300 hover:bg-amber-400/80 transition duration-400 ease-in-out px-3 py-1 rounded-md font-medium flex items-center"
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md font-medium flex items-center group text-white transition duration-400 ease-in-out"
                onClick={logout}
              >
                <LogOut className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <>
                {/*login and signup*/}
                <Link
                  to={"/signup"}
                  className="text-gray-300 hover:text-gray-500 transition duration-400 ease-in-out"
                >
                  <UserPlus
                    className="inline-block mr-1 group hover:text-gray-500"
                    size={18}
                  />
                  <span className="hidden sm:inline">SignUp</span>
                </Link>
                <Link
                  to={"/login"}
                  className="text-gray-300 hover:text-gray-500 transition duration-400 ease-in-out"
                >
                  <LogIn
                    className="inline-block mr-1 group hover:text-gray-500"
                    size={18}
                  />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              </>
            )}
          </nav>
             <nav className="flex md:hidden items-center gap-2 text-sm text-gray-600">
              <Hamburger/>
            </nav>
    
        </div>
      </div>
    </header>
  );
};

export default Navbar;
