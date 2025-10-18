import { ICreateCategory, IUpdateCategory } from "../../interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategoryApi,
  deleteCategoryApi,
  getAllCategoryApi,
  getCategoryByBlogCountsApi,
  getCategoryByBlogsApi,
  getByIdCategoryApi,
  updateCategoryApi,
} from "../api/category";

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: ["getAllCategory"],
    queryFn: getAllCategoryApi,
  });
};

export const useGetCategoryById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["getCategoryById", id],
    queryFn: () => getByIdCategoryApi(id as string),
    enabled: Boolean(id),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ICreateCategory) => createCategoryApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllCategory"] });
    },
  });
};

export const useUpdateCategory = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IUpdateCategory) => updateCategoryApi(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCategoryById", id] });
      queryClient.invalidateQueries({ queryKey: ["getAllCategory"] });
    },
  });
};

export const useDeleteCategory = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteCategoryApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllCategory"] });
    },
  });
};

// Extra hooks for blog page
export const useGetCategoryWithCounts = () => {
  return useQuery({
    queryKey: ["getCategoryWithCounts"],
    queryFn: getCategoryByBlogCountsApi,
  });
};

export const useGetBlogsByCategory = (categoryId: string | undefined) => {
  return useQuery({
    queryKey: ["getBlogsByCategory", categoryId],
    queryFn: () => getCategoryByBlogsApi(categoryId as string),
    enabled: Boolean(categoryId),
  });
};
