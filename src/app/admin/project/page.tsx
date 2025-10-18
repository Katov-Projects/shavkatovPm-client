"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useCheckAuth, useGetAllProjects } from "@/service";
import { ExternalLink } from "lucide-react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const AdminProjectListPage = () => {
  const { data, isLoading } = useGetAllProjects();

  console.log(data);

  const { error: tokenError } = useCheckAuth();
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

  const projects: {
    _id: string;
    title: string;
    subtitle: string;
    maqsad: string;
    yondashuv: string;
    vositalar: string;
    url?: string;
  }[] = data?.data || [];

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Top CTA Cards */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/admin/project/create"
            className="rounded border border-[#3F3F3F] bg-[#2E2E2E] p-8 text-center text-[#C2C2C2E5] hover:bg-[#343434]"
          >
            <div className="text-3xl font-extrabold">New Project</div>
          </Link>
          <Link
            href="/admin/project/archive"
            className="rounded border border-[#3F3F3F] bg-[#2E2E2E] p-8 text-center text-[#C2C2C2E5] hover:bg-[#343434]"
          >
            <div className="text-3xl font-extrabold">Archive Projects</div>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {projects.map((p) => (
            <Link
              key={p._id}
              href={`/admin/project/${p._id}`}
              className="grid grid-cols-1 gap-0 rounded border border-[#3F3F3F] bg-[#2E2E2E] sm:grid-cols-3 hover:bg-[#343434]"
            >
              <div className="relative flex flex-col justify-center items-center p-6 text-center sm:border-r sm:border-[#3F3F3F]">
                <div className="text-3xl font-extrabold break-words text-[#C2C2C2E5]">
                  {p.title}
                </div>
                <div className="mt-2 text-sm break-words text-[#C2C2C2]/80">
                  {p.subtitle}
                </div>
                {p.url && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(p.url, "_blank", "noopener,noreferrer");
                    }}
                    className="absolute right-3 top-3 text-[#C2C2C2]/70 hover:text-[#C2C2C2]"
                  >
                    <ExternalLink size={18} />
                  </button>
                )}
              </div>
              <div className="col-span-2 p-6 flex items-center text-sm text-[#C2C2C2]/80">
                <div>
                  <span className=" block break-words">
                    <span className="text-white font-bold">Maqsad:</span>{" "}
                    {p.maqsad}
                  </span>
                  <span className=" block break-words">
                    <span className="text-white font-bold">Yondashuv:</span>{" "}
                    {p.yondashuv}
                  </span>
                  <span className=" block break-words">
                    <span className="text-white font-bold">Vositalar:</span>{" "}
                    {p.vositalar}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminProjectListPage;
