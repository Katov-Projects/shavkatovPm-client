import customAxios from "./customAxios";
import { AxiosError } from "axios";

export const getSettingsApi = async () => {
  try {
    const res = await customAxios.get("/settings/all");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateSettingsApi = async (blogSortBy: string) => {
  try {
    const res = await customAxios.put("/settings/update", { blogSortBy });
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Settings ni update qilishda xatolik"
    );
  }
};
