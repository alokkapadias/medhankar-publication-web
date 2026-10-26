// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Demonstration Catalogue Data with High-Resolution Covers
// ==============================================================================

import type { Book } from '../types';

export const DEMO_BOOKS: Book[] = [
  {
    id: 'bk-vaishali',
    slug: 'vaishali-ki-amrapali',
    title: 'वैशाली की आम्रपाली',
    subtitle: 'ऐतिहासिक एवं सांस्कृतिक कालजयी उपन्यास',
    author: {
      id: 'auth-medhankar',
      name: 'डॉ. लाल जी मेधांकर',
      bio: 'संस्थापक एवं वरिष्ठ लेखक, मेधांकर ग्राफिक्स एंड पब्लिकेशंस प्राइवेट लिमिटेड।',
      location: 'पुणे, भारत',
    },
    description:
      'वैशाली की नगरवधू आम्रपाली के आत्म-संघर्ष, वैभव और भगवान बुद्ध की शरण में आध्यात्मिक मुक्ति की अमर गाथा।',
    synopsisLong:
      'वैशाली के लोकतंत्र, कला और वैभव के स्वर्णिम काल की पृष्ठभूमि पर आधारित यह उपन्यास नगरवधू आम्रपाली के जीवन के अनछुए पहलुओं को उजागर करता है। जब तथागत बुद्ध वैशाली पधारे, तो आम्रपाली ने अपना सर्वस्व त्याग कर संघ की शरण ली। डॉ. लाल जी मेधांकर की यह कृति इतिहास, दर्शन और मानवीय संवेदनाओं का अनुपम संगम है।',
    genre: 'Literature & Fiction',
    language: 'Hindi',
    availableFormats: ['hardcover', 'paperback', 'ebook'],
    publicationStatus: 'Available',
    isbn: '978-93-80000-00-5',
    pageCount: 298,
    publicationYear: 2025,
    coverImageUrl: '/firefly-amrapali-3d.png',
    coverPalette: {
      background: '#2D3E9E',
      text: '#FFFFFF',
      accent: '#FFDE00',
      pattern: 'editorial',
    },
    sampleExcerpt: {
      chapterTitle: 'प्रकरण १: वैशाली का स्वर्णिम प्रांगण',
      content: [
        'वैशाली की संध्या जब गंडक नदी की लहरों पर सिंदूरी आभा बिखेरती थी, तब नगर की अट्टालिकाओं से संगीत की मधुर तानें गूंज उठती थीं।',
        'आम्रपाली केवल एक रूपसी नहीं थी, वह वैशाली के गौरव, स्वाभिमान और स्वतंत्र गणराज्य की जीवंत आत्मा थी।',
        'परंतु राजसी वैभव के इस आवरण के पीछे मुक्ति की एक मौन अभीप्सा निरंतर सुलग रही थी, जो तथागत के चरणों में पहुंचकर ही शांत हुई।',
      ],
    },
    samplePrice: {
      paperback: '₹299.00',
      hardcover: '₹450.00',
      ebook: '₹149.00',
    },
  },
  {
    id: 'bk-001',
    slug: 'the-architecture-of-ideas',
    title: 'The Architecture of Ideas',
    subtitle: 'Structuring thoughts into enduring literary frameworks',
    author: {
      id: 'auth-01',
      name: 'Aarav Deshmukh',
      bio: 'Author and design philosopher focusing on cognitive frameworks and intellectual clarity.',
      location: 'Pune, India',
    },
    description:
      'An exploration of how written ideas are conceived, structured, and preserved across changing cultural epochs.',
    synopsisLong:
      'In The Architecture of Ideas, Aarav Deshmukh investigates the silent discipline behind lasting writing. Drawing from architectural principles, typographic heritage, and intellectual history, this volume treats a book not merely as gathered text, but as a habitable space of thought. From the foundational premise to structural cadence, Deshmukh examines how writers sculpt clarity out of ambiguity.',
    genre: 'Philosophy & Thought',
    language: 'English',
    availableFormats: ['paperback', 'hardcover', 'ebook'],
    publicationStatus: 'Available',
    isbn: '978-93-80000-01-2',
    pageCount: 284,
    publicationYear: 2025,
    coverImageUrl: '/covers/architecture.jpg',
    coverPalette: {
      background: '#142D52',
      text: '#FFFFFF',
      accent: '#E5C07B',
      pattern: 'arch',
    },
    sampleExcerpt: {
      chapterTitle: 'Chapter I: The Groundwork of a Sentence',
      content: [
        'Before a book commands an audience, it must first sustain its own internal gravity. We often think of books as accumulations of words, yet words alone are merely bricks unmortared.',
        'Architecture requires an understanding of weight, tension, and light. In literary composition, weight is assigned by precision, tension is maintained through pacing, and light is introduced whenever an obscure intuition is brought cleanly into focus.',
        'When we construct a chapter, we are inviting a mind into a room that did not previously exist. Every corner must feel intentional, every corridor justified by where it leads.',
      ],
    },
    samplePrice: {
      paperback: '₹499.00',
      ebook: '₹249.00',
      hardcover: '₹799.00',
    },
  },
  {
    id: 'bk-002',
    slug: 'quietly-becoming',
    title: 'Quietly Becoming',
    subtitle: 'Essays on personal evolution, stillness, and patience',
    author: {
      id: 'auth-02',
      name: 'Meera Sen',
      bio: 'Essayist and literary observer whose writing explores introspection and modern pace.',
      location: 'Bengaluru, India',
    },
    description:
      'A collection of thoughtful essays examining personal transitions, quiet moments of growth, and intentional living.',
    synopsisLong:
      'Quietly Becoming resists the noisy rush of contemporary existence. In twelve meditative reflections, Meera Sen observes the unheralded milestones that reshape identity: the decisions made in silence, the departures that leave no dramatic trace, and the patient art of letting understanding ripen.',
    genre: 'Essays & Commentary',
    language: 'English',
    availableFormats: ['paperback', 'ebook', 'audiobook'],
    publicationStatus: 'Available',
    isbn: '978-93-80000-02-9',
    pageCount: 216,
    publicationYear: 2025,
    coverImageUrl: '/covers/quietly.jpg',
    coverPalette: {
      background: '#2B4C47',
      text: '#FAF7F2',
      accent: '#D4AF37',
      pattern: 'minimal',
    },
    sampleExcerpt: {
      chapterTitle: 'Essay II: On Not Rushing the Morning',
      content: [
        'Growth in the natural world seldom makes an announcement. A seed splits its husk in utter darkness, unnoticed by the soil that shelters it.',
        'We measure our lives by sudden verdicts and visible appointments, but the interior transformations happen when no one is watching—not even ourselves.',
        'To accept stillness is not to pause ambition; it is to allow the sediment to settle until the water runs clear again.',
      ],
    },
    sampleAudioAvailable: true,
    sampleAudioDuration: '3 min sample',
    samplePrice: {
      paperback: '₹399.00',
      ebook: '₹199.00',
    },
  },
  {
    id: 'bk-003',
    slug: 'stories-from-the-monsoon',
    title: 'Stories from the Monsoon',
    subtitle: 'Fiction inspired by rain-swept coastal towns and enduring memories',
    author: {
      id: 'auth-03',
      name: 'Vikram Joshi',
      bio: 'Fiction writer chronicling regional narratives and coastal landscapes.',
      location: 'Ratnagiri, India',
    },
    description:
      'Nine interconnected short stories set across coastal towns during the arrival of the southwest monsoon.',
    synopsisLong:
      'When the first clouds gather over the Arabian Sea, small coastal towns undergo a collective shift in rhythm. Vikram Joshi captures the arrival of rain not merely as seasonal weather, but as a catalyst for confessions, reconciliations, and buried memories.',
    genre: 'Literature & Fiction',
    language: 'English',
    availableFormats: ['paperback', 'hardcover', 'ebook'],
    publicationStatus: 'Available',
    isbn: '978-93-80000-03-6',
    pageCount: 312,
    publicationYear: 2024,
    coverImageUrl: '/covers/monsoon.jpg',
    coverPalette: {
      background: '#1F3A4B',
      text: '#F0F8FF',
      accent: '#7EB6D9',
      pattern: 'monsoon',
    },
    sampleExcerpt: {
      chapterTitle: 'The Rooftop at Shiroda',
      content: [
        'The rain did not arrive with thunder. It began as a faint cooling of the afternoon salt air, a sudden rustle through the coconut fronds that made the veranda goats lift their ears.',
        'By four o’clock, the sky had lowered into a heavy bruised slate. Anand climbed the wooden ladder to the terrace to secure the terracotta tiles before the squall broke.',
        'From up there, he could see the entire coastline turning grey, sea and sky blurring into a single unbroken horizon.',
      ],
    },
    samplePrice: {
      paperback: '₹450.00',
      hardcover: '₹699.00',
      ebook: '₹220.00',
    },
  },
  {
    id: 'bk-004',
    slug: 'the-thoughtful-entrepreneur',
    title: 'The Thoughtful Entrepreneur',
    subtitle: 'Sustainable enterprise, ethical craftsmanship, and long-term value',
    author: {
      id: 'auth-04',
      name: 'Rohan Kulkarni',
      bio: 'Researcher and business adviser focusing on intergenerational business health.',
      location: 'Mumbai, India',
    },
    description:
      'A measured perspective on building businesses rooted in operational integrity, disciplined craft, and lasting community trust.',
    synopsisLong:
      'Moving past reckless scale and speculative hype, The Thoughtful Entrepreneur presents a case for durable craftsmanship in modern commerce. Rohan Kulkarni interviews founders of family-run enterprises, independent printers, and specialized workshops who prioritize resilience over transient spectacle.',
    genre: 'Business & Leadership',
    language: 'English',
    availableFormats: ['paperback', 'ebook'],
    publicationStatus: 'Available',
    isbn: '978-93-80000-04-3',
    pageCount: 260,
    publicationYear: 2025,
    coverImageUrl: '/covers/entrepreneur.jpg',
    coverPalette: {
      background: '#2457C5',
      text: '#FFFFFF',
      accent: '#EEF4FF',
      pattern: 'geometric',
    },
    sampleExcerpt: {
      chapterTitle: 'Principles: The Dignity of the Margin',
      content: [
        'Speed is an attractive substitute for competence, but it is rarely an enduring one. In printing, running a press too fast without tension control results in blurred registration and wasted paper.',
        'Enterprise behaves identically. If the foundation cannot absorb the vibration of expansion, the resulting cracks appear first in customer trust and finally in balance sheets.',
        'Patience is not inertia; it is the discipline of refusing to compromise tolerances.',
      ],
    },
    samplePrice: {
      paperback: '₹550.00',
      ebook: '₹299.00',
    },
  },
  {
    id: 'bk-005',
    slug: 'letters-to-tomorrow',
    title: 'Letters to Tomorrow',
    subtitle: 'Epistolary reflections on heritage, education, and community',
    author: {
      id: 'auth-05',
      name: 'Sunita Rao',
      bio: 'Educator and cultural archivist dedicated to preserving literary dialogues.',
      location: 'Pune, India',
    },
    description:
      'A warm exchange of epistolary reflections connecting generational memory with the responsibilities of the future.',
    synopsisLong:
      'Arranged across three seasons of correspondence, Letters to Tomorrow preserves the intimacy of handwriting and deliberate thought. Sunita Rao addresses questions that every generation must re-answer: what do we inherit, what do we discard, and what must we carry forward with reverence?',
    genre: 'Philosophy & Thought',
    language: 'English',
    availableFormats: ['paperback', 'hardcover', 'ebook'],
    publicationStatus: 'Available',
    isbn: '978-93-80000-05-0',
    pageCount: 240,
    publicationYear: 2024,
    coverImageUrl: '/covers/letters.jpg',
    coverPalette: {
      background: '#4A2835',
      text: '#FFF5F5',
      accent: '#F3C5B5',
      pattern: 'editorial',
    },
    sampleExcerpt: {
      chapterTitle: 'Letter IV: The Books We Left Behind',
      content: [
        'My dear child,',
        'When unpacking the old cedar trunk in the ancestral attic, I found notebooks written in fountain pen ink faded to the color of dry leaves. The paper was rough, manufactured long before modern bleaching.',
        'Yet the thoughts held their shape. They spoke of harvest yields, of small village debates, of dreams that felt enormous in 1948. Books do not merely carry information; they preserve the temperature of a moment.',
      ],
    },
    samplePrice: {
      paperback: '₹420.00',
      hardcover: '₹650.00',
      ebook: '₹180.00',
    },
  },
  {
    id: 'bk-006',
    slug: 'the-art-of-everyday-decisions',
    title: 'The Art of Everyday Decisions',
    subtitle: 'Mental clarity and calm discernment in a noisy world',
    author: {
      id: 'auth-06',
      name: 'Dr. Nikhil Paranjpe',
      bio: 'Cognitive researcher and author examining decision architecture and behavioral calm.',
      location: 'Nagpur, India',
    },
    description:
      'A practical and grounded guide to trimming decision fatigue, cultivating cognitive discernment, and choosing calmly.',
    synopsisLong:
      'Every day demands hundreds of choices—from minor triage to consequential crossroads. Dr. Nikhil Paranjpe translates cognitive research into accessible, graceful habits designed to shield focus and reclaim intellectual calm.',
    genre: 'Philosophy & Thought',
    language: 'English',
    availableFormats: ['paperback', 'ebook', 'audiobook'],
    publicationStatus: 'Available',
    isbn: '978-93-80000-06-7',
    pageCount: 272,
    publicationYear: 2025,
    coverImageUrl: '/covers/decisions.jpg',
    coverPalette: {
      background: '#333745',
      text: '#F5F7FA',
      accent: '#89A1EF',
      pattern: 'classic',
    },
    sampleExcerpt: {
      chapterTitle: 'Chapter III: The Cost of Second-Guessing',
      content: [
        'Decision fatigue does not stem solely from the difficulty of our problems; it stems from our reluctance to allow a decision to remain made.',
        'When a judgment is settled, close the ledger. Reopening closed choices without new evidence is the swiftest path to mental attrition.',
        'Clarity is rarely an accident. It is the deliberate subtraction of noise until the essential signal remains.',
      ],
    },
    sampleAudioAvailable: true,
    sampleAudioDuration: '4 min sample',
    samplePrice: {
      paperback: '₹480.00',
      ebook: '₹250.00',
    },
  },
  {
    id: 'lanka-prophecy',
    slug: 'lanka-prophecy',
    title: 'Lanka: The Prophecy of the Bloodline',
    subtitle: 'An epic tale of duty, ancient prophecy, and divine destiny',
    author: {
      id: 'auth-mohandas',
      name: 'Prakash Mohandas',
      bio: 'Bestselling author exploring mythological epics and deep civilizational memory.',
      location: 'Chennai, India',
    },
    description:
      'A breathtaking reimagination of the Lankan lineage, unraveling the hidden prophecies that shaped an ancient empire.',
    synopsisLong:
      'Before the siege began, an elder lineage guarded secrets in the shadowed valleys of ancient Lanka. Prakash Mohandas crafts a sweeping epic of honour, betrayal, and prophetic foresight that challenges everything we assumed about classical myth.',
    genre: 'Literature & Fiction',
    language: 'English',
    availableFormats: ['paperback', 'hardcover', 'ebook'],
    publicationStatus: 'Available',
    isbn: '978-93-80000-07-4',
    pageCount: 340,
    publicationYear: 2025,
    coverImageUrl: '/covers/releases/lanka-prophecy.png',
    coverPalette: {
      background: '#1A243B',
      text: '#FFFFFF',
      accent: '#FFD700',
      pattern: 'editorial',
    },
    samplePrice: {
      paperback: '₹399.00',
      hardcover: '₹599.00',
      ebook: '₹199.00',
    },
  },
  {
    id: 'engineer-multi-millionaire',
    slug: 'engineer-multi-millionaire',
    title: 'Engineer to Multi-Millionaire',
    subtitle: 'Blueprint for wealth creation, tech innovation, and financial freedom',
    author: {
      id: 'auth-srinivas',
      name: 'Hanumesh Srinivas',
      bio: 'Engineer, tech founder, and wealth advisor helping professionals achieve economic sovereignty.',
      location: 'Bengaluru, India',
    },
    description:
      'A pragmatic, no-nonsense roadmap for engineers and creators looking to build generational wealth through product craft.',
    synopsisLong:
      'Moving beyond conventional salaried milestones, Hanumesh Srinivas reveals the structural leverage modern technologists possess. Through real-world case studies, capital frameworks, and mindset shifts, this book bridges technical excellence with financial autonomy.',
    genre: 'Business & Leadership',
    language: 'English',
    availableFormats: ['paperback', 'ebook'],
    publicationStatus: 'Available',
    isbn: '978-93-80000-08-1',
    pageCount: 260,
    publicationYear: 2025,
    coverImageUrl: '/covers/releases/engineer-multi-millionaire.png',
    coverPalette: {
      background: '#0D3B66',
      text: '#FFFFFF',
      accent: '#F4D35E',
      pattern: 'geometric',
    },
    samplePrice: {
      paperback: '₹450.00',
      ebook: '₹220.00',
    },
  },
  {
    id: '98-days-of-nila',
    slug: '98-days-of-nila',
    title: '98 Days of Nila',
    subtitle: 'A journey along Kerala’s sacred river of memory and change',
    author: {
      id: 'auth-rahalkar',
      name: 'Devakee Rahalkar',
      bio: 'Environmental documentarian and literary explorer chronicling river ecosystems.',
      location: 'Kochi, India',
    },
    description:
      'A deeply moving chronicle of ninety-eight days spent walking the banks of the Nila River, witnessing history and renewal.',
    synopsisLong:
      'Devakee Rahalkar documents an evocative 98-day expedition along the sacred Bharathapuzha (Nila). Blending environmental journalism, folk memory, and lyrical prose, the narrative asks what we lose when our ancient waters begin to fade.',
    genre: 'Literature & Fiction',
    language: 'English',
    availableFormats: ['paperback', 'hardcover', 'ebook'],
    publicationStatus: 'Available',
    isbn: '978-93-80000-09-8',
    pageCount: 280,
    publicationYear: 2025,
    coverImageUrl: '/covers/releases/98-days-of-nila.png',
    coverPalette: {
      background: '#1F3F34',
      text: '#FFFFFF',
      accent: '#A7C957',
      pattern: 'monsoon',
    },
    samplePrice: {
      paperback: '₹349.00',
      hardcover: '₹520.00',
      ebook: '₹179.00',
    },
  },
  {
    id: 'who-killed-damini',
    slug: 'who-killed-damini',
    title: 'Who Killed Damini?',
    subtitle: 'A quiet hill station harbor, a vanished heir, and an unyielding mystery',
    author: {
      id: 'auth-parveen',
      name: 'Soudia Parveen',
      bio: 'Investigative suspense novelist and recipient of the National Mystery Writers Guild citation.',
      location: 'Dehradun, India',
    },
    description:
      'When the celebrated heiress of a tranquil hill resort disappears overnight, an entangled web of secrets begins to unravel.',
    synopsisLong:
      'A locked bungalow, missing diary pages, and a quiet town whose inhabitants all have reasons to protect the silence. Soudia Parveen crafts an airtight psychological puzzle where each revelation deepens the tension.',
    genre: 'Literature & Fiction',
    language: 'English',
    availableFormats: ['paperback', 'ebook'],
    publicationStatus: 'Available',
    isbn: '978-93-80000-10-4',
    pageCount: 224,
    publicationYear: 2025,
    coverImageUrl: '/covers/releases/who-killed-damini.png',
    coverPalette: {
      background: '#2B1E3A',
      text: '#FFFFFF',
      accent: '#FF4D6D',
      pattern: 'classic',
    },
    samplePrice: {
      paperback: '₹299.00',
      ebook: '₹149.00',
    },
  },
  {
    id: 'whispers-into-screams',
    slug: 'whispers-into-screams',
    title: 'Whispers, That Turn into Screams',
    subtitle: 'Psychological thriller exploring paranoia, identity, and forgotten trauma',
    author: {
      id: 'auth-shetty',
      name: 'Ankit Shetty',
      bio: 'Psychological suspense author delving into the darker chambers of the human psyche.',
      location: 'Mumbai, India',
    },
    description:
      'A gripping psychological dive into a researcher’s descent when childhood audiotapes reveal impossible voices.',
    synopsisLong:
      'An archivist working on restored magnetic tapes discovers conversations recorded decades ago that predict events in his immediate life. Ankit Shetty delivers a masterclass in atmospheric dread and narrative precision.',
    genre: 'Literature & Fiction',
    language: 'English',
    availableFormats: ['paperback', 'hardcover', 'ebook'],
    publicationStatus: 'Available',
    isbn: '978-93-80000-11-1',
    pageCount: 310,
    publicationYear: 2025,
    coverImageUrl: '/covers/releases/whispers-into-screams.png',
    coverPalette: {
      background: '#1C1917',
      text: '#FFFFFF',
      accent: '#DC2626',
      pattern: 'editorial',
    },
    samplePrice: {
      paperback: '₹380.00',
      hardcover: '₹550.00',
      ebook: '₹189.00',
    },
  },
  {
    id: 'untold-legends-kurukshetra',
    slug: 'untold-legends-kurukshetra',
    title: 'Untold Legends of Kurukshetra',
    subtitle: 'The forgotten warriors, vows, and moral dilemmas of the eighteen-day war',
    author: {
      id: 'auth-acharya',
      name: 'Trishanth Acharya',
      bio: 'Sanskrit scholar and epic historian re-illuminating overlooked figures of Indian antiquity.',
      location: 'Varanasi, India',
    },
    description:
      'Vivid chronicles of the eighteen-day Kurukshetra conflict through the eyes of the unsung heroes and peripheral combatants.',
    synopsisLong:
      'While the songs of kings and celestial charioteers are well known, what became of the foot soldiers, tribal commanders, and grieving mothers? Trishanth Acharya draws upon rare regional texts to restore emotional depth to India’s greatest epic.',
    genre: 'Literature & Fiction',
    language: 'English',
    availableFormats: ['paperback', 'hardcover', 'ebook'],
    publicationStatus: 'Available',
    isbn: '978-93-80000-12-8',
    pageCount: 360,
    publicationYear: 2025,
    coverImageUrl: '/covers/releases/untold-legends-kurukshetra.png',
    coverPalette: {
      background: '#3A1E05',
      text: '#FFFFFF',
      accent: '#E09F3E',
      pattern: 'arch',
    },
    samplePrice: {
      paperback: '₹420.00',
      hardcover: '₹649.00',
      ebook: '₹210.00',
    },
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return DEMO_BOOKS.find((b) => b.slug === slug || b.id === slug);
}

export function getBookById(id: string): Book | undefined {
  return DEMO_BOOKS.find((b) => b.id === id || b.slug === id);
}

export const GENRE_LIST: Book['genre'][] = [
  'Philosophy & Thought',
  'Literature & Fiction',
  'Business & Leadership',
  'Essays & Commentary',
];
