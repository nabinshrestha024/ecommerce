import { sendPrompt } from "@/lib/chatbot/sendPrompt";
import { useMutation } from "@tanstack/react-query";

export const useSendPrompt = () => {
  const data = useMutation({
    mutationKey: ["sendPrompt"],
    mutationFn: sendPrompt,
  });
  return data;
};
