"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeleteCategory, useGetCategoryById } from "@/service/hooks/useCategory";

type AdminCategoryDeletePage = {
  params: Promise<{ id: string }>;
};

const AdminCategoryDeletePage = ({ params }: AdminCategoryDeletePage) => {
  const { id } = React.use(params);
  const router = useRouter();
  const { data, isLoading } = useGetCategoryById(id);
  const delMutation = useDeleteCategory(id);

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
    <section className="px-4 py-10">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-8 text-3xl font-extrabold text-[#C2C2C2]">
          Are you sure you want to delete this post?
        </h2>
        <div className="mx-auto mb-10 max-w-xl rounded border border-[#3F3F3F] bg-[#2E2E2E] p-8">
          <div className="text-3xl break-words font-extrabold text-[#C2C2C2]">
            {category?.name}
          </div>
        </div>

        <div className="mx-auto grid max-w-md gap-4">
          <Link
            href="/admin/category"
            className="block rounded bg-[#0e4d37] px-6 py-4 text-center text-lg font-semibold text-white hover:bg-[#136247]"
          >
            Cancel
          </Link>
          <button
            onClick={async () => {
              await delMutation.mutateAsync();
              router.push("/admin/blog/success?from=delete");
            }}
            className="rounded bg-[#4d0e0e] px-6 py-4 text-lg font-semibold text-white hover:bg-[#641313]"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminCategoryDeletePage;
