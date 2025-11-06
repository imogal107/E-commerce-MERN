

const ProductDescription = ({ description }) => {
  return (
        <>
        <div className="grid grid-rows-12 col-span-3 p-1">
            <div className="flex row-span-8 items-center justify-center ">
            <p className=" text-xs md:text-lg lg:text-xl text-start font-bold text-black">Product Description</p>
            </div>
            <div className="flex row-span-4 items-center justify-center">
            <p className="text-xs md:text-lg lg:text-xl font-bold text-black">Materials Used</p>
            </div>
        </div>
        <div className="grid grid-rows-12 col-span-9 p-1 max-h-96 gap-3">
          <div className="flex row-span-8 p-4 items-start justify-center overflow-y-scroll custom-scroll max-h-64 rounded shadow-black/50 backdrop-blur-xl hover:shadow-xs">
           <p className="text-xs md:text-sm lg:text-lg text-start leading-normal text-black">{description}

            </p>
          </div>
          <div className="flex row-span-4 items-start justify-center overflow-y-scroll custom-scroll  rounded shadow-black/50 hover:shadow-xs backdrop-blur-xl max-h-32 p-4">
            <p className="text-xs md:text-sm lg:text-lg leading-normal text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex illum aspernatur dolorum. Repudiandae laudantium inventore eos ipsam voluptatem ea? Assumenda quod distinctio hic dolore laudantium earum beatae. Iste, laudantium iusto!
              Facere consectetur fugiat ullam quod ex quidem debitis amet veritatis minima tenetur reiciendis quas, hic eius possimus tempora nesciunt error aspernatur iusto? Laudantium doloribus eos voluptatem nam illo corrupti quasi. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa eos temporibus hic nesciunt, nam, odit doloribus assumenda, provident explicabo sed commodi aliquam iure autem inventore consequatur rem molestiae recusandae nostrum?
            </p>
          </div>
        </div>
        </>
  );
};

export default ProductDescription;

// import React from "react";
// const ProductDescription = ({ product }) => {
//   return (
//     <>
//       <div className="grid grid-rows-12 col-span-3 border border-orange-500 p-1">
//         <div className="flex row-span-8 border border-amber-300 items-center justify-center">
//           <p className="border border-white text-md md:text-lg text-start">
//             Product Description
//           </p>
//         </div>
//         <div className="flex row-span-4 items-center justify-center border border-amber-300">
//           <p className="text-md md:text-lg border border-white">
//             Materials Used
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-rows-12 col-span-9 border border-orange-500 p-1 max-h-full">
//         {/* Product Description Scrollable */}
//         <div className="flex row-span-8 border border-amber-300 p-3 mb-0.5 overflow-y-auto max-h-[70%]">
//           <p className="text-md md:text-lg text-start">
//              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
//             iure explicabo blanditiis a eos tempora similique quasi perspiciatisLorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
//             iure explicabo blanditiis a eos tempora similique quasi perspiciatis
//             velit accusantium nisi, soluta dicta aut esse, voluptatem nulla
//             commodi ea sapiente. Lorem ipsum dolor sit amet consectetur
//             adipisicing elit. Dolores iure explicabo blanditiis a eos tempora
//             similique quasi perspiciatis velit accusantium nisi, soluta dicta
//             aut esse, voluptatem nulla commodi ea sapiente. Lorem ipsum dolor
//             sit amet consectetur adipisicing elit. Dolores iure explicabo
//             blanditiis a eos tempora similique quasi perspiciatis velit
//             accusantium nisi, soluta dicta aut esse, voluptatem nulla commodi ea
//             sapiente.
//           </p>
//         </div>

//         {/* Materials Used Scrollable */}
//         <div className="row-span-4 border border-amber-300 mt-0.5 overflow-y-auto max-h-[30%] p-3">
//           <p className="text-md md:text-lg text-start">
//             Cotton, Polyester, Nylon, Leather, Wool, Denim, Silk, Rayon,
//             Spandex, and more. Lorem ipsum dolor sit amet consectetur
//             adipisicing elit. Natus similique pariatur voluptatum adipisci
//             consequatur impedit reiciendis.
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDescription;
