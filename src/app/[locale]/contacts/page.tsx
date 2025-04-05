import Image from 'next/image';
import { FC } from 'react';

export default function Contacts() {
  return (
    <div className="relative w-full h-screen bg-teal-600/90 pt-20 flex flex-col gap-5  items-center">
      <h1 className='text-5xl w-full text-center text-white fontf-spectral scale-100 mb-7'> Contact us </h1>
      <ContactForm />
      <Socials />
    </div>
  );
}

async function sendMessage(formData: FormData) {
  'use server';
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Handle form submission logic here, e.g., saving to a database or sending an email
  console.log('Form submitted:', { name, email, message });
}

const ContactForm: FC = () => {
  return (
    <div className="flex justify-center items-center p-4 w-[50vw] max-w-[500px] min-w-[319px]">
      <div className="bg-white p-6 rounded-2xl shadow-lg relative w-full">
        <div className="absolute top-0 left-0 w-full bg-teal-500 text-white text-xl font-bold p-3 rounded-t-2xl">
          Get in touch!
        </div>
        <form action={sendMessage} className="mt-12">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-teal-400"
            required
          />

          <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-teal-400"
            required
          />

          <label className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
          <textarea
            name="message"
            className="w-full p-2 border border-gray-300 rounded-md mb-4 h-24 focus:outline-none focus:ring-teal-400"
            required
            maxLength={500}
          ></textarea>

          <button
            type="submit"
            className="w-full p-3 bg-teal-500 text-white font-bold rounded-md mt-2 hover:bg-teal-600 transition"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
};

const socialItems = [
  { src: '/media/svg/envelope.svg', label: 'Email', href: '#' },
  { src: '/media/svg/instagram.svg', label: 'Instagram', href: '#' },
  { src: '/media/svg/telegram.svg', label: 'Telegram', href: '#' },
  { src: '/media/svg/whatsapp.svg', label: 'WhatsApp', href: '#' },
];

const Socials: FC = () => {
  return (
    <div className='flex gap-5 p-8' >
      {socialItems.map(({ src, label, href }) => (
        <a key={label} href={href} aria-label={label} className='hover:scale-[1.09] transition'>
          <Image className='filter invert' src={src} alt={label} height={35} width={35} />
        </a>
      ))}
    </div>
  );
};