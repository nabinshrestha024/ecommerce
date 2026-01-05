import axios from "axios";

type HistoryType = {
  role: "user" | "model";
  parts: {
    text: string;
  }[];
};

export const sendPrompt = async ({
  message,
  history,
}: {
  message: string;
  history: HistoryType[];
}) => {
  const res = await axios.post("/apis/chatbot", { message, history });
  return res.data;
};
