import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest){
  const id = Math.random().toString(36).slice(2,8).toUpperCase();
  return NextResponse.json({ id });
}
