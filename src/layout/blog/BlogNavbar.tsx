"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BlogNavbarLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [active, setActive] = useState("header");

  const navItems = [
    { label: "Asosiy", href: "/?scroll=header" },
    { label: "Haqida", href: "/?scroll=about" },
    { label: "Loyihalar", href: "/?scroll=works" },
    { label: "Savollar", href: "/?scroll=faq" },
    { label: "Blog", href: "/blog" },
    { label: "Aloqa", href: "/?scroll=contact" },
  ];

  const navItemsPhone = [
    { label: "Asosiy", href: "/?scroll=header" },
    { label: "Haqida", href: "/?scroll=about" },
    { label: "Loyihalar", href: "/?scroll=works" },
    { label: "Savollar", href: "/?scroll=faq" },
    { label: "Blog", href: "/blog" },
    { label: "Aloqa", href: "/?scroll=contact" },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id); // hozirgi sectionni id sini olamiz
          }
        });
      },
      { threshold: 0.5 } // 50% qismi ko‘ringanda trigger bo‘ladi
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Header bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#4b4b4b] text-gray-300">
        <div className="mx-auto h-15 max-w-7xl px-6 py-2 flex items-center justify-between">
          <Link
            href="/"
            className="text-gray-200 cursor-pointer text-2xl font-semibold"
          >
            Shavkatov PM
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  transition: "opacity 0.5s ease-in-out",
                }}
                className={`cursor-pointer hover:opacity-75 ${
                  item.href === "/blog" ? "opacity-100" : "opacity-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-black/10"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={20} className="text-gray-200" />
              ) : (
                <Menu size={20} className="text-gray-200" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden border-t border-black/10 mobile-menu ${
            isMenuOpen ? "mobile-menu--open" : ""
          }`}
        >
          <nav className="grid grid-cols-2 gap-3 px-6 py-3 bg-[#4b4b4b]/70">
            {navItemsPhone.map((item) => (
              <span
                key={item.href}
                className={`text-black cursor-pointer bg-white py-3 text-center rounded`}
                onClick={() => {
                  if (item.href == "/blog") {
                    router.push("/blog");
                  }
                  const element = document.getElementById(item.href);
                  if (element) {
                    const y =
                      element.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: y, behavior: "smooth" });
                    setIsMenuOpen(false);
                  }
                }}
              >
                {item.label}
              </span>
            ))}
          </nav>
        </div>
      </header>

      {/* Click-away overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default BlogNavbarLayout;
