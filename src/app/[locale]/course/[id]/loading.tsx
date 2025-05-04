export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col gap-2 items-center bg-teal-700 justify-center p-5">
      <h1 className="w-full font-bold text-white text-center align-center text-4xl mb-9"> Loading... </h1>
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
    </div>
  )
}