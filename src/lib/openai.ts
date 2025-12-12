import { createOpenAI } from "@tanstack/ai-openai";

export const openai = createOpenAI(process.env.OPENAI_API_KEY!, {
  baseURL: process.env.OPENAI_BASE_URL!,
});
