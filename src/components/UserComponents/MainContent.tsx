"use client";
import { useEffect, useState } from "react";
import Card from "./Card";
import { IoChevronUpCircleOutline } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-static";

export default function MainContent() {
  const allIds = ["header", "about", "works", "faq", "blog", "contact"];
  const [position, setPosition] = useState<null | string>(null);

  const searchParams = useSearchParams();

  const [device, setDevice] = useState<string>("");

  useEffect(() => {
    const { width, height } = window.screen;
    let model = "iPhone (aniqlanmadi)";

    if (width === 430 && height === 932) {
      model = "iPhone 14 Pro Max";
    } else if (width === 430 && height === 932) {
      model = "iPhone 14 Pro Max";
    } else if (width === 428 && height === 926) {
      model = "iPhone 14 Pro Max";
    } else if (width === 390 && height === 844) {
      model = "iPhone 14 Pro Max";
    } else if (width === 375 && height === 812) {
      model = "iPhone X / XS / 11 Pro / 12 mini";
    }

    setDevice(model);
    console.log("Aniqlangan model:", model);
  }, []);

  useEffect(() => {
    const section = searchParams.get("scroll");
    if (section) {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPosition(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    const currentScroll = window.scrollY;

    const positions = allIds
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const top = el.getBoundingClientRect().top + window.scrollY - 30;
        return { id, top };
      })
      .filter((v): v is { id: string; top: number } => v !== null)
      .sort((a, b) => a.top - b.top);

    // Keyingi sectionni topamiz; agar yo'q bo'lsa birinchisiga qaytamiz
    const next = positions.find((p) => p.top > currentScroll + 4);
    if (next?.id) {
      setPosition(next?.id);
    } else {
      setPosition("ok");
    }
    console.log(next?.id);
    const targetTop = next ? next.top : positions[0]?.top ?? 0;

    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };
  return (
    <div className="h-screen flex items-center justify-center bg-[#EDEBE6] pt-10">
      <div
        className={`max-w-7xl mx-auto  ${
          device === "iPhone 14 Pro Max"
            ? "flex justify-center items-center"
            : ""
        } px-4 h-full py-12`}
      >
        <div
          className={`flex flex-col h-[80%]
            m-auto md:flex-row gap-8 lg:gap-12 items-center justify-between lg:justify-center`}
        >
          {/* Left Section - Text Content */}
          <div className="w-full md:h-102 md:w-1/2 flex flex-col justify-between space-y-6 lg:space-y-8 lg:order-1">
            {/* Main Title */}
            <div>
              <h1 className="text-3xl text-center md:text-start sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                Hammasi IT Loyiha boshqaruvi haqida
              </h1>
            </div>

            {/* Descriptive Text */}
            <div className="hidden md:block space-y-2 lg:space-y-3 text-lg sm:text-xl md:text-4xl font-bold text-[#4A4A4A]">
              <p className="">Tartibli boshqaruv</p>
              <p className="">Kafolatlangan samaradorlik.</p>
              <p className="text-gray-600">Shavkatov Fayzulloh</p>
            </div>
          </div>

          {/* Right Section - Cards Grid */}
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-7 lg:order-2">
            {/* First Row */}
            <Card title="Haqida" subtitle="Men haqimda" href="about" />
            <Card title="Blog" subtitle="PM maqola" href="/blog" />

            {/* Second Row */}
            <Card title="Loyihalar" subtitle="Qilgan ishlarim" href="works" />
            <Card
              className="hidden md:block"
              title="Savollar"
              subtitle="Tez-tez beriladigan savollar"
              href="faq"
            />

            {/* Third Row - Full Width */}
            <Card
              title="Aloqa"
              subtitle="Maslahatlashamiz"
              href="contact"
              className="col-span-1 sm:col-span-2"
            />
          </div>

          <div className="md:hidden w-full mt-10 space-y-2 lg:space-y-3 text-2xl sm:text-xl md:text-4xl font-bold text-[#4A4A4A]">
            <p className="text-center">Tartibli boshqaruv</p>
            <p className="text-center">Kafolatlangan samaradorlik.</p>
            <p className="text-gray-600 hidden md:block">Shavkatov Fayzulloh</p>
          </div>
        </div>

        <div className="fixed z-40 bottom-6 right-6">
          {position === "contact" ? (
            <IoChevronUpCircleOutline
              onClick={handleScroll}
              className="text-[43px]  text-gray-400 rounded-full active:scale-95 transition-transform"
            />
          ) : (
            <IoIosArrowDropdown
              className="text-[43px]  text-gray-400 rounded-full active:scale-95 transition-transform"
              onClick={handleScroll}
            />
          )}
        </div>

        {/* No scroll indicator in screenshot */}
      </div>
    </div>
  );
}
