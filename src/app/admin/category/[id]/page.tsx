"use client";

import { useGetCategoryById } from "@/service/hooks/useCategory";
import Link from "next/link";
import React from "react";

type AdminCategoryDetailPage = {
  params: Promise<{ id: string }>;
};

const AdminCategoryDetailPage = ({ params }: AdminCategoryDetailPage) => {
  const { id } = React.use(params);
  const { data, isLoading } = useGetCategoryById(id);

  if (isLoading) {
    return (
      <div className="flex w-full pt-30 flex-col items-center justify-center gap-4">
        <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-black text-4xl text-black">
          <div className="flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-white text-2xl text-white"></div>
        </div>
      </div>
    );
  }

  const category: any = data?.data;

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 rounded border break-words border-[#3F3F3F] bg-[#2E2E2E] p-8 text-center text-[#C2C2C2]">
          <h1 className="text-4xl font-extrabold">{category?.name}</h1>
        </div>

        <div className="mx-auto grid max-w-md gap-4">
          <Link
            href={`/admin/category/edit/${id}`}
            className="block rounded border border-[#3F3F3F] bg-[#2E2E2E] px-6 py-4 text-center text-lg font-semibold text-[#C2C2C2] hover:bg-[#353535]"
          >
            Edit
          </Link>
          <Link
            href={`/admin/category/delete/${id}`}
            className="block rounded border border-[#3F3F3F] bg-[#3b0f0f] px-6 py-4 text-center text-lg font-semibold text-[#E5E5E5] hover:bg-[#4a1212]"
          >
            Delete
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdminCategoryDetailPage;
