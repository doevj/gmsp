'use client';
import { FC, useState } from 'react';
import { Button } from '@/common/components';
import { useLocale } from 'next-intl';
import Link from 'next/link';

import './header.components.styles.css';

export const RegisterZone: FC = () => {
  const locale = useLocale();
  const [registerZoneActive, setRegisterZoneActive] = useState(false);

  return (
    <div
      className='register_container'
      onMouseOver={() => setRegisterZoneActive(true)}
      onMouseLeave={() => setRegisterZoneActive(false)}
    >
      <div className='absolute top-0 left-0 p-10' onMouseOver={() => setRegisterZoneActive(true)} />
      <Link href={`/${locale}/auth/register`} className='scale-90 hover:opacity-80 transition '>
        <Button variant='active' className='text-white w-[100px]'>
          Register
        </Button>
      </Link>
      {registerZoneActive && (
        <Link href={`/${locale}/auth/login`} className='register_login_btn'>
          <Button variant='active' className='text-white w-[100px]'>
            Login
          </Button>
        </Link>
      )}
    </div>
  );
};
