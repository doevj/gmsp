import { FC } from 'react'
import Image from 'next/image'
import logoImg from './logo-white.svg'

export const Logo: FC = () => {
  return (
    <Image src={logoImg} width={110} height={110} alt="" className='cursor-pointer hover:cursor-pointer opacity-80 hover:opacity-100 transition' />
  )
}
