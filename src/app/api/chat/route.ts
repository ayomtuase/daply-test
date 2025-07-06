import { google } from "@ai-sdk/google";
import { streamText } from "ai";

const defaultPrompt = `You are a helpful assistant.
    Ensure your answers are in plain text and not markdown.
    Strip out all markdown formatting.`;

export async function POST(req: Request) {
  const { messages, universalPrompt } = await req.json();

  const systemPrompt = universalPrompt
    ? `${universalPrompt}\n\n${defaultPrompt}`
    : defaultPrompt;

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
