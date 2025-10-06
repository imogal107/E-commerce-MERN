import {create} from "zustand";
import {toast} from "react-hot-toast";
import axios from "../lib/axios.js";


export const useCartStore = create((set,get) => ({
    cart:[],
    coupon:null,
    total:0,
    subtotal:0,
    isCouponApplied:false,


    getMyCoupon: async () =>{
        try {
            const response = await axios.get("/coupons");
            set({coupon:response.data})
        } catch (error) {
            console.log("Error fetching coupon",error);
            
        }
    },

    applyCoupon:async(code) =>{
        try {
            const response = await axios.post("/coupons/validate" , {code});
            set({coupon:response.data , isCouponApplied:true}); 
            get().calculateTotals();
            toast.success("Coupon applied successfully");
        } catch (error) {
            console.log("Error applying coupon",error);
            toast.error(error.response?.data?.message || "Failed to apply coupon");
        }
    },

    removeCoupon:async () => {
      set({coupon:null , isCouponApplied:false});
      get().calculateTotals();  
      toast.success("Coupon removed successfully");  
    },

    getCartItems: async () =>{
        try {
            const res = await axios.get("/cart");
            set({cart:res.data})
            get().calculateTotals();
        } catch (error) {
            set({cart:[]})
            toast.error(error.response.data.message || "Something went wrong while fetching cart items")
        }
    },

    clearCart: async () => {
        await axios.delete("/cart");
        set({cart:[] , coupon:null , total:0 , subtotal:0});
    },

    addToCart: async (product) => {
        try {
            await axios.post("/cart",{productId:product._id});
            toast.success("Product added to cart")

            set((prevState) => {
                const existingItem = prevState.cart.find((item) => item._id === product._id)
                const newCart = existingItem ? prevState.cart.map((item) => item._id === product._id ? {...item , quantity:item.quantity + 1} : item) : [...prevState.cart , {...product , quantity:1}]
                return {cart:newCart}
            })
            get().calculateTotals();

        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong while adding to cart")
        }
    },

    calculateTotals:()=>{
        const {cart,coupon} = get();
        const subtotal = cart.reduce((sum,item) => sum + item.price * item.quantity,0);
        let total = subtotal;

        if(coupon){
            let discount = (coupon.discountPercentage / 100) * subtotal;
            total = subtotal - discount;
        }

        set({total , subtotal});
    },
    
    removeFromCart:async (productId) => {
        try {
            await axios.delete(`/cart/all`, {data:{productId}});
            set((prevState) => ({
                cart: prevState.cart.filter((item) => item._id !== productId),
            }))
            toast.success("Product removed from cart");
            get().calculateTotals();
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong while removing from cart")
        }

    },

    updateQuantity: async (productId, quantity) => {
		if (quantity === 0) {
			get().removeFromCart(productId);
			return;
		}

		await axios.put(`/cart/${productId}`, { quantity });
		set((prevState) => ({
			cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
		}));
		get().calculateTotals();
    },

}))