
import { Navigate, Route, Routes } from "react-router-dom"

import HomePage from "../pages/HomePage.jsx"
import SignUpPage from "../pages/SignUpPage.jsx"
import LoginPage from "../pages/LoginPage.jsx"
import AdminPage from "../pages/AdminPage.jsx"
import CategoryPage from "../pages/CategoryPage.jsx"
import CartPage from "../pages/CartPage.jsx"
import PurchaseSuccessPage from "../pages/PurchaseSuccessPage.jsx"
import PurchaseCancelPage from "../pages/PurchaseCancelPage.jsx"
import Navbar from "../components/Navbar.jsx"

import { useUserStore } from "../stores/useUserStore.js"
import { Toaster } from "react-hot-toast"
import ProductPage from "../pages/ProductPage.jsx"
const PageRoutes = () => {
     const {user } = useUserStore();
 
  return (
      <>
        <div className="min-h-screen bg-white text-white relative overflow-hidden">
        {/* background gradient */}
        <div className="absolute overflow-hidden">
          <div className="absolute">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full ">
            </div>
          </div>
        </div>
        <div className="relative z-50">
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/signup" element={!user ? <SignUpPage/> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <LoginPage/> : <Navigate to="/"/>} />
          <Route path="/secret-dashboard" element={user?.role === "admin" ? <AdminPage/> : <Navigate to="/"/>} />
          <Route path="/category/:category" element={<CategoryPage/>} />
          <Route path="/cart" element={!user ? <Navigate to="/login"/> : <CartPage/>} />
          <Route path="/purchase-success" element={user ? <PurchaseSuccessPage/> : <Navigate to="/login"/>}/>
          <Route path="/purchase-cancel" element={user ? <PurchaseCancelPage/> : <Navigate to="/login"/>}/>
          <Route path="/product/:id" element={<ProductPage/>} />
        </Routes>
        </div>
        <Toaster limit={1}/>
      </div>
    
    </>
  )
}

export default PageRoutes


