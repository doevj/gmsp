import Image from "next/image"
import { FC } from "react"

const mockLessons = [
  {
    id: '1',
    title: 'Spanish Lesson 1',
    description: 'Learn Spanish with this lesson',
    content: 'This is the content of the lesson',
    duration: 10,
    videoUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
    thumbnailUrl: 'https://via.placeholder.com/640x360',
    tags: ['b1', 'b2'],
    createdAt: '2021-09-01T12:00:00',
    updatedAt: '2021-09-01T12:00:00',
  },
  {
    id: '2',
    title: 'Spanish Lesson 2',
    description: 'Learn Spanish with this lesson',
    content: 'This is the content of the lesson',
    duration: 15,
    videoUrl: 'https://www.youtube.com/watch?v=4deVCNJq3qc',
    thumbnailUrl: 'https://via.placeholder.com/640x360',
    tags: ['Espanol', 'Spanish'],
    createdAt: '2021-09-01T12:00:00',
    updatedAt: '2021-09-01T12:00:00',
  },
  {
    id: '3',
    title: 'Spanish Lesson 3',
    description: 'Learn Spanish with this lesson',
    content: 'This is the content of the lesson',
    duration: 20,
    videoUrl: 'https://www.youtube.com/watch?v=4deVCNJq3qc',
    thumbnailUrl: 'https://via.placeholder.com/640x360',
    tags: ['Espanol', 'Spanish'],
    createdAt: '2021-09-01T12:00:00',
    updatedAt: '2021-09-01T12:00:00',
  }
]


const Lesson: FC<{
  id: string
  title: string
  description: string
  content: string
  duration: number
  videoUrl: string
  thumbnailUrl: string
  tags: string[]
  createdAt: string
  updatedAt: string
}> = ({ title, description, content, duration, videoUrl, thumbnailUrl, tags }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="max-w-[300px] max-h-[300px]">
        <Image src={thumbnailUrl} alt={title} className="w-full h-64 object-cover rounded-md mb-4" width={100} height={200} />
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="mb-4">
        <span className="text-sm text-gray-500">Duration: {duration} minutes</span>
      </div>
      <div className="mb-4">
        <a href={videoUrl} className="text-blue-500 hover:underline">Watch Video</a>
      </div>
      <div className="mb-4">
        <p className="text-gray-700">{content}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="bg-blue-100 text-blue-500 text-sm px-2 py-1 rounded">{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default function Lessons() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-wrap align-center justify-center gap-5">
      {mockLessons.map(lesson => (
        <Lesson key={lesson.id} {...lesson} />
      ))}
    </div>
  )
}
