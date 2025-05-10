import { serialize } from 'cookie';
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest): Promise<Response> {
  const token = req.cookies.get('refreshToken')?.value;
  if (token) {
    await prisma.refreshToken.deleteMany({ where: { token } });
  }

  (await cookies()).set('refreshToken', token || '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  });

  return new Response(
    JSON.stringify({ message: 'Logged out successfully' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  )
} 