"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  useArchiveProject,
  useGetProjectById,
  useUnarchiveProject,
} from "@/service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SuccessComponent } from "@/components/adminComponents";

type AdminProjectDetailPageProps = {
  params: Promise<{ id: string }>;
};

const AdminProjectDetailPage = ({ params }: AdminProjectDetailPageProps) => {
  const { id } = React.use(params);
  const { data, isLoading } = useGetProjectById(id);
  const archiveMutation = useUnarchiveProject(id);
  const [archive, setArchive] = useState(false);

  const handleArchive = async () => {
    try {
      await archiveMutation.mutateAsync();
      setArchive(true);
    } catch (error: any) {
      if (typeof error?.message === "string") {
        toast.error(error?.message);
      } else if (Array.isArray(error?.message)) {
        error?.message.forEach((err: string) => {
          toast.error(err);
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full pt-30 flex-col items-center justify-center gap-4">
        <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-black text-4xl text-black">
          <div className="flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-white text-2xl text-white"></div>
        </div>
      </div>
    );
  }

  if (archive) {
    return (
      <SuccessComponent backHref="/admin/project">
        Success Unarchived
      </SuccessComponent>
    );
  }

  const project: any = data?.data;

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 rounded border border-[#3F3F3F] bg-[#2E2E2E] p-8 text-center text-[#C2C2C2]">
          <h1 className="text-4xl font-extrabold">{project?.title}</h1>
          <p className="mt-2 text-sm opacity-80">{project?.subtitle}</p>
        </div>

        <div className="mx-auto grid max-w-md gap-4">
          <Link
            href={`/admin/project/edit/${id}`}
            className="block rounded border border-[#3F3F3F] bg-[#2E2E2E] px-6 py-4 text-center text-lg font-semibold text-[#C2C2C2] hover:bg-[#353535]"
          >
            Edit Project
          </Link>
          <button
            className="rounded border border-[#3F3F3F] bg-[#2E2E2E] px-6 py-4 text-lg font-semibold text-[#C2C2C2] hover:bg-[#353535]"
            onClick={async () => handleArchive()}
          >
            Unarchive A Project
          </button>
          <Link
            href={`/admin/project/delete/${id}`}
            className="block rounded border border-[#3F3F3F] bg-[#3b0f0f] px-6 py-4 text-center text-lg font-semibold text-[#E5E5E5] hover:bg-[#4a1212]"
          >
            Delete Project
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdminProjectDetailPage;
