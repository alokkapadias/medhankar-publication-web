// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Firestore Hero Slides Service (Cloud Synchronized Dynamic Hero Content)
// ==============================================================================

import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface HeroSlideData {
  id: string;
  orderIndex: number;
  badge: string;
  titleLine1: string;
  titleLine2: string;
  tagline: string;
  bookSlug: string;
  bookImage: string; // Cloudinary CDN URL or local asset
  isPreRendered3D: boolean;
  paperbackPrice?: string;
  digitalPrice?: string;
  hardcoverPrice?: string;
  backgroundColor?: string; // Optional custom background gradient/color
  backgroundImage?: string; // Optional custom background image from Cloudinary
  accentColor?: string;
  updatedAt?: any;
}

export const DEFAULT_HERO_SLIDES: HeroSlideData[] = [
  {
    id: 'vaishali',
    orderIndex: 0,
    badge: 'POPULAR BOOK',
    titleLine1: 'वैशाली की',
    titleLine2: 'आम्रपाली',
    tagline: 'इतिहास, संस्कृति और आम्रपाली की अनकही गाथा।',
    bookSlug: 'vaishali-ki-amrapali',
    bookImage: '/book-on-pedestal.png',
    isPreRendered3D: true,
    paperbackPrice: '₹499',
    digitalPrice: '₹249',
    hardcoverPrice: '₹799',
    backgroundColor: '',
    backgroundImage: 'https://i.ibb.co/DP5xsZJ1/Serene-Buddha-Amidst-Temple-Light.png',
  },
  {
    id: 'architecture',
    orderIndex: 1,
    badge: 'PHILOSOPHY & THOUGHT',
    titleLine1: 'द आर्किटेक्चर ऑफ',
    titleLine2: 'आइडियाज',
    tagline: 'विचारों को स्थायी साहित्यिक संरचना में ढालने की कला।',
    bookSlug: 'the-architecture-of-ideas',
    bookImage: '/covers/architecture.jpg',
    isPreRendered3D: false,
    paperbackPrice: '₹499',
    digitalPrice: '₹249',
    hardcoverPrice: '₹699',
    backgroundColor: '',
    backgroundImage: '',
  },
  {
    id: 'quietly',
    orderIndex: 2,
    badge: 'ESSAYS & REFLECTION',
    titleLine1: 'शांत मन की',
    titleLine2: 'शक्ति',
    tagline: 'व्यक्तिगत विकास, आंतरिक शांति और धैर्य पर विचारशील निबंध।',
    bookSlug: 'quietly-becoming',
    bookImage: '/covers/quietly.jpg',
    isPreRendered3D: false,
    paperbackPrice: '₹399',
    digitalPrice: '₹199',
    hardcoverPrice: '₹599',
    backgroundColor: '',
    backgroundImage: '',
  },
];

const COLLECTION_NAME = 'hero_slides';

/**
 * Subscribes to real-time hero slides changes in Firestore.
 * Automatically orders slides by orderIndex.
 */
export function subscribeHeroSlides(
  onData: (slides: HeroSlideData[]) => void,
  onError?: (err: Error) => void
): () => void {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('orderIndex', 'asc'));
    return onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          onData(DEFAULT_HERO_SLIDES);
        } else {
          const slides: HeroSlideData[] = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...(docSnap.data() as Omit<HeroSlideData, 'id'>),
          }));
          onData(slides);
        }
      },
      (error) => {
        console.warn('Firestore subscription fallback to defaults:', error);
        if (onError) onError(error);
        onData(DEFAULT_HERO_SLIDES);
      }
    );
  } catch (err) {
    console.error('Error creating Firestore subscription:', err);
    onData(DEFAULT_HERO_SLIDES);
    return () => {};
  }
}

/**
 * Retrieves all hero slides once from Firestore.
 */
export async function getHeroSlides(): Promise<HeroSlideData[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('orderIndex', 'asc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return DEFAULT_HERO_SLIDES;
    }
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<HeroSlideData, 'id'>),
    }));
  } catch (err) {
    console.warn('Error reading hero_slides, using defaults:', err);
    return DEFAULT_HERO_SLIDES;
  }
}

/**
 * Saves or updates a hero slide document in Firestore.
 */
export async function saveHeroSlide(slide: HeroSlideData): Promise<void> {
  const slideRef = doc(db, COLLECTION_NAME, slide.id);
  const dataToSave = {
    ...slide,
    updatedAt: serverTimestamp(),
  };
  await setDoc(slideRef, dataToSave, { merge: true });
}

/**
 * Deletes a hero slide from Firestore.
 */
export async function deleteHeroSlide(slideId: string): Promise<void> {
  const slideRef = doc(db, COLLECTION_NAME, slideId);
  await deleteDoc(slideRef);
}

/**
 * Seeds default demonstration slides into Firestore if not yet populated.
 */
export async function seedDefaultHeroSlides(): Promise<void> {
  for (const slide of DEFAULT_HERO_SLIDES) {
    await saveHeroSlide(slide);
  }
}
