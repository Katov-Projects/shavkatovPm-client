import { AuthLogin, IAuthCreate } from "../../interface";
import customAxios from "./customAxios";
import { AxiosError } from "axios";

export const checkAuth = async () => {
  try {
    const res = await customAxios.get("auth/token");
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const loginFetch = async (payload: AuthLogin) => {
  try {
    const res = await customAxios.post("auth/login", payload);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const authUpdateApi = async (payload: IAuthCreate) => {
  try {
    const res = await customAxios.put("auth/update", payload);
    return res.data;
  } catch (error: any) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Password update qilishda xatolik"
    );
  }
};
