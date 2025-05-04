export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-5">Thank You for Your Purchase!</h1>
      <div className="rounded-lg p-5 bg-teal-400/80 flex flex-col items-center justify-center">
        <p className="mt-4 text-lg">Your order has been successfully processed.</p>
        <p className="mt-2 text-lg">We will be in touch with you soon!</p>
      </div>
    </div>
  )
}