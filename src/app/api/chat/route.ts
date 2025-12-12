import { openai } from "@/lib/openai";
import { updateThemeDef } from "@/tools/definitions";
import { chat, toStreamResponse } from "@tanstack/ai";

export async function POST(request: Request) {
  const { messages, conversationId } = await request.json();

  const stream = chat({
    adapter: openai,
    messages,
    model: "gpt-4",
    conversationId,
    tools: [updateThemeDef],
  });

  // Convert stream to HTTP response
  return toStreamResponse(stream);
}
