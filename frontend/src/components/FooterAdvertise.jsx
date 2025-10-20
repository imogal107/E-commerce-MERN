import { motion } from "framer-motion";

const brands = [
  "Nike",
  "Adidas",
  "Puma",
  "Zara",
  "H&M",
  "Apple",
  "Samsung",
  "Sony",
  "Gucci",
  "Versace",
  "Under Armour",
  "Reebok",
  "Levi’s",
  "Vans",
  "Fila",
  ""     
];

const FooterAdvertise = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 bg-black text-white py-6 overflow-hidden">
      {/* Blur and glow effect */}
      <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-t from-black/70 via-black/50 to-black/70 pointer-events-none"></div>

      {/* Sliding container */}
      <div className="relative flex overflow-hidden whitespace-nowrap">
        {/* Loop twice for infinite effect */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="flex space-x-24 px-4"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
          >
            {brands.map((brand, index) => (
              <span
                key={index}
                className="text-xl font-semibold opacity-90 hover:opacity-100 hover:scale-105 transition-transform duration-300"
                style={{
                  fontFamily: getRandomFont(),
                  textShadow: "0 0 8px rgba(255,255,255,0.4)",
                }}
              >
                {brand}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </footer>
  );
};

// Utility: random font picker
function getRandomFont() {
  const fonts = [
    "sans-serif",
    "serif",
    "monospace",
    "cursive",
    "fantasy",
    "Poppins, sans-serif",
    "Roboto, sans-serif",
    "Playfair Display, serif",
    "Orbitron, sans-serif",
    "Dancing Script, cursive",
  ];
  return fonts[Math.floor(Math.random() * fonts.length)];
}

export default FooterAdvertise;
