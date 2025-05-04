import bcrypt from 'bcryptjs';
import { prisma } from "@/lib/prisma";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from '@/lib/auth';

export class AuthRepo {
  private readonly prisma = prisma;
  private static instance: AuthRepo;

  private constructor() { }

  public static getInstance(): AuthRepo {
    if (!AuthRepo.instance) {
      AuthRepo.instance = new AuthRepo();
    }
    return AuthRepo.instance;
  }

  public async login(email: string, password: string): Promise<Result<AuthSuccessRes>> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { ok: false, error: 'Invalid credentials' }
    }

    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    // store refresh token in DB
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      ok: true,
      data: {
        accessToken,
        refreshToken,
        userId: user.id,
      },
    }
  }

  public async logout(refreshToken: string): Promise<void> {
    console.log('Logging out user');
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    }
  }

  public async register(email: string, password: string): Promise<Result<AuthSuccessRes>> {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      // return res.status(409).json({ message: 'User already exists' });
      return { ok: false, error: 'User already exists' }
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: email.split('@')[0], // Use the part before '@' as the name
        email,
        password: hashedPassword,
      },
    });

    console.log({ user })

    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    // Store refresh token in DB
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // Set refresh token as httpOnly cookie
    // res.setHeader('Set-Cookie', serialize('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   path: '/',
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 60 * 60 * 24 * 7,
    //   sameSite: 'lax',
    // }));

    return {
      ok: true,
      data: {
        accessToken,
        refreshToken,
        userId: user.id,
      },
    }
  }

  public async refresh(cookies: Record<string, string | undefined>): Promise<Result<AuthSuccessRes>> {
    const token = cookies.refreshToken;
    if (!token) {
      return { ok: false, error: 'No refresh token' }
    }
    try {
      const payload = verifyRefreshToken(token) as { userId: string };
      const stored = await prisma.refreshToken.findUnique({ where: { token } });

      if (!stored || stored.expiresAt < new Date()) {
        // return res.status(403).json({ message: 'Invalid refresh token' });
        return { ok: false, error: 'Invalid refresh token' }
      }

      const newAccessToken = createAccessToken(payload.userId);
      // return res.json({ accessToken: newAccessToken });
      return {
        ok: true,
        data: {
          accessToken: newAccessToken,
          refreshToken: token,
          userId: payload.userId,
        },
      }
    } catch (err) {
      // return res.status(403).json({ message: `Invalid token ${(err as Error)?.message || String(err)}` });
      return { ok: false, error: `Invalid token ${(err as Error)?.message || String(err)}` }
    }
  }

  public async verifyLoggedIn(cookies: CookiesRecord): Promise<Result<AuthSuccessRes>> {
    const token = cookies.refreshToken;
    if (!token) return { ok: false, error: 'No refresh token' }
    try {
      const payload = verifyRefreshToken(token) as { userId: string };
      const stored = await prisma.refreshToken.findUnique({ where: { token } });

      if (!stored || stored.expiresAt < new Date()) {
        return { ok: false, error: 'Invalid refresh token' }
      }

      return {
        ok: true,
        data: {
          accessToken: createAccessToken(payload.userId),
          refreshToken: token,
          userId: payload.userId,
        },
      }
    }
    catch (err) {
      return { ok: false, error: `Invalid token ${(err as Error)?.message || String(err)}` }
    }
  }
} 