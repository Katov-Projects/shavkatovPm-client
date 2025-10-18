import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkAuth, loginFetch, authUpdateApi } from "../api";
import { AuthLogin, IAuthCreate } from "../../interface";

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ["checkauth"],
    queryFn: checkAuth,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AuthLogin) => loginFetch(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });
};

export const useAuthUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IAuthCreate) => authUpdateApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkauth"] });
    },
  });
};
