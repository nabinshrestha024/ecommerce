"use client";

import { useEffect, useRef, useState } from "react";

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
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach our support team via email or phone from 9 AM to 6 PM.",
  },
];

type Message = {
  sender: "user" | "bot";
  text: string;
  typing?: boolean;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      const t = setTimeout(() => {
        setMessages([
          {
            sender: "bot",
            text: "Hi! Welcome to our website! How can I help you?",
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
    setMessages((prev) => [...prev, { sender: "user", text: q }]);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "Typing...", typing: true },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev.filter((m) => !m.typing),
        { sender: "bot", text: a },
      ]);
    }, 1000);
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
        <div className="fixed bottom-24 right-6 w-80 h-[350px] bg-white rounded-xl flex flex-col shadow-xl animate-slideUp">
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
            <div className="h-[200px] p-4 overflow-y-auto">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex mb-2 ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  } animate-fadeIn`}
                >
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                      m.sender === "user"
                        ? "bg-green-600 text-white"
                        : "bg-green-100 text-green-800"
                    } ${m.typing ? "italic opacity-60" : ""}`}
                  >
                    {m.typing ? "Typing…" : m.text}
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
                  className="whitespace-nowrap px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs cursor-pointer flex-shrink-0 hover:bg-green-100"
                >
                  {item.question}
                </button>
              ))}
            </div>
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
