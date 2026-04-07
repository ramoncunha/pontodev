import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch(e) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { gift_id, giver_name } = body || {};

  if (!gift_id || !giver_name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      INSERT INTO reservations (gift_id, giver_name) 
      VALUES (${gift_id}, ${giver_name})
    `;
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Já reservado por outra pessoa.' }, { status: 409 });
    }
    console.error('Reservation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
