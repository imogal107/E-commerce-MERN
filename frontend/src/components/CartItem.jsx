import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore.js";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="rounded-lg  backdrop-blur-3xl p-4 shadow-lg bg-black/20 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div className="shrink-0 md:order-1">
          <img className="h-20 md:h-32 rounded object-cover" src={item.image} />
        </div>
        <label className="sr-only text-black">Choose quantity:</label>

        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center gap-0">
            <button
              className="inline-flex h-6 w-6 items-center justify-center  border px-3 py-1 rounded-l border-gray-300 bg-amber-300 hover:bg-amber-400/80 text-black"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >-
            </button>
            <p className="p-0.5 w-8 text-center bg-black/40 text-sm">
              {item.quantity}
            </p>
            <button
              className="inline-flex h-6 w-6  items-center justify-center  border px-3 py-1 rounded-r border-gray-300 bg-amber-300 hover:bg-amber-400/80 text-black"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >	+
            </button>
          </div>

          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-black">${item.price}</p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <p className="text-base font-medium text-black hover:text-gray-800 hover:underline">
            {item.name}
          </p>
          <p className="text-sm text-black">{item.description}</p>

          <div className="flex items-center gap-4">
            <button
              className="inline-flex items-center text-sm font-medium text-red-400
							 hover:text-red-300 hover:underline"
              onClick={() => removeFromCart(item._id)}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
