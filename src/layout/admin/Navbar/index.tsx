"use client";
import Link from "next/link";
import React, { useState } from "react";

const links = [
  { label: "Blog Posts", href: "/admin/blog" },
  { label: "Projects", href: "/admin/project" },
  { label: "Category", href: "/admin/category" },
  { label: "Traffic Statistics", href: "/admin/traffic" },
  { label: "Posts Statistics", href: "/admin/posts" },
  { label: "Login Settings", href: "/admin/settings" },
];

const NavBarAdmin = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#2F3033] text-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <h1 className="font-semibold tracking-wide">Shavkatov PM Admin</h1>
        <button
          className="md:hidden px-3 py-2 rounded hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden border-t border-black/20 bg-[#2F3033] overflow-hidden transition-[max-height,opacity,transform] duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="p-4 grid grid-cols-1 gap-2">
          {links.map((l) => (
            <Link
              onClick={() => setOpen(false)}
              key={l.href}
              href={l.href}
              className="block py-2 px-3 rounded hover:bg-white/10"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBarAdmin;
