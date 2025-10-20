import Fuse from "fuse.js";
import { useEffect, useState, useRef, useCallback } from "react";
import { Search } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/ui/SkeletonCard";

const DisplayAllProductsPage = () => {
  const { products, fetchAllProducts, loading, hasMore } = useProductStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [page, setPage] = useState(1);
  const observer = useRef();

  //fetching once for infintite scroll
  useEffect(() => {
    fetchAllProducts(page);
  }, [page]);

  // Infinite scroll handler
  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // When products or sort changes, sort them locally or when search term changes
    // 🔍 Fuse.js Search + Sorting (with 500ms debounce)
  useEffect(() => {
    const handler = setTimeout(() => {
      let updated = [...products];

      // 🧠 Fuzzy Search (only if user typed something)
      if (searchTerm.trim() !== "") {
        const fuse = new Fuse(products, {
          keys: ["name", "description", "category"], // searchable fields
          threshold: 0.4, // lower = stricter, higher = fuzzier
        });

        const results = fuse.search(searchTerm).map((res) => res.item);
        updated = results;
      }

      // ⚙️ Sorting (instant)
      switch (sortOption) {
        case "priceLowHigh":
          updated.sort((a, b) => a.price - b.price);
          break;
        case "priceHighLow":
          updated.sort((a, b) => b.price - a.price);
          break;
        case "NewToOld":
          updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case "OldToNew":
          updated.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        default:
          break;
      }

      setFilteredProducts(updated);
    }, 500);

    return () => clearTimeout(handler);
  }, [products, sortOption, searchTerm]);

  

  const handleResetFilters = () => {
    setSearchTerm("");
    setSortOption("");
    setFilteredProducts(products);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 py-8 my-12 md:my-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full border border-black rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSortOption("priceLowHigh")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
              sortOption === "priceLowHigh"
                ? "bg-amber-300 text-black border-amber-300"
                : "bg-black text-white border-black hover:bg-amber-300 hover:text-black"
            }`}
          >
            {" "}
            Price: L → H
          </button>

          <button
            onClick={() => setSortOption("priceHighLow")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
              sortOption === "priceHighLow"
                ? "bg-amber-300 text-black border-amber-300"
                : "bg-black text-white border-black hover:bg-amber-300 hover:text-black"
            }`}
          >
            {" "}
            Price: H → L
          </button>

          <button
            onClick={() => setSortOption("NewToOld")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
              sortOption === "NewToOld"
                ? "bg-amber-300 text-black border-amber-300"
                : "bg-black text-white border-black hover:bg-amber-300 hover:text-black"
            }`}
          >
            Newest → Oldest
          </button>
          <button
            onClick={() => setSortOption("OldToNew")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
              sortOption === "OldToNew"
                ? "bg-amber-300 text-black border-amber-300"
                : "bg-black text-white border-black hover:bg-amber-300 hover:text-black"
            }`}
          >
            Oldest → Newest
          </button>
          <button
            onClick={handleResetFilters}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition 
                bg-black text-white border-black hover:bg-amber-300 hover:text-black`}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div
        className="
        grid 
        gap-6 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5
      "
      >
        {filteredProducts.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <div ref={lastProductRef} key={product._id}>
                <ProductCard product={product} />
              </div>
            );
          } else {
            return <ProductCard key={product._id} product={product} />;
          }
        })}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && products.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          No products found.
        </div>
      )}
    </div>
  );
};

export default DisplayAllProductsPage;
