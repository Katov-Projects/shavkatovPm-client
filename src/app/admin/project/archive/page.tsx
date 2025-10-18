"use client";

import Link from "next/link";
import React from "react";
import { useGetArchiveProjects } from "@/service";

const AdminProjectArchivePage = () => {
  const { data, isLoading } = useGetArchiveProjects();

  if (isLoading) {
    return (
      <div className="flex w-full pt-30 flex-col items-center justify-center gap-4">
        <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-black text-4xl text-black">
          <div className="flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-white text-2xl text-white"></div>
        </div>
      </div>
    );
  }

  const projects: { _id: string; title: string; subtitle: string }[] =
    data?.data || [];

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-6">
          {projects.map((p) => (
            <Link
              key={p._id}
              href={`/admin/project/archive/${p._id}`}
              className="rounded border border-[#3F3F3F] bg-[#2E2E2E] p-6 text-center text-[#C2C2C2] hover:bg-[#343434]"
            >
              <div className="text-3xl font-extrabold">{p.title}</div>
              <div className="mt-2 text-sm opacity-80">{p.subtitle}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminProjectArchivePage;
