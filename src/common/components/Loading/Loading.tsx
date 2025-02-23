import { FC } from 'react'

export const Loading: FC = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="h-3 w-3 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  )
}
