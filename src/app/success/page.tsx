import React from "react";
import Link from "next/link";
import Image from "next/image";

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-[#EDEBE6] md:flex pt-15 md:pt-0 items-center justify-center p-4">
      <div className="p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/success.svg"
            alt="Success Icon"
            width={80}
            height={80}
            className="w-20 h-20"
          />
        </div>

        {/* Title */}
        <h1 className="md:text-[34px] text-[25px] font-bold text-[#4A4A4A] mb-4">
          Muvaffaqiyatli Yuborildi
        </h1>

        {/* Divider Line */}
        <div className="w-[80%] h-px bg-[#737373] mx-auto mb-6"></div>

        {/* Description */}
        <p className="text-gray-600 mb-8 font-bold md:text-[18px] text-[12px] leading-relaxed">
          Tez orada siz bilan bog'lanamiz. Hozircha IT loyihalar bo'yicha
          maqolalarimizni o'qib chiqishingizni tavsiya qilamiz.
        </p>

        {/* Buttons */}
        <div className="space-y-3 flex flex-col">
          <Link href="/blog">
            <button className="w-1/2 bg-[#EDEBE6] opacity-75 shadow-hover cursor-pointer py-2 px-3 md:px-6 border-2 border-[#737373] text-[#737373] rounded-[1px] hover:opacity-100 transition-opacity duration-500">
              Ma'qolalar
            </button>
          </Link>

          <Link href="/">
            <button className="w-1/2 cursor-pointer opacity-75 shadow-hover bg-[#EDEBE6] py-2 mt-3 px-3 md:px-6 border-2 border-[#737373] text-[#737373] rounded-[1px] hover:opacity-100 transition-colors duration-200">
              Asosiy sahifa
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
