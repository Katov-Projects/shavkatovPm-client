"use client";

import React, { useEffect } from "react";
import {
  useGetStatsSections,
  useCreateStatsPdf,
} from "@/service/hooks/useStats";
import { TimeQuery } from "@/service/api/stats";
import { useRouter } from "next/navigation";

const sections: { label: string; value: any }[] = [
  { label: "All", value: "all" },
  { label: "Home", value: "home" },
  { label: "Blogs", value: "blogs" },
  { label: "Projects", value: "projects" },
  { label: "Services", value: "services" },
  { label: "FAQ", value: "faq" },
  { label: "Contact", value: "contact" },
  { label: "About", value: "about" },
];

const times: { label: string; value: TimeQuery }[] = [
  { label: "Day", value: TimeQuery.day },
  { label: "Last Week", value: TimeQuery.week },
  { label: "Month", value: TimeQuery.month },
];

const TrafficPage = () => {
  const [time, setTime] = React.useState<TimeQuery>(TimeQuery.day);
  const [section, setSection] = React.useState<any>("all");

  const { data, isLoading, isError, error, refetch } = useGetStatsSections(
    time,
    section
  );
  const createPdf = useCreateStatsPdf();

  const router = useRouter();

  const isAll =
    (data?.name || "").toLowerCase() === "page" || section === "all";
  const rows: any[] = data?.data || [];

  useEffect(() => {
    if(error?.message === "token not found"){
      router.push('/admin');
    }
  }, [error])


  const handleImport = async () => {
    try {
      const blob = await createPdf.mutateAsync({ time, section, data: rows });
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "traffic-stats.pdf";
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
            Traffic Statistics
          </h1>
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex gap-2 overflow-x-auto">
              {times.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTime(t.value)}
                  className={`border px-3 py-2 text-sm md:text-base md:px-5 md:py-3 rounded-md ${
                    time === t.value ? "bg-white text-black" : "bg-transparent"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <select
              className="border px-3 py-2 text-sm md:text-base md:px-4 md:py-3 rounded-md bg-transparent"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              {sections.map((s) => (
                <option key={s.value} value={s.value} className="bg-[#2A2A2A]">
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-16">
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
                      Start Date
                    </th>
                    <th className="border px-2 py-2 sm:px-4 sm:py-3">
                      End Date
                    </th>
                    <th className="border px-2 py-2 sm:px-4 sm:py-3">
                      {isAll ? "Page" : "Traffic Source"}
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
                        colSpan={7}
                      >
                        Ma'lumot topilmadi
                      </td>
                    </tr>
                  ) : (
                    rows.map((r: any, idx: number) => (
                      <tr key={idx}>
                        <td className="border px-2 py-2 sm:px-4 sm:py-3">
                          {r.startDate || r.start || "-"}
                        </td>
                        <td className="border px-2 py-2 sm:px-4 sm:py-3">
                          {r.endDate || r.end || "-"}
                        </td>
                        <td className="border px-2 py-2 sm:px-4 sm:py-3 capitalize">
                          {isAll ? r.page : r.trafficSource}
                        </td>
                        <td className="border px-2 py-2 sm:px-4 sm:py-3 text-center">
                          {r.uniqueVisitors ?? r.visitors ?? 0}
                        </td>
                        <td className="border px-2 py-2 sm:px-4 sm:py-3 text-center">
                          {r.pageViews ?? r.views ?? 0}
                        </td>
                        <td className="border px-2 py-2 sm:px-4 sm:py-3 text-center">
                          {(() => {
                            const seconds = r.avgTime ?? r.avg ?? 0;
                            const minutes = Math.floor(seconds / 60);
                            const remainingSeconds = Math.floor(seconds % 60);

                            if (minutes > 0) {
                              return `${minutes}m ${remainingSeconds}s`;
                            } else {
                              return `${remainingSeconds}s`;
                            }
                          })()}
                        </td>
                        <td className="border px-2 py-2 sm:px-4 sm:py-3 text-center">
                          {r.bounceRate ?? r.bounce ?? "0"} ta
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-10 sm:mt-16">
          <button
            onClick={handleImport}
            className="border w-full max-w-xs sm:max-w-none sm:w-auto px-8 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl rounded-md disabled:opacity-50"
            disabled={createPdf.isPending || isLoading}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrafficPage;
