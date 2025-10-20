
import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import HomePage from "../pages/HomePage.jsx"
import CollectionPage from "../pages/CollectionPage.jsx"
import SignUpPage from "../pages/SignUpPage.jsx"
import LoginPage from "../pages/LoginPage.jsx"
import AdminPage from "../pages/AdminPage.jsx"
import ProductPage from "../pages/SingleProductDescriptionPage.jsx"
import CategoryPage from "../pages/CategoryPage.jsx"
import CartPage from "../pages/CartPage.jsx"
import PurchaseSuccessPage from "../pages/PurchaseSuccessPage.jsx"
import PurchaseCancelPage from "../pages/PurchaseCancelPage.jsx"
import DisplayAllProductsPage from "../pages/DisplayAllProductsPage.jsx"

import Navbar from "../components/Navbar.jsx"
import FooterAdvertise from "../components/FooterAdvertise.jsx"
import Footer from "../components/Footer.jsx"

import { useUserStore } from "../stores/useUserStore.js"
const PageRoutes = () => {
     const {user } = useUserStore();
 
  return (
      <>
        <div className={`min-h-screen text-white relative overflow-hidden bg-white`}>
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
          <Route path="/collection" element={<CollectionPage/>} />
          <Route path="/signup" element={!user ? <SignUpPage/> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <LoginPage/> : <Navigate to="/"/>} />
          <Route path="/secret-dashboard" element={user?.role === "admin" ? <AdminPage/> : <Navigate to="/"/>} />
          <Route path="/category/:category" element={<CategoryPage/>} />
          <Route path="/cart" element={!user ? <Navigate to="/login"/> : <CartPage/>} />
          <Route path="/purchase-success" element={user ? <PurchaseSuccessPage/> : <Navigate to="/login"/>}/>
          <Route path="/purchase-cancel" element={user ? <PurchaseCancelPage/> : <Navigate to="/login"/>}/>
          <Route path="/allproducts" element={<DisplayAllProductsPage/>} />
          <Route path="/product/:id" element={<ProductPage/>} />
        </Routes>
        </div>
        <Footer/>
        <FooterAdvertise/>

        <Toaster limit={1}/>
      </div>
    
    </>
  )
}

export default PageRoutes


