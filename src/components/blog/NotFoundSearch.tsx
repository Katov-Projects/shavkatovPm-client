import Image from "next/image";
import React from "react";
import postNotFound from "../../../public/postNotFound.svg";

const NotFoundSearch = () => {
  return (
    <div className="flex items-center justify-center py-16 md:py-24">
      <div className="flex flex-col items-center text-center gap-6">
        <Image
          src={postNotFound}
          alt="post not found"
          width={140}
          height={140}
          priority
        />
        <p className="text-[#4b4b4b] text-2xl md:text-3xl font-bold">
          Afsuski bu bo’yicha
          <br />
          post yo’q
        </p>
      </div>
    </div>
  );
};

export default NotFoundSearch;
