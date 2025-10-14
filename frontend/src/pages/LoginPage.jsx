import { useState } from "react"
import {Link} from "react-router-dom"
import {LogIn , Lock , Mail, ArrowRight , Loader} from "lucide-react"
import {motion} from "framer-motion"
import {useUserStore} from "../stores/useUserStore.js"
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login , loading} = useUserStore()
 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({email, password});
    login(email,password)
    
  };

  return (
    <div className="flex flex-col justify-center py-12 md:py-24 sm:px-6 lg:px-8  bg-white backdrop-blur-3xl">
      <motion.div 
      className="sm:mx-auto sm:w-full sm:max-w-md"
      initial={{opacity: 0 , y:20}} 
      animate={{opacity: 1 , y:0}}
      transition={{duration: 0.8}} >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">Login</h2>
      </motion.div>
      <motion.div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      initial={{opacity: 0 , y:20}}
      animate={{opacity: 1 , y:0}} 
      transition={{duration: 0.8 , delay:0.2}}>
        <div className="bg-black/20 py-8 px-4 shadow-lg backdrop-blur-2xl sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm text-black">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                     <Mail className="h-5 w-5 " aria-hidden="true" />
                  </div>
                  <input 
                  id="email"
                  type="email"
                  required
                  value={email} 
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  className="block w-full px-3 py-2 pl-10 bg-gray-400/5 border border-gray-400 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-black focus:border-amber-300 sm:text-sm"
                  placeholder="johndoe@gmail.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm text-black">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                     <Lock className="h-5 w-5 " aria-hidden="true" />
                  </div>
                  <input  
                  id="password"
                  type="password"
                  required
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 pl-10 bg-gray-400/5 border border-gray-400 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-black focus:border-amber-300 sm:text-sm"
                  placeholder="******"
                  />
                </div>
              </div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-amber-300 hover:bg-amber-400/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out disabled:opacity-50 " disabled={loading}>
                {
                  loading ? (
                    <>
                    <Loader className="animate-spin mr-2 h-5 w-5">
                      Loading...
                    </Loader>
                    </>
                  ) : (
                    <>
                    <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                    Login
                    </>
                  )}
              </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Don&apos;t have an account? {" "}
            <Link
              to="/signup"
              className="font-bold text-amber-300 hover:font-extrabold transition duration-400 ease-in-out"
            >
              Signup <ArrowRight className="inline h-4 w-4"/>
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage