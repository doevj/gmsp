import { Button } from '@/common/components';
import { getCurrentUser } from '@/lib/getCurrentUser';
import Link from 'next/link';
import { FC } from 'react';

export const ClassesBtn: FC<{ locale: string }> = async ({ locale }) => {
  const user = await getCurrentUser();

  const disabled = !user;

  return (
    <Link href={`/${locale}/checkout`} >
      <Button variant={disabled ? 'normal' : 'trust'} className={`hidden md:flex bg-opacity-70 ${!disabled && 'hover:bg-opacity-100'} text-gray-600 text-nowrap ${disabled && 'opacity-25'}`} disabled={disabled}>
        Get classes
      </Button>
    </Link >
  );
};