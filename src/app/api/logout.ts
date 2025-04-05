import { serialize } from 'cookie';
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.refreshToken;
  if (token) {
    await prisma.refreshToken.deleteMany({ where: { token } });
  }

  res.setHeader('Set-Cookie', serialize('refreshToken', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  }));

  res.json({ message: 'Logged out' });
}