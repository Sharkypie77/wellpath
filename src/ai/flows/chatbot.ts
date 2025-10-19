'use server';

/**
 * @fileOverview A simple chatbot flow.
 *
 * - chat - A function that continues a conversation.
 */

import { ai } from '@/ai/genkit';
import {
  ChatbotInputSchema,
  ChatbotOutputSchema,
  type ChatbotInput,
  type ChatbotOutput,
} from '@/lib/types';

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
    const { history, prompt } = input;
    const chatHistory = history.map((msg) => ({
      role: msg.role,
      content: [{ text: msg.content }],
    }));

    const llmResponse = await ai.generate({
      prompt: prompt,
      history: chatHistory,
      model: 'googleai/gemini-2.5-flash',
    });

    return { response: llmResponse.text };
  }
);
