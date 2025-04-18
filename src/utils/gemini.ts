
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCkOXNC6YpgPkLg6xunZ70ZuXRAFttpp3I");

export async function getChatResponse(message: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "You are a focus buddy AI that helps users stay motivated and on track. Be encouraging but also fun and casual.",
        },
        {
          role: "model",
          parts: "Got it! I'll be your friendly focus buddy, keeping things light while helping you stay productive. I can offer encouragement, track your progress, or even give you a gentle nudge when needed - all with a positive vibe! 😊",
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return "Sorry, I'm having trouble connecting right now. Let's keep focusing though! 💪";
  }
}
