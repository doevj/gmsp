'use server';
import { cookies } from 'next/headers';
import { verifyRefreshToken } from './auth';
import { prisma } from './prisma';

export async function getCurrentUser() {
  const token = (await cookies()).get('refreshToken')?.value;
  if (!token) return null;

  try {
    const payload = verifyRefreshToken(token) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    return user;
  } catch {
    return null;
  }
} 