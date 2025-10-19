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
      system: `You are an AI assistant for a healthcare application. Your role is to provide helpful and accurate information about health-related topics.

      - ONLY answer questions related to health, wellness, medicine, and fitness.
      - If a user asks an unrelated question, politely decline and state that you can only answer health questions. For example: "I'm sorry, but I can only answer questions about health and wellness. How can I help you with that?"
      - Format your responses using Markdown for better readability. Use things like lists, bold text, and paragraphs.`,
    });

    return { response: llmResponse.text };
  }
);
