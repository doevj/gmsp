import { FC } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Button, ChangeLangDropdown } from '@/common/components';

const socials = [
  { src: "/media/svg/envelope.svg", label: "Email", href: "#" },
  { src: "/media/svg/instagram.svg", label: "Instagram", href: "#" },
  { src: "/media/svg/telegram.svg", label: "Telegram", href: "#" },
  { src: "/media/svg/whatsapp.svg", label: "WhatsApp", href: "#" },
]

export const Footer: FC = () => {
  const locale = useLocale();

  return (
    <footer className="flex bg-teal-500/90 items-end w-full mx-auto p-5 min-h-[200px] justify-between flex-col md:flex-row gap-5">
      <div className='flex gap-5'>
        {socials.map(({ src, label, href }) => (
          <Link key={label} href={href} aria-label={label}><Image className='filter invert' src={src} alt={label} height={30} width={30} /></Link>
        ))}
      </div>


      <div>
        <Image src="/media/svg/logo-white.svg" alt="Logo" height={130} width={130} className='ml-auto' />
        <div className='flex flex-col items-end'>
          <Button className='text-white'>Join us</Button>
          <input className='p-4 border-none min-w-[250px] text-sm w-[200px] rounded-lg' type="email" placeholder="Enter your email to stay updated" aria-label="Email input" />
        </div>
        

      </div>
    </footer>
  );
} 