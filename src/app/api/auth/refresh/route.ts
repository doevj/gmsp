import { verifyRefreshToken, createAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { parse } from 'cookie';

export async function POST(req: NextRequest): Promise<Response> {
  const rawCookie = req.headers.get('cookie') || '';
  const cookies = parse(rawCookie);
  const token = cookies.refreshToken;

  if (!token) {
    return new Response(JSON.stringify({ message: 'No refresh token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const payload = verifyRefreshToken(token) as { userId: string };
    const stored = await prisma.refreshToken.findUnique({ where: { token } });

    if (!stored || stored.expiresAt < new Date()) {
      return new Response(JSON.stringify({ message: 'Invalid refresh token' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newAccessToken = createAccessToken(payload.userId);

    return new Response(JSON.stringify({ accessToken: newAccessToken }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ message: `Invalid token ${(err as Error)?.message || String(err)}` }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
