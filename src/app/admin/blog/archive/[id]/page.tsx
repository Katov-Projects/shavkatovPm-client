"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { useExitArchiveBlog, useGetByIdBlog } from "@/service";

const BlogArchiveDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const router = useRouter();
  const { data, isLoading } = useGetByIdBlog(id);
  const archiveMutation = useExitArchiveBlog(id);

  if (isLoading) {
    return (
      <div className="flex w-full pt-30 flex-col items-center justify-center gap-4">
        <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-black text-4xl text-black">
          <div className="flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-white text-2xl text-white"></div>
        </div>
      </div>
    );
  }

  const blog: any = data?.blog;

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 rounded border break-words border-[#3F3F3F] bg-[#2E2E2E] p-8 text-center text-[#C2C2C2]">
          <h1 className="text-4xl font-extrabold">{blog?.title}</h1>
          <p className="mt-2 text-sm opacity-80">{blog?.subtitle}</p>
        </div>

        <div className="mx-auto grid max-w-md gap-4">
          <Link
            href={`/admin/blog/edit/${id}`}
            className="block rounded border border-[#3F3F3F] bg-[#2E2E2E] px-6 py-4 text-center text-lg font-semibold text-[#C2C2C2] hover:bg-[#353535]"
          >
            Edit Post
          </Link>
          <button
            className="rounded border border-[#3F3F3F] bg-[#2E2E2E] px-6 py-4 text-lg font-semibold text-[#C2C2C2] hover:bg-[#353535]"
            onClick={async () => {
              await archiveMutation.mutateAsync();
              router.push("/admin/blog/success?from=exit-archive");
            }}
          >
            Restore The Post
          </button>
          <Link
            href={`/admin/blog/delete/${id}`}
            className="block rounded border border-[#3F3F3F] bg-[#3b0f0f] px-6 py-4 text-center text-lg font-semibold text-[#E5E5E5] hover:bg-[#4a1212]"
          >
            Delete Post
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogArchiveDetailPage;
