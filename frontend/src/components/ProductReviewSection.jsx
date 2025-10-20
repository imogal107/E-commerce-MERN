import React from "react";

const ProductReviewSection = ({ product }) => {
  return (
    <div className="grid grid-row-12 col-span-12 gap-2 h-48 rounded-lg shadow-black/50 backdrop-blur-xl hover:shadow-xs md:p-2 text-xs md:text-md lg:text-lg">
      <div className="flex col-span-2  justify-center items-center p-1">
        <p className="text-amber-300">★★★★★</p>
      </div>
      <div className="flex col-span-10 justify-center items-start p-1 overflow-y-scroll hide-scrollbar text-black">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non sequi
          neque, omnis ipsum nemo eligendi facere dolorum, dolores quisquam
          assumenda pariatur voluptas asperiores fugiat quo qui cum culpa.
          Pariatur, ex. Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Cupiditate assumenda nesciunt corporis. Iste distinctio
          dignissimos perferendis, totam vitae quidem odit voluptatibus dolorem
          consequuntur veniam maiores obcaecati accusamus eius tempore
          temporibus.,orem Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Architecto, nam placeat. Omnis totam, repudiandae dolorem
          exercitationem dolor ipsum tempora excepturi, quod fugiat, distinctio
          saepe eaque cum! Harum facere facilis consectetur.
        </p>
      </div>
    </div>
  );
};

export default ProductReviewSection;
