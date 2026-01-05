"use client";

import { useSendPrompt } from "@/hooks/chatbot/useSendPrompt";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const predefinedQuestions = [
  {
    question: "What are your delivery options?",
    answer:
      "We offer standard and express delivery. Delivery time depends on your location.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you’ll receive a tracking link via email.",
  },
  {
    question: "What is your return policy?",
    answer:
      "You can return products within 7 days of delivery if they are unused and in original packaging.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept only eSewa as digital payment for the time being and cash on delivery is accepted as well.",
  },
];

type Message = {
  role: "user" | "model";
  parts: {
    text: string;
  }[];
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const sendPrompt = useSendPrompt();

  useEffect(() => {
    if (open && messages.length === 0) {
      const t = setTimeout(() => {
        setMessages([
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [
              {
                text: "Hi! I am Tapaiko Bot, your personal AI Assistant! How can I help you?",
              },
            ],
          },
        ]);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [open, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuestionClick = (q: string, a: string) => {
    setMessages((prev) => [...prev, { role: "user", parts: [{ text: q }] }]);
    setMessages((prev) => [
      ...prev,
      { role: "model", parts: [{ text: "Loading" }] },
    ]);
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((val) =>
          val.parts[0].text === "Loading"
            ? { ...val, role: "model", parts: [{ text: a }] }
            : val,
        ),
      );
    }, 2000);
  };

  const handleSend = () => {
    const tempHistory = messages;
    setMessages((prev) => [
      ...prev,
      { role: "user", parts: [{ text: prompt }] },
      { role: "model", parts: [{ text: "Loading" }] },
    ]);
    sendPrompt.mutate(
      { message: prompt, history: tempHistory },
      {
        onSuccess: (data) => {
          setMessages((prev) =>
            prev.map((val) =>
              val.parts[0].text === "Loading"
                ? { ...val, role: "model", parts: [{ text: data.text }] }
                : val,
            ),
          );
        },
        onError: () => {
          setMessages((prev) => [
            ...prev,
            {
              role: "model",
              parts: [
                {
                  text: "There was a problem with the AI assistant at the moment",
                },
              ],
            },
          ]);
        },
      },
    );
    setPrompt("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-green-600 shadow-lg flex items-center justify-center border-none cursor-pointer"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 w-100 h-[450px] bg-white rounded-xl flex flex-col shadow-xl animate-slideUp">
          <div className="px-4 py-3 bg-green-600 text-white font-semibold flex justify-between items-center rounded-t-xl">
            Store Support
            <span
              onClick={() => setOpen(false)}
              className="cursor-pointer text-lg"
            >
              ✕
            </span>
          </div>
          <div className="flex flex-col bg-green-50 rounded-2xl">
            <div className="h-80 p-4 overflow-y-auto">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex mb-2 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  } animate-fadeIn`}
                >
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                      m.role === "user"
                        ? "bg-green-600 text-white"
                        : "bg-green-100 text-green-800"
                    } `}
                  >
                    {m.role === "model" && m.parts[0].text === "Loading" ? (
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce" />
                      </div>
                    ) : m.role === "model" ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.parts[0].text}
                      </ReactMarkdown>
                    ) : (
                      m.parts[0].text
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <div className="flex flex-wrap gap-2 p-2 px-4">
              {predefinedQuestions.map((item, i) => (
                <button
                  key={i}
                  onClick={() =>
                    handleQuestionClick(item.question, item.answer)
                  }
                  className="whitespace-nowrap px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs cursor-pointer shrink-0 hover:bg-green-100"
                >
                  {item.question}
                </button>
              ))}
            </div>
            <form className="flex justify-between px-4 pb-3 gap-3">
              <Input
                type="text"
                placeholder="Type your message..."
                className="h-9 rounded-full px-4 text-sm bg-gray-100 border border-gray-200 
               focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button
                className="bg-[#4EA674] flex items-center justify-center h-9 w-9 shrink-0 rounded-full"
                onClick={handleSend}
                disabled={!Boolean(prompt)}
              >
                <Send size={20} color="white" />
              </Button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.25s ease;
        }
        .animate-slideUp {
          animation: slideUp 0.25s ease;
        }
      `}</style>
    </>
  );
}
