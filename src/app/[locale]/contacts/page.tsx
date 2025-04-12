import { FC } from 'react';
import { ContactForm } from '@/common/forms';
import Image from 'next/image';

export default function Contacts() {
  return (
    <div className="relative w-full h-screen bg-teal-600/90 pt-20 flex flex-col gap-5 items-center px-4">
      <h1 className='text-5xl w-full text-center text-white fontf-spectral scale-100 mb-7'> Contact us </h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg relative w-full sm:w-2/3 max-w-[500px] ">
        <div className="absolute top-0 left-0 w-full bg-teal-500 text-white text-xl font-bold p-3 rounded-t-2xl">
          Get in touch!
        </div>

        <ContactForm />
      </div>

      <Socials />
    </div>
  );
}

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