import { LessonsList } from "@/common/components"

const mockLessons = Array.from({ length: 10 }, () => ({})).map((_, i) => ({
  id: `${i + 1}`,
  title: `Spanish Lesson ${i + 1}`,
  description: 'Learn Spanish with this lesson',
  imageUrl: '/media/img/img1.png',
  buttonText: 'Start Learning',
}));



export default function Lessons() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-wrap align-center justify-center gap-5">
  
        <LessonsList lessons={mockLessons} title="Discover your perfect path to learning Spanish"  />
    </div>
  )
}
