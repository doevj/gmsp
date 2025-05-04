const BeginnersCourse = {
  id: 'spanish_for_beginners',
  title: 'Beginners Course',
  subtitle: 'Spanish for Beginners',
  description: 'A course for beginners to learn the basics of Spanish.',
  whatLearn: [
    'Basic vocabulary and phrases',
    'Simple sentence structure',
    'Common expressions and greetings',
    'Introduction to Spanish culture'
  ],
  whosFor: [
    'Complete beginners',
    'People who want to learn Spanish for travel',
    'Anyone interested in Spanish culture'
  ],
  whatTopics: [
    'Introduction to Spanish',
    'Basic greetings and introductions',
    'Numbers and colors',
    'Days of the week and months',
    'Common phrases for travel'
  ],
  whyChoose: [
    'Interactive and engaging lessons',
    'Experienced instructors',
    'Flexible learning schedule',
    'Access to additional resources and materials'
  ],
  pros: [
    'Weekly online classes',
    'Access to interactive material',
    'Constant speaking practice',
  ]
}

const IntermediateCourse = {
  id: 'intermediate-course',
  title: 'Intermediate Course',
  subtitle: 'Intermediate Spanish',
  description: 'A course for learners with basic Spanish knowledge who want to improve their skills.',
  whatLearn: [
    'Conversational Spanish',
    'Intermediate grammar and tenses',
    'Listening and comprehension skills',
    'Reading short texts and stories'
  ],
  whosFor: [
    'Students who completed a beginners course',
    'Travelers aiming for better communication',
    'Anyone wanting to strengthen their Spanish foundation'
  ],
  whatTopics: [
    'Past and future tenses',
    'Describing experiences and events',
    'Making plans and giving opinions',
    'Understanding short Spanish articles',
    'Conversational practice'
  ],
  whyChoose: [
    'Focus on real-life conversations',
    'Practical exercises and activities',
    'Supportive learning community',
    'Skill-building assignments'
  ],
  pros: [
    'Bi-weekly conversation clubs',
    'Feedback on written exercises',
    'Diverse multimedia materials',
  ]
}

const AdvancedCourse = {
  id: 'advanced-course',
  title: 'Advanced Course',
  description: 'An intensive course for learners ready to master Spanish fluency and complexity.',
  whatLearn: [
    'Advanced grammar and expressions',
    'Nuances of formal and informal language',
    'Debate and argumentation skills',
    'In-depth cultural topics'
  ],
  whosFor: [
    'Students aiming for near-native fluency',
    'Professionals working with Spanish-speaking clients',
    'Language enthusiasts'
  ],
  whatTopics: [
    'Subjunctive mood mastery',
    'Advanced conversation and debate',
    'Spanish and Latin American literature',
    'Idioms and colloquial expressions',
    'Current events discussion'
  ],
  whyChoose: [
    'Highly qualified native instructors',
    'Focus on fluency and accuracy',
    'Real-world practice opportunities',
    'Preparation for official exams (DELE, SIELE)'
  ],
  pros: [
    'Small group classes',
    'Access to premium content',
    '1:1 mentoring sessions',
  ]
}

const KidsCourse = {
  id: 'kids-course',
  title: 'Spanish for Kids',
  description: 'A fun and interactive course designed for young learners.',
  whatLearn: [
    'Basic vocabulary through games and songs',
    'Simple sentence building',
    'Spanish pronunciation practice',
    'Cultural activities and crafts'
  ],
  whosFor: [
    'Children aged 5-12',
    'Parents seeking educational activities',
    'Kids curious about new languages'
  ],
  whatTopics: [
    'Animals, family, and school vocabulary',
    'Simple dialogues and greetings',
    'Colors, shapes, and numbers',
    'Fun cultural traditions'
  ],
  whyChoose: [
    'Play-based learning',
    'Friendly and experienced teachers',
    'Safe and supportive environment',
    'Creative projects and storytelling'
  ],
  pros: [
    'Weekly interactive sessions',
    'Fun assignments and challenges',
    'Progress tracking for parents',
  ]
}

const BusinessCourse = {
  id: 'business-course',
  title: 'Spanish for Business',
  description: 'A specialized course focusing on professional communication in Spanish.',
  whatLearn: [
    'Business vocabulary and formal expressions',
    'Writing emails and reports',
    'Participating in meetings and negotiations',
    'Cultural etiquette in professional settings'
  ],
  whosFor: [
    'Professionals working internationally',
    'Entrepreneurs expanding to Spanish-speaking markets',
    'Business students and graduates'
  ],
  whatTopics: [
    'Formal introductions and networking',
    'Business writing and correspondence',
    'Presentations and proposals',
    'Cross-cultural communication tips'
  ],
  whyChoose: [
    'Tailored business language practice',
    'Role-play and case study exercises',
    'Insights into Hispanic business culture',
    'Career-focused learning'
  ],
  pros: [
    'Flexible class schedules',
    'Access to business templates and resources',
    'Practice interviews and mock meetings',
  ]
}

const TravelCourse = {
  id: 'travel-course',
  title: 'Spanish for Travel',
  description: 'A practical course focused on essential Spanish for travelers.',
  whatLearn: [
    'Key travel phrases and vocabulary',
    'Handling transportation, hotels, and restaurants',
    'Asking for directions and help',
    'Understanding important cultural customs'
  ],
  whosFor: [
    'Tourists visiting Spanish-speaking countries',
    'Backpackers and solo travelers',
    'Anyone wanting quick and practical Spanish skills'
  ],
  whatTopics: [
    'Airport and hotel conversations',
    'Ordering food and shopping',
    'Emergencies and healthcare vocabulary',
    'Cultural do’s and don’ts'
  ],
  whyChoose: [
    'Fast-track learning approach',
    'Real-life practice scenarios',
    'Travel tips from experienced instructors',
    'Downloadable phrasebooks'
  ],
  pros: [
    'Short-term intensive modules',
    'Mobile-friendly learning materials',
    'Personalized travel language guide',
  ]
}

type Course = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  whatLearn: string[];
  whosFor: string[];
  whatTopics: string[];
  whyChoose: string[];
  pros: string[];
}

export const courses = {
  spanish_for_beginners: BeginnersCourse,
  intermediate_spanish: IntermediateCourse,
  advanced_spanish: AdvancedCourse,
  spanish_for_kids: KidsCourse,
  business_spanish: BusinessCourse,
  spanish_for_travel: TravelCourse
} as Record<string, Course>

export const getCourseData = async (id: string) => {
  'use server'
  await new Promise((resolve) => setTimeout(resolve, 555));
  return courses[id] || null;
}