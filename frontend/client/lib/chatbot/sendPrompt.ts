import { ProductResponse } from "@/hooks/product/useProduct";
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
  products,
}: {
  message: string;
  history: HistoryType[];
  products: ProductResponse | undefined;
}) => {
  const res = await axios.post("/apis/chatbot", { message, history, products });
  return res.data;
};
