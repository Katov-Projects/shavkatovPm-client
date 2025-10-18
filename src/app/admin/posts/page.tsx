"use client";

import React from "react";
import { useCreateBlogPdf, useGetBlogStats } from "@/service/hooks/useStats";
import { getAllCategoryNamesApi } from "@/service/api/category";

const PostsPage = () => {
  const [count] = React.useState<number>(24);
  const [step, setStep] = React.useState<number>(1);
  const [name, setName] = React.useState<string>("all");
  const [categories, setCategories] = React.useState<string[]>([]);

  const { data, isLoading, isError, error, refetch } = useGetBlogStats(
    count,
    step,
    name
  );
  const exportPdf = useCreateBlogPdf();

  React.useEffect(() => {
    (async () => {
      try {
        const names: any = await getAllCategoryNamesApi();
        setCategories(["all", ...names.data]);
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const rows = data && (data as any).data ? (data as any).data : [];
  const meta =
    data && (data as any).meta
      ? (data as any).meta
      : { totalPages: 0, currentStep: 1 };

  const onPrev = () => setStep((s) => Math.max(1, s - 1));
  const onNext = () =>
    setStep((s) =>
      meta.totalPages ? Math.min(meta.totalPages, s + 1) : s + 1
    );

  const handleExport = async () => {
    try {
      const payload = {
        name,
        count,
        step,
        data: rows.map((r: any) => ({
          title: r.title,
          uniqueVisitors: (r.uniqueViews || []).length,
          pageViews: r.multiViews || 0,
          avgTime: r.avgTime || 0,
          bounceRate: `${r.bounceRate || 0}%`,
        })),
      };
      const blob = await exportPdf.mutateAsync(payload);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "post-statistics.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
            Post Statistics
          </h1>
          <div className="flex gap-3 md:items-center">
            <select
              className="w-full border px-3 py-2 text-sm md:text-base md:px-4 md:py-3 rounded-md bg-transparent"
              value={name}
              onChange={(e) => {
                setStep(1);
                setName(e.target.value);
              }}
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-[#2A2A2A] capitalize">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-12">
          {isLoading ? (
            <div className="flex w-full pt-30 flex-col items-center justify-center gap-4">
              <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-black text-4xl text-black">
                <div className="flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-white text-2xl text-white"></div>
              </div>
            </div>
          ) : isError ? (
            <div className="flex w-full pt-10 flex-col items-center justify-center gap-3">
              <p className="text-center text-sm sm:text-base opacity-80">
                {(error as Error)?.message || "Ma'lumotni olishda xatolik"}
              </p>
              <button
                onClick={() => refetch()}
                className="border px-4 py-2 rounded-md"
              >
                Qayta urinish
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="border px-2 py-2 sm:px-4 sm:py-3">
                      Post Name
                    </th>
                    <th className="border px-2 py-2 sm:px-4 sm:py-3">
                      Unique Visitors
                    </th>
                    <th className="border px-2 py-2 sm:px-4 sm:py-3">
                      Page Views
                    </th>
                    <th className="border px-2 py-2 sm:px-4 sm:py-3">
                      Avg. Time (sec)
                    </th>
                    <th className="border px-2 py-2 sm:px-4 sm:py-3">
                      Bounce Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td
                        className="px-2 py-3 sm:px-4 sm:py-4 text-center"
                        colSpan={5}
                      >
                        Ma'lumot topilmadi
                      </td>
                    </tr>
                  ) : (
                    rows.map((r: any, idx: number) => (
                      <tr key={idx}>
                        <td className="border px-2 py-2 sm:px-4 sm:py-3">
                          {r.title}
                        </td>
                        <td className="border px-2 py-2 sm:px-4 sm:py-3 text-center">
                          {(r.uniqueViews || []).length}
                        </td>
                        <td className="border px-2 py-2 sm:px-4 sm:py-3 text-center">
                          {r.multiViews || 0}
                        </td>
                        <td className="border px-2 py-2 sm:px-4 sm:py-3 text-center">
                          {r.avgTime || 0} s
                        </td>
                        <td className="border px-2 py-2 sm:px-4 sm:py-3 text-center">{`${
                          r.bounceRate || 0
                        } ta`}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={onPrev}
            disabled={isLoading || step === 1}
            className="border rounded-md px-4 py-2 disabled:opacity-50"
          >
            {"<"}
          </button>
          <div className="opacity-80 text-sm">
            {step} / {meta.totalPages || 1}
          </div>
          <button
            onClick={onNext}
            disabled={isLoading || (meta.totalPages && step >= meta.totalPages)}
            className="border rounded-md px-4 py-2 disabled:opacity-50"
          >
            {">"}
          </button>
        </div>

        <div className="flex justify-center mt-10 sm:mt-16">
          <button
            onClick={handleExport}
            className="border w-full max-w-xs sm:max-w-none sm:w-auto px-8 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl rounded-md disabled:opacity-50"
            disabled={exportPdf.isPending || isLoading}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
