import { FC } from 'react';
import { ContactForm } from '@/common/forms';
import Image from 'next/image';

import contactImg from './contact.jpg';


const BackGroundImg: FC = () => {
  return (
    <div className="absolute inset-0 bg-cover bg-center opacity-50">
      <Image
        src={contactImg}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="object-cover w-full h-full blur-sm"
      />
    </div>
  );
}

export default function Contacts() {
  return (
    <div className="relative w-full bg-teal-600/90 pt-20 flex flex-col gap-5 items-center px-4">
      <BackGroundImg />

      <div className='flex flex-col items-center justify-center w-full z-10 mb-5 gap-3'>
        <h1 className='text-5xl w-full text-center text-white z-10 font-nunito'> Contact us! </h1>
        <h1 className='text-5xl w-full text-center text-white z-10 font-nunito'>Lets Connect</h1>
      </div>


      <div className='flex flex-col sm:flex-row gap-5 items-center justify-center w-full z-10 mb-[20rem] sm:h-[550px]'>
        <Socials />

        <ContactForm title='Get in touch' />
      </div>

    </div>
  );
}

const socialItems = [
  { src: '/media/svg/envelope.svg', label: 'Email', href: 'infogramaspanish@gmail.com', value: 'infogramaspanish@gmail.com', type: 'email' },
  { src: '/media/svg/instagram.svg', label: 'Instagram', href: 'https://www.instagram.com/gramaspanish', value: 'gramaspanish' },
  { src: '/media/svg/telegram.svg', label: 'Telegram', href: 'https://t.me/gramaspanish', value: 'gramaspanish' },
  { src: '/media/svg/whatsapp.svg', label: 'WhatsApp', href: '#', value: '+34777663421' },
];

const Socials: FC = () => {
  return (
    <div className='flex flex-col gap-4 p-6 bg-teal-500/50 rounded-lg w-full sm:w-2/3 max-w-[500px] h-full' >
      <h1 className="text-2xl text-center font-nunito text-white mb-9">{'We’re just a message away!'}</h1>

      {socialItems.map(({ src, label, href, value, type }) => (
        <a key={label} href={(type === 'email' ? 'mailto:' : '') + href} aria-label={label} target="_blank" className='flex gap-2 hover:scale-[1.01] transition'>
          <Image className='filter invert' src={src} alt={label} height={35} width={35} />
          <span className='text-white text-lg font-nunito'>{value}</span>
        </a>
      ))}
    </div>
  );
};