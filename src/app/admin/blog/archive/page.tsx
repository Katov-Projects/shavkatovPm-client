"use client"
import Link from "next/link";
import React from "react";
import { useAllArchiveBlog } from "@/service";

const ArchivePage = () => {
  const { data, isLoading } = useAllArchiveBlog();

  if (isLoading) {
    return (
      <div className="flex w-full pt-30 flex-col items-center justify-center gap-4">
        <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-black text-4xl text-black">
          <div className="flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-white text-2xl text-white"></div>
        </div>
      </div>
    );
  }

  const blogs: { _id: string; title: string; subtitle: string }[] =
    data?.data || [];

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl mb-10 font-bold text-[#C2C2C2E5]">
          All Archive
        </h2>
        <div className="grid grid-cols-1 break-words gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              href={`/admin/blog/archive/${blog._id}`}
              key={blog._id}
              className="block rounded border border-[#3F3F3F] bg-[#2E2E2E] p-6 text-center text-[#C2C2C2] transition hover:bg-[#333]"
            >
              <div className="text-3xl font-extrabold">{blog.title}</div>
              <div className="mt-2 text-sm opacity-80">{blog.subtitle}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchivePage;
