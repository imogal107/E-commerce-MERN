import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, X } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import imageCompression from "browser-image-compression";

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
];

const sizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
]

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [], // ✅ store multiple
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newProduct);

    try {
      await createProduct(newProduct);
      console.log("✅ Product created successfully", newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        images: [],
      });
    } catch (err) {
      console.error("❌ Error creating product:", err);
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressedImages = await Promise.all(
        files.map(async (file) => {
          const compressedFile = await imageCompression(file, options);
          return await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(compressedFile);
          });
        })
      );

      setNewProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...compressedImages], // ✅ add new images
      }));
    } catch (err) {
      console.error("❌ Image compression error:", err);
    } finally {
      e.target.value = ""; // ✅ allow reselecting same files
    }
  };

  const removeImage = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <motion.div
      className="bg-black/20 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-black text-center">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mt-1 block w-full bg-gray-400/5 border border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-amber-300"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            rows="3"
            className="mt-1 block w-full bg-gray-400/5 border border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-amber-300"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            step="0.01"
            className="mt-1 block w-full bg-gray-400/5 border border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-amber-300"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="mt-1 block w-full bg-gray-400/5 border border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-amber-300"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-medium">
            Size
          </label>
          <select
            id="size"
            // value={newProduct.size}
            // onChange={(e) =>
			// 	setNewProduct({ ...newProduct, size: e.target.value })}
            className="mt-1 block w-full bg-gray-400/5 border border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-amber-300"
            required
          >
            <option value="">Select a Size</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

		<div className="flex justify-start space-x-16">
		<div >
          <label htmlFor="quantity" className="text-sm font-medium">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={newProduct.stock}
            // onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            className="mt-1 block w-full bg-gray-400/5 border border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-amber-300"
            required
          />
        </div>
	 	<div>
          <label htmlFor="gender" className="text-sm font-medium">
            Gender
          </label>
          <select
            id="gender"
            // value={newProduct.size}
            // onChange={(e) =>
			// 	setNewProduct({ ...newProduct, size: e.target.value })}
            className="mt-1 block w-full bg-gray-400/5 border border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-amber-300"
            required
          >
            <option value="">Select a Gender</option>
			<option value="male">Male</option>
			<option value="female">Female</option>
          </select>
        </div>
		</div>

        {/* ✅ Multiple Image Upload */}
        <div >
          <input
            type="file"
            id="images"
            className="sr-only"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <label
            htmlFor="images"
            className="cursor-pointer bg-gray-400/5 py-2 px-3 border border-gray-400 rounded-md shadow-sm text-sm font-medium hover:bg-gray-400 focus:outline-none"
          >
            <Upload className="h-5 w-5 inline-block mr-2 my-4" />
            Upload Images
          </label>

          {newProduct.images.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-0 md:gap-2 ">
              {newProduct.images.map((img, i) => (
                <div key={i} className="relative group">
                  <img
                    src={img}
                    alt={`preview-${i}`}
                    className="w-20 md:w-36 h-20 md:h-36 object-cover rounded shadow"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-0 right-0 bg-black/70 text-white p-1 rounded-full transition"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-amber-300 hover:bg-amber-400/80 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader
                className="mr-2 h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
