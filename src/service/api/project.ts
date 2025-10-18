import { AxiosError } from "axios";
import customAxios from "./customAxios";
import { ICreateProject, IUpdateProject } from "@/interface";

export const getAllProject = async () => {
  try {
    const res = await customAxios.get("/project/all");
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Projectlarnini olishda xatolik"
    );
  }
};

export const getArchiveProject = async () => {
  try {
    const res = await customAxios.get("/project/archive");
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Arxivlangan Projectlarni olishda xatolik"
    );
  }
};

export const createProjectApi = async (payload: ICreateProject) => {
  try {
    const res = await customAxios.post("/project/create", payload);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Projectnini yaratishda xatolik"
    );
  }
};

export const getByIdProject = async (id: string) => {
  try {
    const res = await customAxios.get(`/project/${id}`);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || "Projectnini olishda xatolik");
  }
};

export const updateProject = async (id: string, payload: IUpdateProject) => {
  try {
    const res = await customAxios.put(`/project/update/${id}`, payload);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Projectnini update qilishda xatolik"
    );
  }
};

export const makeArchiveProjectApi = async (id: string) => {
  try {
    const res = await customAxios.patch(`/project/archive/${id}`);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Blogni arxiv qilishda xatolik"
    );
  }
};

export const exitArchiveProjectApi = async (id: string) => {
  try {
    const res = await customAxios.patch(`/project/unarchive/${id}`);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Blogni arxivdan chiqarishda xatolik"
    );
  }
};

export const deleteProjectApi = async (id: string) => {
  try {
    const res = await customAxios.delete(`/project/${id}`);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Blogni o'chirishda xatolik"
    );
  }
};