"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SuccessComponent } from "@/components/adminComponents";
import { useParams } from "next/navigation";
import { useGetCategoryById, useUpdateCategory } from "@/service/hooks/useCategory";

type FormValues = { name: string };

export default function AdminCategoryEditPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const { data, isLoading } = useGetCategoryById(id);
  const updateMutation = useUpdateCategory(id);
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  useEffect(() => {
    const c: any = data?.data;
    if (c) {
      reset({ name: c.name || "" });
    }
  }, [data, reset]);

  const onSubmit = async (v: FormValues) => {
    await updateMutation.mutateAsync(v);
    setSubmitted(true);
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
      <SuccessComponent backHref={`/admin/category/${id}`}>
        Edited Successfully
      </SuccessComponent>
    );
  }

  return (
    <section className="px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-md space-y-5"
      >
        <h2 className="text-center text-3xl font-extrabold text-[#C2C2C2]">
          Edit Category
        </h2>
        <div className="rounded-xl border border-[#3F3F3F] bg-[#1F1F1F] p-5">
          <label className="mb-1 block text-sm text-[#C2C2C2]">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Category name"
            className="w-full rounded-md border border-[#3F3F3F] bg-[#2A2A2A] px-3 py-2 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-[#383838] px-5 py-2 text-sm font-semibold text-white hover:bg-[#484848] disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
