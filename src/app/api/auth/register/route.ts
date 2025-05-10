import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createAccessToken, createRefreshToken } from '@/lib/auth';

export async function POST(req: Request): Promise<Response> {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Email and password are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return new Response(JSON.stringify({ message: 'User already exists' }), {
      status: 409,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: email.split('@')[0],
      email,
      password: hashedPassword,
    },
  });

  const accessToken = createAccessToken(user.id);
  const refreshToken = createRefreshToken(user.id);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  (await cookies()).set('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  });

  return new Response(JSON.stringify({ accessToken }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
