import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore.js";
import { useCartStore } from "../stores/useCartStore.js";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      // add to cart
      addToCart(product);
    }
  };

  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg shadow-lg backdrop-blur-2xl">
      <Link to={`/product/${product._id}`}>
        <div className="relative  flex h-60 overflow-hidden rounded-t-lg">
          <img
            className="object-cover w-full"
            src={product.image}
            alt="product image"
          />
          <div className="absolute inset-0 bg-opacity-30" />
        </div>
      </Link>

      <div className="p-5 bg-gray-100">
        <Link to={`/product/${product._id}`}>
          <h5 className="text-xl font-semibold tracking-tight text-black truncate">
            {product.name.length > 20
              ? product.name.slice(0, 20) + "…"
              : product.name}
          </h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-black">
              ${product.price}
            </span>
          </p>
        </div>
        <button
          className="flex items-center justify-center rounded-lg bg-amber-400 px-5 py-2.5 text-center text-sm font-medium
					 text-white hover:bg-amber-500 focus:outline-none focus:ring-4 focus:ring-cyan-300"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={22} className="mr-2" />
          Add to cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
