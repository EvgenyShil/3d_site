import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest){
  // TODO: connect @vercel/blob to store file if needed, send email/telegram, save to DB
  // For MVP, just return an id
  const id = Math.random().toString(36).slice(2,8).toUpperCase();
  return NextResponse.json({ id });
}
