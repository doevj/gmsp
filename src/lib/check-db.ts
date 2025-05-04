import { prisma } from './prisma';

export async function checkDbConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`; // works for SQLite
    console.log('✅ Database connection is alive');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}