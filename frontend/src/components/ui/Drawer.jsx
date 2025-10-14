import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";

export default function Drawer() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <button
        className=" bg-cyan-600 px-3 py-1 rounded-md"
        onClick={() => setOpenDrawer(true)}
      >
        <ChevronLeft />
      </button>
      <AnimatePresence>
        {openDrawer && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 min-h-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenDrawer(false)}
            />

            {/* Sliding div */}
            <motion.div
              className="fixed top-0 right-0 min-h-screen w-64 bg-white z-50"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-4 text-black">
                <h2 className="text-lg font-semibold">Drawer Div</h2>
                <p>This is just a plain div sliding in.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}



// import { useState } from "react";
// import { ChevronLeft, CircleX } from "lucide-react";

// export default function Drawer() {
//   const [openDrawer, setOpenDrawer] = useState(false);

//   return (
//     <>
//       <button
//         className=" bg-cyan-600 px-3 py-1 rounded-md"
//         onClick={() => setOpenDrawer(true)}
//       >
//         <ChevronLeft />
//         </button>
//        {openDrawer && <>
//         <div className="fixed inset-0 bg-black/50 z-30 min-h-screen" onClick={() => setOpenDrawer(false)}>
//         </div>
//         <div className="fixed top-0 right-0 min-h-screen w-64 text-black bg-white z-40">
//           <h3>This is drawer</h3>
//           <CircleX className="absolute top-2 right-2" onClick={() => setOpenDrawer(false)}/>
//         </div>
//         </>}
//     </>
//   );
// }
