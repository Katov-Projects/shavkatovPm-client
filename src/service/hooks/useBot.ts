import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBot } from "../api";


interface Bot {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  phone: string;
  subject: string;
  telegram: string
};


export const useBot = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (botMessage: Bot) => postBot(botMessage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["botMessages"] });
    },
    onError: (error) => {
      console.error("Bot message yuborishda xatolik:", error);
    },
  });
}