import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn('No DATABASE_URL configured');
      return NextResponse.json({ reserved_ids: [] }, { status: 200 });
    }
    const sql = neon(process.env.DATABASE_URL!);
    const results = await sql`SELECT gift_id FROM reservations`;
    const ids = results.map((row: any) => row.gift_id);
    return NextResponse.json({ reserved_ids: ids }, { status: 200 });
  } catch (error: any) {
    console.error('Gifts fetch error:', error);
    return NextResponse.json({ reserved_ids: [] }, { status: 200 });
  }
}
