'use client';
import { FC, useState } from 'react';
import { Button } from '@/common/components';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export const RegisterZone: FC = () => {
  const locale = useLocale();
  const [registerZoneActive, setRegisterZoneActive] = useState(false);

  return (
    <div className='hidden sm:flex ml-auto items-center relative overflow-visible' onMouseOver={() => setRegisterZoneActive(true)} onMouseLeave={() => setRegisterZoneActive(false)}>
      <div className='absolute top-0 left-0 p-10' onMouseOver={() => setRegisterZoneActive(true)} />
      <Link href={`/${locale}/register`} className='scale-90 hover:opacity-80 transition '>
        <Button variant='active' className='text-white w-[100px]'>
          Register
        </Button>
      </Link>
      {registerZoneActive && (
        <Link href={`/${locale}/login`} className='scale-90 hover:opacity-80 transition absolute top-0 left-0 mt-10'>
          <Button variant='active' className='text-white w-[100px]'>
            Login
          </Button>
        </Link>
      )}
    </div>
  );
};
