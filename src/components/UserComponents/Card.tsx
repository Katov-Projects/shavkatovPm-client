"use client";
import Link from "next/link";

interface CardProps {
  title: string;
  subtitle: string;
  href?: string;
  className?: string;
}

export default function Card({
  title,
  subtitle,
  href = "#",
  className = "",
}: CardProps) {

  if(href === '/blog'){
    return (
      <Link
        href={href}
        className={`block cursor-pointer bg-[#EDEBE6] rounded-lg py-7 shadow-hover border border-gray-200 transition-all duration-300 hover:scale-105 ${className}`}
      >
        <h3 className="text-3xl text-center font-bold text-[#383838E5] mb-1">
          {title}
        </h3>
        <p className="text-[#BEBEBE] text-center text-sm">{subtitle}</p>
      </Link>
    );
  }

  return (
    <span
      onClick={() => {
        const element = document.getElementById(href);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }}
      className={`block cursor-pointer bg-[#EDEBE6] rounded-lg py-7 shadow-sm border border-gray-200 shadow-hover transition-all duration-300 hover:scale-105 ${className}`}
    >
      <h3 className="text-3xl text-center font-bold text-[#383838E5] mb-1">
        {title}
      </h3>
      <p className="text-[#BEBEBE] text-center text-sm">{subtitle}</p>
    </span>
  );
}
