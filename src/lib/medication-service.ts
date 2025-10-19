
'use client';

import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  Query,
  DocumentData,
  Firestore,
  DocumentSnapshot,
  select,
} from 'firebase/firestore';

// Assuming Medication type is defined in your types file
import { Medication } from './types';

// Add an 'id' to the Medication type for use in the application
type MedicationWithId = Medication & { id: string };

/**
 * Fetches a paginated list of medications for a specific user, optimized for performance.
 *
 * @param {Firestore} db - The Firestore instance.
 * @param {string} userId - The ID of the user whose medications to fetch.
 * @param {DocumentSnapshot<DocumentData> | null} lastVisible - The last visible document snapshot from the previous fetch, used for pagination. Pass null to fetch the first page.
 * @returns {Promise<{ medications: MedicationWithId[], lastVisible: DocumentSnapshot<DocumentData> | null }>} An object containing the list of medications and the snapshot of the last document for the next page query.
 */
export async function getMedications(
  db: Firestore,
  userId: string,
  lastVisible: DocumentSnapshot<DocumentData> | null
): Promise<{ medications: MedicationWithId[]; lastVisible: DocumentSnapshot<DocumentData> | null }> {
  try {
    // Define the base query targeting the user's medications collection
    const medicationsColRef = collection(db, 'users', userId, 'medications');

    // Create the base query with field selection, ordering, and limit
    let q: Query<DocumentData> = query(
      medicationsColRef,
      // 1. Select only the necessary fields
      select('name', 'dosage', 'frequency'),
      // 2. Order the results by name
      orderBy('name', 'asc'),
      // 3. Limit the results to 50 items
      limit(50)
    );

    // 4. If lastVisible document is provided, start the query after it for pagination
    if (lastVisible) {
      q = query(q, startAfter(lastVisible));
    }

    const querySnapshot = await getDocs(q);

    // Map documents to the MedicationWithId type
    const medications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Medication, 'id' | 'userId' | 'startDate' | 'reminders' | 'instructions'>),
    } as MedicationWithId));

    // Get the last visible document for the next pagination query
    const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return {
      medications,
      lastVisible: newLastVisible,
    };
  } catch (error) {
    console.error('Error fetching medications:', error);
    // In a real app, you'd want more robust error handling
    throw new Error('Failed to fetch medications.');
  }
}

/**
 * --- HOW TO USE THIS FUNCTION ---
 *
 * import { getMedications } from '@/lib/medication-service';
 * import { useFirestore, useUser } from '@/firebase/provider';
 * import { useState, useEffect } from 'react';
 * import { DocumentSnapshot, DocumentData } from 'firebase/firestore';
 *
 * function MedicationListComponent() {
 *   const firestore = useFirestore();
 *   const { user } = useUser();
 *   const [meds, setMeds] = useState<any[]>([]);
 *   const [lastDoc, setLastDoc] = useState<DocumentSnapshot<DocumentData> | null>(null);
 *   const [hasMore, setHasMore] = useState(true);
 *
 *   const fetchMoreMedications = async () => {
 *     if (!user || !firestore || !hasMore) return;
 *
 *     const { medications, lastVisible } = await getMedications(firestore, user.uid, lastDoc);
 *
 *     setMeds(prev => [...prev, ...medications]);
 *     setLastDoc(lastVisible);
 *
 *     if (!lastVisible) {
 *       setHasMore(false);
 *     }
 *   };
 *
 *   // Fetch initial data
 *   useEffect(() => {
 *     fetchMoreMedications();
 *   }, [user, firestore]);
 *
 *   return (
 *     <div>
 *       <ul>
 *         {meds.map(med => <li key={med.id}>{med.name}</li>)}
 *       </ul>
 *       {hasMore && <button onClick={fetchMoreMedications}>Load More</button>}
 *     </div>
 *   );
 * }
 */
