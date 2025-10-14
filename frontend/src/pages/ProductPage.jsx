import { useState } from "react";
import ProductDescription from "../components/ProductDescription";
import ProductReviewSection from "../components/ProductReviewSection";
import AddToCartButton from "../components/ui/AddToCartButton";

const ProductPage = () => {

  const [showDescription,setShowDescription] = useState(true);

  const colorClasses = {
    Red: "bg-red-700",
    Blue: "bg-blue-700",
    Black: "bg-black",
    White: "bg-white",
    Green: "bg-green-700",
  };



  const product = {
    name: "Jack and Jones Mens T-shirt Regular Fit Casual Shirt",
    price: 99.99,
    reviews: 100,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis et inventore deleniti veritatis mollitia neque veniam rerum tempora explicabo sequi? Quaerat iste nihil illum voluptatem repellendus at obcaecati aliquam quidem!",
    image: ["/jackets.jpg", "/jeans.jpg", "/tshirts.jpg", "/suits.jpg"],
  };

  return (
    <div className="min-h-screen text-white pt-20 sm:pt-24 flex flex-col justify-start items-center px-4 sm:px-6 md:px-10 ">
      {/* Product Section */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6 bg-gray-400/10 backdrop-blur-2xl shadow-md shadow-gray/20 rounded-xl p-4 md:p-8 mt-4 md:mt-8">
        {/* Thumbnail column */}
        <div className="flex md:flex-col justify-center items-center md:col-span-2 gap-2 overflow-x-auto md:overflow-y-auto">
          {product.image.map((img, i) => (
            <img
              key={i}
              src={img || "/no-image-available.png"}
              alt={`thumb-${i}`}
              className="w-20 h-20 object-cover rounded-md border border-amber-600 hover:scale-105 transition"
            />
          ))}
        </div>

        {/* Main image carousel */}
        <div className="md:col-span-5 flex overflow-x-auto custom-scroll rounded-lg">
          {product.image.map((img, i) => (
            <img
              key={i}
              src={img || "/no-image-available.png"}
              alt={`main-${i}`}
              className="min-w-full lg:h-108 sm:h-96 object-cover rounded-md"
            />
          ))}
        </div>

        {/* Product details */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-6  rounded-xl p-4 md:p-6">
          {/* Product name, price, reviews */}
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl text-black truncate">
              {product.name}
            </h1>
            <p className="text-amber-300 font-semibold mt-2">
              ★★★★★ {product.reviews} Reviews
            </p>
            <p className="text-4xl font-bold text-black mt-4">
              ${product.price}
            </p>
          </div>

          {/* Size options */}
          <div>
            <p className="font-semibold mb-2 text-lg text-black">Select Size:</p>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  type="button"
                  className="px-3 py-1 bg-gray-400 text-black rounded hover:bg-gray-300 hover:scale-105 transition text-sm sm:text-base"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color options */}
          <div>
            <p className="font-semibold mb-2 text-lg text-black">Select Color:</p>
            <div className="flex gap-2">
              {Object.keys(colorClasses).map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-6 h-6 rounded-full ${colorClasses[color]} border-2 border-gray-500 hover:scale-110 transition`}
                ></button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex flex-col sm:flex-row justify-evenly items-center">
            <div className="flex justify center items-center py-4 md:p-0">
              <button className="px-3 py-1 bg-amber-300 rounded-l hover:bg-amber-400">-</button>
              <input
                type="text"
                value={1}
                className="p-0.5 w-8 text-center bg-black/40"
                readOnly
              />
              <button className="px-3 py-1 bg-amber-300 rounded-r hover:bg-amber-400">+</button>
            </div>
            <div className="text-xs lg:text-sm">
            <AddToCartButton />
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="w-full max-w-7xl grid grid-row-12 gap-6 bg-gray-400/10 backdrop-blur-2xl shadow-md shadow-gray/20 rounded-xl p-4 md:p-4 mt-4 md:mt-8 mb-8">   
        <div className="flex justify-evenly items-center row-span-3 w-full p-2">
          <button className={`text-black px-4 py-2 rounded-md text-lg md:text-2xl font-semibold ${showDescription ? " bg-amber-300 scale-105" : " bg-gray-300"}`}onClick={() => setShowDescription(true)}>Description</button>
          <button className={`text-black px-4 py-2 rounded-md text-lg md:text-2xl font-semibold ${!showDescription ? "bg-amber-300 scale-105" : " bg-gray-300"} `}onClick={() => setShowDescription(false)}>Reviews</button>
        </div>


        {showDescription ? (
          // descriptionSection
          <div className="grid grid-cols-12 mr-2 md:mr-0 md:gap-2 row-span-9  w-full h-96">
          <ProductDescription product={product} />
        </div>
        ):(
          // reviewsSection
     <div className="grid grid-cols-12 mr-2 md:mr-0 md:gap-2 row-span-9  w-full h-96 overflow-y-auto">
          {[1,2,3,4,5,6].map((i) => (
             <ProductReviewSection product={product} key={i} />
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
