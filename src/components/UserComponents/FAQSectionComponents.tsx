"use client";
import React, { useEffect, useState } from "react";
import Faq1 from "./FaqTextComponents";
import { useSectionStats } from "@/service/hooks/useSectionStats";
import { v4 as uuidv4 } from "uuid";

const FAQSectionComponents = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let storedId = localStorage.getItem("userId");
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("userId", storedId);
    }
    setUserId(storedId);
  }, []);

  const sectionRef = useSectionStats("faq", userId ?? "");

  return (
    <section
      ref={sectionRef}
      id="faq"
      className=" relative h-screen w-full bg-[#EDEBE6] md:flex justify-center items-center">
      <div className="mx-auto h-[90%] flex flex-col justify-between max-w-7xl px-7 py-20">
        <div>
          <h2 className="text-[#4A4A4A] font-bold text-center text-2xl md:text-[70px] md:text-6xl">
            Tez-tez beriladigan savollar
          </h2>
        </div>
        <div>
          <Faq1 />
          <div className="md:hidden mt-8 w-full flex justify-center items-center">
            <a
              className="text-[25px] text-[#737373] font-bold shadow-hover card-3 "
              href="https://t.me/shavkatovpmbot"
              target="_blank"
              rel="noopener noreferrer">
              Savol Berish
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSectionComponents;
