import { AxiosError } from "axios";
import customAxios from "./customAxios";

export enum TimeQuery {
  day = "day",
  week = "week",
  month = "month",
}

export type SectionQuery =
  | "home"
  | "blogs"
  | "projects"
  | "services"
  | "faq"
  | "contact"
  | "about"
  | "all";

export const getStatsSections = async (
  time: TimeQuery,
  section: SectionQuery
) => {
  try {
    const res = await customAxios.get(`/statistics`, {
      params: { time, section },
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Projectnini olishda xatolik"
    );
  }
};

// moved below

export const createPdfApi = async (data: any) => {
  try {
    const res = await customAxios.post(`/statistics/pdf`, data, {
      responseType: "blob",
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Projectnini olishda xatolik"
    );
  }
};


export const getBlogStats = async (
  count: number,
  step: number,
  name: string
) => {
  try {
    const res = await customAxios.get(`/statistics/blog-stats`, {
      params: { count, step, name },
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "blog stats olishda xatolik"
    );
  }
};

export const createBlogPdfApi = async (data: any) => {
  try {
    const res = await customAxios.post(`/statistics/blog-pdf`, data, {
      responseType: "blob",
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Blog PDF yaratishda xatolik"
    );
  }
};
