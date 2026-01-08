import { useProduct } from "@/hooks/product/useProduct";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message, history, products } = await req.json();

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

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const chat = model.startChat({
      history: history,
      systemInstruction: {
        role: "system",
        parts: [
          {
            text: `
          You are 'Tapaiko Bot', the AI assistant for Tapaiko Bazar. 
          1. Only answer questions about groceries, shoes, clothes, and electronics. 
          2. If a user asks anything apart from groceries, shoes, clothes, and electronics, say: "I'm sorry, I only specialize in groceries, shoes, clothes, and electronics."
          3. You are an e-commerce bot. The user is currently looking at these products: ${JSON.stringify(products)}.
          4. Always suggest one related item when a user expresses interest in a product.
          5. Keep responses under 3 sentences unless listing product specs.
          6. Also answer accordingly in the language they asked if the user asks: ${JSON.stringify(predefinedQuestions)}
          `,
          },
        ],
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    //@ts-ignore
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
