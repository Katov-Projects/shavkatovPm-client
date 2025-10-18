"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SuccessComponent } from "@/components/adminComponents";
import { useGetProjectById, useUpdateProject } from "@/service";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

type ProjectForm = {
  title: string;
  subtitle: string;
  maqsad: string;
  yondashuv: string;
  vositalar: string; // comma-separated UI field
  url: string;
};

export default function ProjectEditPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const { data, isLoading } = useGetProjectById(id);
  const updateMutation = useUpdateProject(id);
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectForm>();

  useEffect(() => {
    const p: any = data?.data;
    if (p) {
      reset({
        title: p.title || "",
        subtitle: p.subtitle || "",
        maqsad: p.maqsad || "",
        yondashuv: p.yondashuv || "",
        vositalar: Array.isArray(p.vositalar) ? p.vositalar.join(", ") : "",
        url: p.url || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (values: ProjectForm) => {
    try {
      const payload = {
        title: values.title,
        subtitle: values.subtitle,
        maqsad: values.maqsad,
        yondashuv: values.yondashuv,
        vositalar: values.vositalar
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        url: values.url,
      };
      await updateMutation.mutateAsync(payload as any);
      setSubmitted(true);
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

  if (submitted) {
    return (
      <SuccessComponent backHref={`/admin/project/${id}`}>
        Edited Successfully
      </SuccessComponent>
    );
  }

  return (
    <section className="px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-5"
      >
        <h2 className="text-center text-3xl font-extrabold text-[#C2C2C2]">
          Edit Project
        </h2>

        <div className="rounded border border-[#3F3F3F] bg-[#1F1F1F] p-5">
          <label className="mb-1 block text-sm text-[#C2C2C2]">
            Project Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Project title"
            className="w-full rounded-md border border-[#3F3F3F] bg-[#2A2A2A] px-3 py-2 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>
          )}
        </div>

        <div className="rounded border border-[#3F3F3F] bg-[#1F1F1F] p-5">
          <label className="mb-1 block text-sm text-[#C2C2C2]">Subtitle</label>
          <input
            {...register("subtitle", { required: "Subtitle is required" })}
            placeholder="Subtitle"
            className="w-full rounded-md border border-[#3F3F3F] bg-[#2A2A2A] px-3 py-2 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
          />
          {errors.subtitle && (
            <p className="mt-1 text-xs text-red-400">
              {errors.subtitle.message}
            </p>
          )}
        </div>

        <div className="rounded border border-[#3F3F3F] bg-[#1F1F1F] p-5">
          <label className="mb-1 block text-sm text-[#C2C2C2]">
            Project URL
          </label>
          <input
            {...register("url", { required: "Project URL is required" })}
            placeholder="https://example.com"
            className="w-full rounded-md border border-[#3F3F3F] bg-[#2A2A2A] px-3 py-2 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
          />
          {errors.url && (
            <p className="mt-1 text-xs text-red-400">{errors.url.message}</p>
          )}
        </div>

        <div className="rounded border border-[#3F3F3F] bg-[#1F1F1F] p-5">
          <label className="mb-1 block text-sm text-[#C2C2C2]">Maqsad</label>
          <textarea
            {...register("maqsad", { required: "Maqsad majburiy" })}
            placeholder="Loyiha maqsadi"
            rows={5}
            className="w-full rounded-md border border-[#3F3F3F] bg-[#2A2A2A] px-3 py-2 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
          />
          {errors.maqsad && (
            <p className="mt-1 text-xs text-red-400">{errors.maqsad.message}</p>
          )}
        </div>

        <div className="rounded border border-[#3F3F3F] bg-[#1F1F1F] p-5">
          <label className="mb-1 block text-sm text-[#C2C2C2]">Yondashuv</label>
          <textarea
            {...register("yondashuv", { required: "Yondashuv majburiy" })}
            placeholder="Loyihada yondashuv va metodologiya"
            rows={5}
            className="w-full rounded-md border border-[#3F3F3F] bg-[#2A2A2A] px-3 py-2 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
          />
          {errors.yondashuv && (
            <p className="mt-1 text-xs text-red-400">
              {errors.yondashuv.message}
            </p>
          )}
        </div>

        <div className="rounded border border-[#3F3F3F] bg-[#1F1F1F] p-5">
          <label className="mb-1 block text-sm text-[#C2C2C2]">
            Vositalar (vergul bilan ajrating)
          </label>
          <input
            {...register("vositalar", { required: "Vositalar majburiy" })}
            placeholder="Linear, Trello, SWOT, Notion, Google Docs"
            className="w-full rounded-md border border-[#3F3F3F] bg-[#2A2A2A] px-3 py-2 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
          />
          {errors.vositalar && (
            <p className="mt-1 text-xs text-red-400">
              {errors.vositalar.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-[#3d3d3d] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5d5d5d] disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
