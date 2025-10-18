import { IBlogCreate, IBlogUpdate } from "../../interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBlogApi,
  deleteBlogApi,
  exitArchiveBlogApi,
  getAllBlogApi,
  getArchiveBlog,
  getByIdBlog,
  getSameTags,
  makeArchiveBlogApi,
  updateBlog,
} from "../api";

export const useBlogCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IBlogCreate) => createBlogApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllBlogs"] });
    },
  });
};

export const useGetAllBlog = (search?: string) => {
  return useQuery({
    queryKey: ["getAllBlogs", search],
    queryFn: () => getAllBlogApi(search),
    enabled: true,
  });
};

export const useAllArchiveBlog = () => {
  return useQuery({
    queryKey: ["getAllArchveBlog"],
    queryFn: getArchiveBlog,
  });
};

export const useGetByIdBlog = (id: string | undefined) => {
  return useQuery({
    queryKey: ["getByIdBlog", id],
    queryFn: () => getByIdBlog(id as string),
    enabled: Boolean(id),
  });
};

export const useGetSameTags = (blogId: string | undefined) => {
  return useQuery({
    queryKey: ["getSameTags", blogId],
    queryFn: () => getSameTags(blogId as string),
    enabled: Boolean(blogId),
  });
};

export const useBlogUpdate = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IBlogUpdate) => updateBlog(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getByIdBlog", id] });
      queryClient.invalidateQueries({ queryKey: ["getAllBlogs"] });
    },
  });
};

export const useMakeArchiveBlog = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => makeArchiveBlogApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["getAllArchveBlog"] });
    },
  });
};

export const useExitArchiveBlog = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => exitArchiveBlogApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["getAllArchveBlog"] });
    },
  });
};

export const useDeleteBlog = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteBlogApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["getAllArchveBlog"] });
    },
  });
};
