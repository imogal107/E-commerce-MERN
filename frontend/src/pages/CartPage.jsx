import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore.js";
import { motion } from "framer-motion";
import { ShoppingCart, Trash } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
  const { cart, clearCart } = useCartStore();
console.log("cart" , cart);

  return (
	
    <div className="pt-8 pb-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
			{cart.length > 0 && (
              <button
                type="submit"
                className="flex mt-1 mb-4 cursor-pointer text-red-500 hover:text-red-600"
                onClick={() => clearCart()}
              >
                Clear All
                <Trash className="ml-2" />
              </button>
            )}
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <motion.div
            className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, delay: 0.2 }}
          >
            
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
            {cart.length > 0 && <PeopleAlsoBought />}
          </motion.div>

          {cart.length > 0 && (
            <motion.div
              className="mx-auto mt-0 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <OrderSummary />
              <GiftCouponCard />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CartPage;

const EmptyCartUI = () => (
  <motion.div
    className="flex flex-col items-center justify-center space-y-4 py-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="h-24 w-24 text-gray-500" />
    <h3 className="text-2xl font-semibold ">Your cart is empty</h3>
    <p className="text-gray-700">
      Looks like you {"haven't"} added anything to your cart yet.
    </p>
    <Link
      className="mt-4 rounded-md bg-amber-300 px-6 py-2 text-black font-semibold transition-colors hover:bg-amber-400/80"
      to="/"
    >
      Start Shopping
    </Link>
  </motion.div>
);
