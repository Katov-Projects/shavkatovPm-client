import { ICreateProject, IUpdateProject } from "../../interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProjectApi,
  deleteProjectApi,
  exitArchiveProjectApi,
  getAllProject,
  getArchiveProject,
  getByIdProject,
  makeArchiveProjectApi,
  updateProject,
} from "../api/project";

export const useGetAllProjects = () => {
  return useQuery({
    queryKey: ["getAllProjects"],
    queryFn: getAllProject,
  });
};

export const useGetArchiveProjects = () => {
  return useQuery({
    queryKey: ["getArchiveProjects"],
    queryFn: getArchiveProject,
  });
};

export const useGetProjectById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["getProjectById", id],
    queryFn: () => getByIdProject(id as string),
    enabled: Boolean(id),
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ICreateProject) => createProjectApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProjects"] });
    },
  });
};

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IUpdateProject) => updateProject(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProjectById", id] });
      queryClient.invalidateQueries({ queryKey: ["getAllProjects"] });
      queryClient.invalidateQueries({ queryKey: ["getArchiveProjects"] });
    },
  });
};

export const useArchiveProject = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => makeArchiveProjectApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProjects"] });
      queryClient.invalidateQueries({ queryKey: ["getArchiveProjects"] });
    },
  });
};

export const useUnarchiveProject = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => exitArchiveProjectApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProjects"] });
      queryClient.invalidateQueries({ queryKey: ["getArchiveProjects"] });
    },
  });
};

export const useDeleteProject = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteProjectApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProjects"] });
      queryClient.invalidateQueries({ queryKey: ["getArchiveProjects"] });
    },
  });
};

export const useAllProject = () => {
  return useQuery({
    queryKey: ["getAllProject"],
    queryFn: getAllProject,
  });
};
