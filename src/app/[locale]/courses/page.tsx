import { LessonsList } from "@/common/components"

const lessons = [
  {
    title: "Spanish for Beginners",
    description: "If you're taking your first steps in Spanish, this class is for you. You'll learn basic vocabulary, essential phrases, and fundamental grammar structures to communicate in everyday situations simply and effectively.",
    imageUrl: "/media/svg/img10.svg",
    buttonText: "Start Learning",
  },
  {
    title: "Intermediate Spanish",
    description: "You already have a foundation in Spanish and want to keep progressing. In this class, you'll improve your fluency, expand your vocabulary, and master more complex structures to express yourself with greater confidence in different situations.",
    imageUrl: "/media/svg/img11.svg",
    buttonText: "More Info",
  },
  {
    title: "Advanced Spanish",
    description: "Take your Spanish to the next level. We will refine your grammar, expand your vocabulary, and work on the accuracy and naturalness of your communication so you can speak like a native in any context.",
    imageUrl: "/media/svg/img12.svg",
    buttonText: "Start Learning",
  },
  {
    title: "Spanish for Kids",
    description: "Fun and engaging classes designed especially for children. They will learn Spanish through games, songs, and interactive activities, fostering a natural and effective learning experience.",
    imageUrl: "/media/svg/img13.svg",
    buttonText: "More Info",
  },
  {
    title: "Business Spanish",
    description: "Enhance your Spanish for professional settings. You'll learn specialized vocabulary, email writing, presentations, and effective communication in meetings, helping you succeed in the business world.",
    imageUrl: "/media/svg/img14.svg",
    buttonText: "Start Learning",
  },
  {
    title: "Spanish for Travel",
    description: "Are you traveling to a Spanish-speaking country? In these classes, you'll learn useful phrases, key vocabulary, and essential expressions to confidently navigate airports, hotels, restaurants, and more.",
    imageUrl: "/media/svg/img15.svg",
    buttonText: "More Info",
  },
]


export default function Lessons() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-wrap align-center justify-center gap-5">
  
        <LessonsList lessons={lessons} title="Discover your perfect path to learning Spanish"  />
    </div>
  )
}
