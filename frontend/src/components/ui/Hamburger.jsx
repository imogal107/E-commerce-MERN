import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Lock, LogIn, LogOut, MenuIcon, ShoppingCart, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../../stores/useUserStore';

export default function Hamburger() {

    const {user , logout} = useUserStore();
    const isAdmin = user?.role === "admin";

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-cyan-400/80 p-2 text-sm font-semibold text-black shadow-xs">
        <MenuIcon/> 
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black/70 backdrop-blur-3xl shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <Link
              to={"/"}
              className="block px-4 py-2 text-sm text-cyan-300 drop-shadow-lg data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden "
            >
              Home
            </Link>
          </MenuItem>
          {user && (<MenuItem>
            <Link
              to={"/cart"}
              className="block px-4 py-2 text-sm text-cyan-300 drop-shadow-lg data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
             <ShoppingCart className="inline-block mr-1 h-5 w-5" />  Cart
            </Link>
          </MenuItem>)}
          {isAdmin &&(<MenuItem>
            <Link
              to={"/secret-dashboard"}
              className="block px-4 py-2 text-sm text-cyan-300 drop-shadow-lg data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden "
            >
              <Lock className="inline-block mr-1" size={18} /> Dashboard
            </Link>
          </MenuItem>)}
            {user ? (<MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-cyan-300 drop-shadow-lg data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden "
                onClick={logout}

              >
                <LogOut className="inline-block mr-1" size={18} />Logout
              </button>
            </MenuItem>) : 
            (<>
               <MenuItem>
            <Link
              to={"/signup"}
              className="block px-4 py-2 text-sm text-cyan-300 drop-shadow-lg data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden "
            >
               <UserPlus
                    className="inline-block mr-1 group hover:text-cyan-500"
                    size={18}
                  /> Signup
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to={"/login"}
              className="block px-4 py-2 text-sm text-cyan-300 drop-shadow-lg data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden "
            >
               <LogIn
                    className="inline-block mr-1 group hover:text-cyan-500"
                    size={18}
                  /> Login
            </Link>
          </MenuItem>
            </>)}
        </div>
      </MenuItems>
    </Menu>
  )
}
