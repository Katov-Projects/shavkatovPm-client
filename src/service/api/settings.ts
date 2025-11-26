import customAxios from "./customAxios";
import { AxiosError } from "axios";
import { UpdateSettingsDto, Settings } from "@/interface";

export const getSettingsApi = async (): Promise<Settings> => {
  try {
    const res = await customAxios.get("/settings/all");
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateSettingsApi = async (
  payload: UpdateSettingsDto
): Promise<Settings> => {
  try {
    const res = await customAxios.patch("/settings/update", payload);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Settings ni update qilishda xatolik"
    );
  }
};
