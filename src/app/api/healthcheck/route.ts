import { checkDbConnection } from '@/lib/check-db';
import { NextResponse } from 'next/server';

export async function GET() {
  const isAlive = await checkDbConnection();

  if (!isAlive) {
    return NextResponse.json({ status: 'error', message: 'DB not reachable' }, { status: 500 });
  }

  return NextResponse.json({ status: 'ok', message: 'DB connected' });
}