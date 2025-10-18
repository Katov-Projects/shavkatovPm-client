"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  TimeQuery,
  SectionQuery,
  getStatsSections,
  createPdfApi,
  getBlogStats,
  createBlogPdfApi,
} from "@/service/api/stats";

// Fetch stats for an admin-selected time and section
export function useGetStatsSections(
  time: TimeQuery = TimeQuery.day,
  section: SectionQuery = "all"
) {
  const query = useQuery<{ rows: any[] } | any>({
    queryKey: ["stats-sections", time, section],
    queryFn: () => getStatsSections(time, section),
  });

  return query;
}

// Generate a PDF from the current stats data
export function useCreateStatsPdf() {
  return useMutation({
    mutationFn: async (payload: {
      time: TimeQuery;
      section: SectionQuery;
      data: any;
    }) => {
      const blob = await createPdfApi(payload);
      return blob as Blob;
    },
  });
}

export { TimeQuery };
export type { SectionQuery };

export function useGetBlogStats(count: number, step: number, name: string) {
  return useQuery({
    queryKey: ["blog-stats", count, step, name],
    queryFn: () => getBlogStats(count, step, name),
    placeholderData: (prevData) => prevData,
  });
}

export function useCreateBlogPdf() {
  return useMutation({
    mutationFn: async (payload: any) => {
      const blob = await createBlogPdfApi(payload);
      return blob as Blob;
    },
  });
}
