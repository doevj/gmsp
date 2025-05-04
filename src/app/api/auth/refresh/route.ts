import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';
import { verifyRefreshToken, createAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.refreshToken;

  if (!token) return res.status(401).json({ message: 'No refresh token' });

  try {
    const payload = verifyRefreshToken(token) as { userId: string };
    const stored = await prisma.refreshToken.findUnique({ where: { token } });

    if (!stored || stored.expiresAt < new Date()) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = createAccessToken(payload.userId);
    return res.json({ accessToken: newAccessToken });

  } catch (err) {
    return res.status(403).json({ message: `Invalid token ${(err as Error)?.message || String(err)}` });
  }
}
