"use client";
import Link from "next/link";
import React from "react";

interface NavItems {
  label: string;
  href: string;
}

const BlogFooterLayout = () => {
  const navItems: NavItems[] = [
    { label: "Asosiy", href: "/?scroll=header" },
    { label: "Haqida", href: "/?scroll=about" },
    { label: "Loyihalar", href: "/?scroll=service" },
    { label: "Savollar", href: "/?scroll=faq" },
    { label: "Blog", href: "/blog" },
    { label: "Aloqa", href: "/?scroll=contact" },
  ];


  return (
    <footer className="bg-[#4b4b4b] md:h-[241px] flex items-center text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="sm:hidden flex justify-between items-center">
            {navItems?.map((cat) => (
              <Link
                className={`cursor-pointer hover:opacity-[75%] ${cat.href === "/blog" ? "opacity-100" :"opacity-50"}`}
                key={cat.href}
                href={cat.href}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          <hr className="sm:hidden" />

          {/* Contact Information */}
          <div className="space-y-4 md:w-1/2">
            <div className="flex justify-between">
              <span className="text-gray-400">Telegramdagi rasmiy sahifa:</span>
              <a
                href="https://t.me/shavkatovpm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                t.me/shavkatovpm
              </a>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400 ">Telegram bot orqali aloqa:</span>
              <a
                href="https://t.me/shavkatovpm_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                t.me/shavkatovpm_bot
              </a>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Elektron pochta:</span>
              <a
                href="mailto:shavkatovpm@gmail.com?subject=Salom&body=Men%20siz%20bilan%20aloqa%20qilmoqchiman."
                className="text-white hover:underline"
              >
                shavkatovpm@gmail.com
              </a>
            </div>
          </div>

          <hr className="sm:hidden" />

          {/* Description */}
          <div className="lg:col-span-2 md:w-1/2">
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                IT loyihangizni professional darajada amalga oshirish orqali
                zamonaviy va ishonchli natijaga erishing!
              </p>

              <div className=" hidden md:block">
                <p className="text-white font-semibold text-lg">Shavkatov PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BlogFooterLayout;
