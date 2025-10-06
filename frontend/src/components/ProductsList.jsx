import { motion } from "framer-motion";
import {
  Trash,
  Star,
  ChevronDown,
  ChevronUp,
  ListFilter,
  RefreshCcw,
} from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import LoadingSpinner from "./LoadingSpinner";
import { sortByPrice } from "../utils/adminProductSorting.js";
import { useState } from "react";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, fetchFeaturedProducts , products, loading } =
    useProductStore();
  const [order, setOrder] = useState("asc");
  const [sortedProducts, setSortedProducts] = useState(products);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [filterFeatured, setFilterFeatured] = useState(false);

  const handlePrice = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    // Passing the newOrder to sorting function
    const sorted = sortByPrice([...products], newOrder);
    setSortedProducts(sorted);
    setOrder(newOrder);
    console.log("Sorted with order:", newOrder, sorted);
  };

  const showFeaturedProducts = () => {
    const featureProducts = products.filter((p) => p.isFeatured === true);
    setSortedProducts(featureProducts);
    setFilterFeatured(!filterFeatured);
    console.log("Show featured products");

  };

  const filterByCategory = (category) => {
    const filtered = products.filter((p) => p.category === category);
    setSortedProducts(filtered);
    setShowCategoryMenu(false); // close dropdown after choosing
    console.log("Filter by category");
  };

  const resetFilters = () => {
    setSortedProducts(products);
    setShowCategoryMenu(false);
    setFilterFeatured(false);
    console.log("Reset filters");
  };

  return (
    <>
      <motion.div
        className="bg-gray-800/20 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {
          <div className="flex justify-end m-1">
            <button
              type="submit"
              className="flex items-center bg-cyan-600/40 hover:bg-cyan-700 font-xs rounded-lg text-sm p-3 text-center"
              onClick={resetFilters}
            >
              <RefreshCcw className="mr-2" size={16} />
              Reset Filters
            </button>
          </div>
        }
        <table className=" min-w-full divide-y divide-gray-700">
          <thead className=" bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                <div className="flex justify-center">Product</div>
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                <div className="flex justify-center cursor-pointer" onClick={handlePrice}>
                  Price
                  {order === "desc" ? (
                    <ChevronUp
                      className="h-5 w-5 ml-1 text-gray-300"  
                    />
                  ) : (
                    <ChevronDown
                      className="h-5 w-5 ml-1 text-gray-300"
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                <div
                  className="flex justify-center relative cursor-pointer  "
                  onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                >
                  Category
                  <ListFilter className="h-5 w-5 ml-1 text-gray-300 cursor-pointer" />
                  {showCategoryMenu && (
                    <div className="absolute top-full mt-1 bg-gray-700 rounded shadow-lg z-10">
                      {[...new Set(products.map((p) => p.category))].map(
                        (cat) => (
                          <div
                            key={cat}
                            onClick={() => filterByCategory(cat)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-600 text-white"
                          >
                            {cat}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                <div
                  className="flex justify-center cursor-pointer"
                  onClick={showFeaturedProducts}
                >
                  Featured
                </div>
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                <div className="flex justify-center">Actions</div>
              </th>
            </tr>
          </thead>

          <tbody className="bg-gray-900/20 divide-y divide-gray-600">
            {sortedProducts?.map((product) => (
              <tr key={product._id} className="hover:bg-gray-700/30">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    <button>${product.price.toFixed(2)}</button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {product.category}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleFeaturedProduct(product._id)}
                    className={`p-1 rounded-full ${
                      product.isFeatured
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-gray-600 text-gray-300"
                    } hover:bg-yellow-500 transition-colors duration-200`}
                  >
                    <Star className="h-5 w-5" />
                  </button>
                </td>
                {loading ? (
                  <>
                    <div className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="relative flex items-center">
                        <div className="w-5 h-5 border-cyan-900 border-3 absolute rounded-full left-2 top-2" />
                        <div className="w-5 h-5 border-cyan-300 border-t-2 animate-spin rounded-full absolute left-2 top-2" />
                      </div>
                    </div>
                  </>
                ) : (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </>
  );
};
export default ProductsList;
