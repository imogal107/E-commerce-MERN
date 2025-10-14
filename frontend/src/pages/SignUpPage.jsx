import { useState} from "react";
import { Link } from "react-router-dom";
import { UserPlus, Lock, Mail, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore.js";

const SignUpPage = () => {
  const [focus, setFocus] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",

  });
  const rules = {
    length: formData.password.length >= 6,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
  };

  const {signup , loading} = useUserStore()
   const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    signup(formData)
  };

  return (
    <div className="flex flex-col justify-center py-12 md:py-24 sm:px-6 lg:px-8  bg-white backdrop-blur-3xl">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
          Create your account
        </h2>
      </motion.div>
      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative bg-black/20 py-8 px-4 shadow-lg backdrop-blur-2xl sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black"
              >
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User
                    className="h-5 w-5 text-black"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="block w-full px-3 py-2 pl-10 bg-gray-400/5 border border-gray-400 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-black focus:border-amber-300 sm:text-sm text-black"
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail
                    className="h-5 w-5 text-black"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value.toLowerCase(),
                    })
                  }
                  className="block w-full px-3 py-2 pl-10 bg-gray-400/5 border border-gray-400 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-black focus:border-amber-300 sm:text-sm"
                  placeholder="johndoe@gmail.com"
                />
              </div>
            </div>
            {focus && (
              <div className="absolute top-10 mt-2 mr-2 z-10 text-md bg-black/90 text-white border rounded p-2">
                <p>Password must contain:</p>
                <ul className="list-inside">
                  <li>{rules.length ? "🟢" : "🔴"} At least 6 characters</li>
                  <li>{rules.uppercase ? "🟢" : "🔴"} 1 uppercase letter</li>
                  <li>{rules.lowercase ? "🟢" : "🔴"} 1 lowercase letter</li>
                  <li>{rules.number ? "🟢" : "🔴"} 1 number</li>
                  <li>{rules.special ? "🟢" : "🔴"} 1 special character</li>
                </ul>
              </div>
            )}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock
                    className="h-5 w-5 text-black"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="password"
                  type="password"
                  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}"
                  onFocus={() => setFocus(!focus)}
                  onBlur={() => setFocus(!focus)}
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="block w-full px-3 py-2 pl-10 bg-gray-400/5 border border-gray-400 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-black focus:border-amber-300 sm:text-sm"
                  placeholder="******"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-black"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock
                    className="h-5 w-5 text-black"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="block w-full px-3 py-2 pl-10 bg-gray-400/5 border border-gray-400 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-black focus:border-amber-300 sm:text-sm"
                  placeholder="******"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-amber-300 hover:bg-amber-400/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out disabled:opacity-50"
              disabled={loading || formData.password !== formData.confirmPassword}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2 h-5 w-5">
                    Loading...
                  </Loader>
                </>
              ) : (
                <>
                  <UserPlus className= "mr-2 h-5 w-5" aria-hidden="true" />
                  Sign Up
                </>
              )}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="pl-2 font-bold text-amber-300 hover:font-extrabold  transition duration-400 ease-in-out"
            >
              Login <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
