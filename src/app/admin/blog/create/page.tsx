"use client";

import { SuccessComponent } from "@/components/adminComponents";
import { IBlogCreate } from "@/interface";
import { useBlogCreate, useCheckAuth } from "@/service";
import { useGetAllCategory } from "@/service/hooks/useCategory";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type SectionItem = {
  title: string;
  content: string;
};

type Keyword = { value: string };

type ActivePane = "sections" | "tags" | "seo";

const MAX_KEYWORDS = 15;

export default function CreateBlogPage() {
  const router = useRouter();
  const { error: tokenError, isLoading } = useCheckAuth();

  const [success, setSuccess] = useState(false);

  const { mutateAsync: postBlog } = useBlogCreate();

  useEffect(() => {
    if (tokenError && tokenError instanceof AxiosError) {
      if (tokenError.response?.data?.message === "token not found") {
        router.push("/");
      }
    }
  }, [tokenError, router]);

  const [activePane, setActivePane] = useState<ActivePane>("sections");

  // Header (optional) based on the screenshot
  const [headerTitle, setHeaderTitle] = useState<string>("");
  const [headerSubtitle, setHeaderSubtitle] = useState<string>("");

  // Sections
  const [sections, setSections] = useState<SectionItem[]>([]);

  // Tags and SEO
  const [tags, setTags] = useState<Keyword[]>([]);
  const [seo, setSeo] = useState<Keyword[]>([]);
  // Category select
  const { data: categoryData } = useGetAllCategory();
  const [categoryId, setCategoryId] = useState<string>("");

  // Inputs for tags/seo
  const [tagInput, setTagInput] = useState<string>("");
  const [seoInput, setSeoInput] = useState<string>("");

  const tagLimitReached = useMemo(
    () => tags.length >= MAX_KEYWORDS,
    [tags.length]
  );
  const seoLimitReached = useMemo(
    () => seo.length >= MAX_KEYWORDS,
    [seo.length]
  );

  const addSection = () => {
    setSections((prev) => [...prev, { title: "", content: "" }]);
    setActivePane("sections");
  };

  const updateSection = (
    index: number,
    field: keyof SectionItem,
    value: string
  ) => {
    setSections((prev) => {
      const copy = [...prev];
      const item = { ...copy[index], [field]: value } as SectionItem;
      copy[index] = item;
      return copy;
    });
  };

  const removeSection = (index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    const value = tagInput.trim();
    if (!value || tagLimitReached) return;
    setTags((prev) => [...prev, { value }]);
    setTagInput("");
  };

  const addSeo = () => {
    const value = seoInput.trim();
    if (!value || seoLimitReached) return;
    setSeo((prev) => [...prev, { value }]);
    setSeoInput("");
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const removeSeo = (index: number) => {
    setSeo((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryId) {
      toast.error("Category tanlang");
      return;
    }
    const payload: IBlogCreate = {
      header: {
        title: headerTitle,
        subtitle: headerSubtitle,
      },
      categoryId,
      sections: sections.map((s) => ({ title: s.title, subtitle: s.content })),
      tags: tags.map((t) => ({ value: t.value })),
      seo: seo.map((k) => ({ value: k.value })),
    };

    try {
      await postBlog(payload);
      setSuccess(true);
    } catch (error) {
      console.log("BLOG_CREATE_FORM", error);
      if (error && error instanceof AxiosError) {
        if (error.response?.data?.message === "token not found") {
          router.push("/");
        } else if (typeof error.response?.data?.message === "string") {
          toast.error(error.response?.data?.message);
        } else if (Array.isArray(error.response?.data?.message)) {
          error.response?.data?.message.forEach((element: string) => {
            toast.error(element);
          });
        }
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

  if (success) {
    return (
      <SuccessComponent children="Posted Successfully" backHref="/admin/blog" />
    );
  }

  return (
    <section className="px-4 py-6">
      <form onSubmit={handleSubmit} className="mx-auto max-w-5xl">
        {/* Top Controls */}
        <div className="sticky top-14 z-10 -mx-4 mb-6 border-y border-[#3F3F3F] bg-[#2A2A2A] px-4 py-3 md:top-0 md:mx-0 md:rounded-md md:border md:py-4">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={addSection}
              className="rounded-md border border-[#3F3F3F] bg-[#3A3A3A] px-4 py-2 text-sm font-semibold text-[#E5E5E5] hover:bg-[#444] focus:outline-none"
            >
              + Section
            </button>
            <button
              type="button"
              onClick={() => setActivePane("tags")}
              className="rounded-md border border-[#3F3F3F] bg-[#3A3A3A] px-4 py-2 text-sm font-semibold text-[#E5E5E5] hover:bg-[#444] focus:outline-none"
            >
              + Tag
            </button>
            <button
              type="button"
              onClick={() => setActivePane("seo")}
              className="rounded-md border border-[#3F3F3F] bg-[#3A3A3A] px-4 py-2 text-sm font-semibold text-[#E5E5E5] hover:bg-[#444] focus:outline-none"
            >
              + SEO
            </button>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden text-sm text-[#C2C2C2] md:inline">
                Yakunlash & Keyingi Qadam
              </span>
              <button
                type="submit"
                className="rounded-md bg-[#3A3A3A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#444] focus:outline-none"
              >
                DONE
              </button>
            </div>
          </div>
        </div>

        {/* Header Card */}
        <div className="mb-6 rounded-xl border border-[#3F3F3F] bg-[#1F1F1F] p-5 text-[#E5E5E5]">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-[#C2C2C2]">Header</label>
              <input
                type="text"
                value={headerTitle}
                onChange={(e) => setHeaderTitle(e.target.value)}
                placeholder="Header"
                className="w-full rounded-md border border-[#3F3F3F] bg-[#2A2A2A] px-3 py-2 placeholder:text-[#7B7B7B] focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-[#C2C2C2]">Header 3</label>
              <input
                type="text"
                value={headerSubtitle}
                onChange={(e) => setHeaderSubtitle(e.target.value)}
                placeholder="Header 3"
                className="w-full rounded-md border border-[#3F3F3F] bg-[#2A2A2A] px-3 py-2 placeholder:text-[#7B7B7B] focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-[#C2C2C2]">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-md border border-[#3F3F3F] bg-[#2A2A2A] px-3 py-2 text-[#E5E5E5] focus:outline-none"
              >
                <option value="" disabled>
                  Category tanlang
                </option>
                {(categoryData?.data || []).map((c: any) => (
                  <option key={c._id} value={c._id} className="bg-[#1F1F1F]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pane Switcher (like carousel effect by swapping views) */}
        {activePane === "sections" && (
          <div className="space-y-5">
            {sections.length === 0 && (
              <div className="rounded-md border border-dashed border-[#3F3F3F] p-6 text-center text-[#A1A1A1]">
                + Section tugmasini bosing. Yangi bo'lim qo'shiladi.
              </div>
            )}

            {sections.map((section, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#3F3F3F] bg-[#1F1F1F] p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#C2C2C2]">
                    {`Section ${index + 1}`}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="text-sm text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid gap-4">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) =>
                      updateSection(index, "title", e.target.value)
                    }
                    placeholder={`Section ${index + 1}`}
                    className="w-full rounded-md border border-[#3F3F3F] bg-[#2A2A2A] px-3 py-2 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
                  />
                  <textarea
                    value={section.content}
                    onChange={(e) =>
                      updateSection(index, "content", e.target.value)
                    }
                    placeholder="Paragraph"
                    rows={4}
                    className="w-full rounded-md border border-[#3F3F3F] bg-[#2A2A2A] px-3 py-2 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activePane === "tags" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <span
                  key={`${t.value}-${i}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#3F3F3F] bg-[#2A2A2A] px-3 py-1 text-sm text-[#E5E5E5]"
                >
                  {t.value}
                  <button
                    type="button"
                    onClick={() => removeTag(i)}
                    className="text-[#A1A1A1] hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="rounded-xl border border-[#3F3F3F] bg-[#1F1F1F] p-5">
              <label className="mb-2 block text-sm text-[#C2C2C2]">
                Tag qo'shish
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="tag kiriting"
                  className="flex-1 rounded-md border border-[#3F3F3F] bg-[#2A2A2A] px-3 py-2 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addTag}
                  disabled={tagLimitReached}
                  className="rounded-md bg-[#3A3A3A] px-4 py-2 text-sm font-semibold text-[#E5E5E5] hover:bg-[#444] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Qo'shish
                </button>
              </div>
              <p className="mt-2 text-xs text-[#A1A1A1]">
                Max {MAX_KEYWORDS} ta tag qo'shish mumkin.
              </p>
            </div>
          </div>
        )}

        {activePane === "seo" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {seo.map((k, i) => (
                <span
                  key={`${k.value}-${i}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#3F3F3F] bg-[#2A2A2A] px-3 py-1 text-sm text-[#E5E5E5]"
                >
                  {k.value}
                  <button
                    type="button"
                    onClick={() => removeSeo(i)}
                    className="text-[#A1A1A1] hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="rounded-xl border border-[#3F3F3F] bg-[#1F1F1F] p-5">
              <label className="mb-2 block text-sm text-[#C2C2C2]">
                SEO qo'shish
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={seoInput}
                  onChange={(e) => setSeoInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSeo();
                    }
                  }}
                  placeholder="seo qo'shish"
                  className="flex-1 rounded-md border border-[#3F3F3F] bg-[#2A2A2A] px-3 py-2 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addSeo}
                  disabled={seoLimitReached}
                  className="rounded-md bg-[#3A3A3A] px-4 py-2 text-sm font-semibold text-[#E5E5E5] hover:bg-[#444] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Qo'shish
                </button>
              </div>
              <p className="mt-2 text-xs text-[#A1A1A1]">
                Max {MAX_KEYWORDS} ta SEO so'z qo'shish mumkin.
              </p>
            </div>
          </div>
        )}
      </form>
    </section>
  );
}
