"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { SuccessComponent } from "@/components/adminComponents";
import { useCreateProject } from "@/service";
import toast from "react-hot-toast";

type ProjectForm = {
  title: string;
  subtitle: string;
  maqsad: string;
  yondashuv: string;
  vositalar: string; // comma-separated input, will split to string[] on submit
  url: string;
};

export default function ProjectCreatePage() {
  const { mutateAsync: createProhect } = useCreateProject();

  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectForm>({
    defaultValues: {
      title: "",
      subtitle: "",
      maqsad: "",
      yondashuv: "",
      vositalar: "Linear, Trello, SWOT, Notion, Google Docs",
      url: "",
    },
  });

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
      await createProhect(payload as any);
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

  if (submitted) {
    return (
      <SuccessComponent backHref="/admin/project">
        Posted Successfully
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
          New Project
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
            {...register("url", {
              required: "Project URL is required",
              pattern: {
                value:
                  /^(https?:\/\/)[\w.-]+(\.[\w\.-]+)+[\w\-\._~:\/?#\[\]@!$&'()*+,;=.]*$/,
                message: "Enter a valid URL starting with http(s)://",
              },
            })}
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
            className="rounded-md bg-[#484747] px-5 py-2 text-sm font-semibold text-white hover:bg-[#545454] disabled:opacity-70"
          >
            {isSubmitting ? "Submitting..." : "Create"}
          </button>
        </div>
      </form>
    </section>
  );
}
