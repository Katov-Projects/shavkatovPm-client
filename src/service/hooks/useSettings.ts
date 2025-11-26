import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettingsApi, updateSettingsApi } from "../api/settings";
import { UpdateSettingsDto } from "@/interface";

export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsApi,
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateSettingsDto) => updateSettingsApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      queryClient.refetchQueries({ queryKey: ["settings"] });
    },
  });
};
