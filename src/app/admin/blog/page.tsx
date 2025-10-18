"use client";
import { useCheckAuth } from "@/service";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const cards = [
  { label: "Create New Post", href: "/admin/blog/create" },
  { label: "View All Posts", href: "/admin/blog/all" },
  { label: "Archive Posts", href: "/admin/blog/archive" },
];

const BlogPage = () => {
  const { error: tokenError, isLoading } = useCheckAuth();
  const router = useRouter();

  useEffect(() => {
    if (tokenError && tokenError instanceof AxiosError) {
      console.log(tokenError.response?.data?.message);
      if (tokenError.response?.data?.message === "token not found") {
        router.push("/");
      }
    }
  }, [tokenError]);

  if (isLoading) {
    return (
      <div className="flex w-full pt-30 flex-col items-center justify-center gap-4">
        <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-black text-4xl text-black">
          <div className="flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-white text-2xl text-white"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-[70vh] px-4 py-10">
      <div className="mx-auto max-w-5xl md:h-100 md:flex justify-center items-center">
        {/* Mobile: stacked; Desktop: spread */}
        <div className="flex break-words flex-col gap-4 max-w-sm mx-auto md:max-w-none md:grid md:grid-cols-3 md:gap-8 md:place-items-center">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="w-full md:w-64 block md:opacity-75 md:hover:opacity-100 rounded border border-[#3F3F3F] bg-[#3A3A3A] text-[#C2C2C2E5] text-center py-6 font-semibold shadow-default shadow-hover"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
