'use server';

/**
 * @fileOverview A simple chatbot flow.
 *
 * - chat - A function that continues a conversation.
 * - ChatbotMessage - The message type for the chatbot.
 * - ChatbotInput - The input type for the chatbot function.
 * - ChatbotOutput - The return type for the chatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const ChatbotMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatbotMessage = z.infer<typeof ChatbotMessageSchema>;

export const ChatbotInputSchema = z.object({
  history: z.array(ChatbotMessageSchema),
  prompt: z.string(),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

export const ChatbotOutputSchema = z.object({
  response: z.string(),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function chat(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const { history } = input;

    const llmResponse = await ai.generate({
      prompt: history[history.length - 1].content,
      history: history.slice(0, -1),
      model: 'googleai/gemini-2.5-flash',
    });

    return { response: llmResponse.text };
  }
);
