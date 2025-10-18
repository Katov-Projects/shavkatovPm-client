import { IBlogCreate, IBlogUpdate } from "../../interface";
import customAxios from "./customAxios";
import { AxiosError } from "axios";

export const createBlogApi = async (payload: IBlogCreate) => {
  try {
    const res = await customAxios.post("/blog/create", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllBlogApi = async (search?: string) => {
  try {
    const url = search ? `/blog/all?search=${search}` : '/blog/all';
    const res = await customAxios.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getArchiveBlog = async () => {
  try {
    const res = await customAxios.get("/blog/all-archive");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getByIdBlog = async (id: string) => {
  try {
    const res = await customAxios.get(`/blog/getById/${id}`);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || "Blogni olishda xatolik");
  }
};

export const getSameTags = async (blogId: string) => {
  try {
    const res = await customAxios.get(`/blog/sam-tags/${blogId}`);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || "Bloglarni olishda xatolik");
  }
};

export const setViewBlogApi = async (id: string, userId: string) => {
  try {
    const res = await customAxios.patch(`/blog/set-view/${id}`, { userId });
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || "Blog ko'rishini oshirishda xatolik");
  }
};

export const updateBlog = async (id: string, payload: IBlogUpdate) => {
  try {
    const res = await customAxios.put(`/blog/update/${id}`, payload);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Blogni update qilishda xatolik"
    );
  }
};

export const makeArchiveBlogApi = async (id: string) => {
  try {
    const res = await customAxios.patch(`/blog/make-archive/${id}`);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Blogni arxiv qilishda xatolik"
    );
  }
};

export const exitArchiveBlogApi = async (id: string) => {
  try {
    const res = await customAxios.patch(`/blog/exit-archive/${id}`);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Blogni arxivdan chiqarishda xatolik"
    );
  }
};

export const deleteBlogApi = async (id: string) => {
  try {
    const res = await customAxios.delete(`/blog/delete/${id}`);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(
      err.response?.data?.message || "Blogni o'chirishda xatolik"
    );
  }
};
