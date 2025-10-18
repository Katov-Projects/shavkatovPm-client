"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useGetByIdBlog, useBlogUpdate } from "@/service";
import { useGetAllCategory } from "@/service/hooks/useCategory";
import { useParams, useRouter } from "next/navigation";
import { IBlogUpdate } from "@/interface";
import { SuccessComponent } from "@/components/adminComponents";
import toast from "react-hot-toast";

type SectionItem = { title: string; content: string };
type Keyword = { value: string };
type ActivePane = "sections" | "tags" | "seo";
const MAX_KEYWORDS = 15;

const BlogEditPage = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const { data, isLoading } = useGetByIdBlog(id);
  const updateMutation = useBlogUpdate(id);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const blog: any = data?.blog;

  const [activePane, setActivePane] = useState<ActivePane>("sections");
  const [headerTitle, setHeaderTitle] = useState<string>("");
  const [headerSubtitle, setHeaderSubtitle] = useState<string>("");
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [tags, setTags] = useState<Keyword[]>([]);
  const [seo, setSeo] = useState<Keyword[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [seoInput, setSeoInput] = useState<string>("");
  const { data: categoryData } = useGetAllCategory();
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    if (blog) {
      setHeaderTitle(blog.title || "");
      setHeaderSubtitle(blog.subtitle || "");
      setSections(
        blog.sections?.map((s: any) => ({
          title: s.title,
          content: s.subtitle,
        })) || []
      );
      setTags(blog.tags || []);
      setSeo(blog.seo || []);
      setCategoryId(blog.categoryId || "");
    }
  }, [blog]);

  const tagLimitReached = useMemo(
    () => tags.length >= MAX_KEYWORDS,
    [tags.length]
  );
  const seoLimitReached = useMemo(
    () => seo.length >= MAX_KEYWORDS,
    [seo.length]
  );

  const addSection = () =>
    setSections((p) => [...p, { title: "", content: "" }]);
  const updateSection = (i: number, k: keyof SectionItem, v: string) =>
    setSections((p) => {
      const c = [...p];
      c[i] = { ...c[i], [k]: v } as SectionItem;
      return c;
    });
  const removeSection = (i: number) =>
    setSections((p) => p.filter((_, idx) => idx !== i));
  const addTag = () => {
    const v = tagInput.trim();
    if (!v || tagLimitReached) return;
    setTags((p) => [...p, { value: v }]);
    setTagInput("");
  };
  const addSeo = () => {
    const v = seoInput.trim();
    if (!v || seoLimitReached) return;
    setSeo((p) => [...p, { value: v }]);
    setSeoInput("");
  };
  const removeTag = (i: number) =>
    setTags((p) => p.filter((_, idx) => idx !== i));
  const removeSeo = (i: number) =>
    setSeo((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: IBlogUpdate = {
      header: { title: headerTitle, subtitle: headerSubtitle },
      categoryId,
      sections: sections.map((s) => ({ title: s.title, subtitle: s.content })),
      tags: tags.map((t) => ({ value: t.value })),
      seo: seo.map((s) => ({ value: s.value })),
    };

    try {
      await updateMutation.mutateAsync(payload);
      setSuccess(true);
    } catch (error: any) {
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
      <SuccessComponent
        children="Edited Successfully"
        backHref={`/admin/blog/${id}`}
      />
    );
  }
  return (
    <section className="px-4 py-6">
      <form onSubmit={handleSubmit} className="mx-auto max-w-5xl">
        <div className="sticky top-14 z-10 -mx-4 mb-6 border-y border-[#3F3F3F] bg-[#2A2A2A] px-4 py-3 md:top-0 md:mx-0 md:rounded-md md:border md:py-4">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => {
                if (activePane === "sections") {
                  addSection();
                } else {
                  setActivePane("sections");
                }
              }}
              className="rounded-md border border-[#3F3F3F] bg-[#3A3A3A] px-4 py-2 text-sm font-semibold text-[#E5E5E5] hover:bg-[#444]"
            >
              + Section
            </button>
            <button
              type="button"
              onClick={() => setActivePane("tags")}
              className="rounded-md border border-[#3F3F3F] bg-[#3A3A3A] px-4 py-2 text-sm font-semibold text-[#E5E5E5] hover:bg-[#444]"
            >
              + Tag
            </button>
            <button
              type="button"
              onClick={() => setActivePane("seo")}
              className="rounded-md border border-[#3F3F3F] bg-[#3A3A3A] px-4 py-2 text-sm font-semibold text-[#E5E5E5] hover:bg-[#444]"
            >
              + SEO
            </button>
            <div className="ml-auto flex items-center gap-2">
              <button
                type="submit"
                className="rounded-md bg-[#3A3A3A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#444]"
              >
                SAVE
              </button>
            </div>
          </div>
        </div>

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

        {activePane === "sections" && (
          <div className="space-y-5">
            {sections.map((section, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#3F3F3F] bg-[#1F1F1F] p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#C2C2C2]">{`Section ${
                    index + 1
                  }`}</h3>
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
};

export default BlogEditPage;
