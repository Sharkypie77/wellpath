'use server';

/**
 * @fileOverview A flow to fetch a summarized list of education articles.
 *
 * - summarizeEducation - A function that returns a list of the latest 50 articles
 *   with a limited set of fields (title, summary, category).
 */

import { ai } from '@/ai/genkit';
import { onFlow } from 'genkit/flow';
import { z } from 'genkit';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  select,
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase/init';

// Define the output schema for a single article summary
const ArticleSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  category: z.string(),
});

// Define the output schema for the entire flow
const SummarizeEducationOutputSchema = z.array(ArticleSummarySchema);
export type SummarizeEducationOutput = z.infer<
  typeof SummarizeEducationOutputSchema
>;

// This is the main function that will be exposed as an endpoint.
export const summarizeEducation = ai.defineFlow(
  {
    name: 'summarizeEducation',
    outputSchema: SummarizeEducationOutputSchema,
  },
  async () => {
    console.log('Summarize education flow started');
    
    // We need to initialize Firebase here to get a server-side Firestore instance.
    // This does not use the client-side providers.
    const { firestore } = initializeFirebase();

    const articlesRef = collection(firestore, 'health_articles');
    const q = query(
      articlesRef,
      orderBy('publishDate', 'desc'),
      limit(50),
      select('title', 'summary', 'category') // Select only the required fields
    );

    try {
      const querySnapshot = await getDocs(q);
      const articles = querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        summary: doc.data().summary,
        category: doc.data().category,
      }));
      
      console.log(`Successfully fetched ${articles.length} articles.`);
      return articles;
    } catch (error) {
      console.error('Error fetching articles from Firestore:', error);
      // In a real application, you might want to handle this more gracefully
      throw new Error('Failed to fetch education articles.');
    }
  }
);

// Optional: You can also export a simple wrapper if needed elsewhere
export async function getSummarizedEducation(): Promise<SummarizeEducationOutput> {
  return await summarizeEducation();
}
