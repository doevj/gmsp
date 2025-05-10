import { createAccessToken, createRefreshToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest): Promise<Response> {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const accessToken = createAccessToken(user.id);
  const refreshToken = createRefreshToken(user.id);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
  });

  (await cookies()).set('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 2,
    sameSite: 'lax',
  });

  return new Response(JSON.stringify({ accessToken }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
