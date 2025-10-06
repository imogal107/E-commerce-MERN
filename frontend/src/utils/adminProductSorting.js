// import { useProductStore } from "../src/stores/useProductStore";



export const sortByPrice = (products, order = "asc") => {
  return [...products].sort((a, b) =>
    order === "asc" ? a.price - b.price : b.price - a.price
  );
};

export const sortByCategory = (products, category) => {
  return [...products].filter((product) => product.category === category);
};