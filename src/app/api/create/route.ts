import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
   const body = await request.text();
   return NextResponse.json({ received: true }, { status: 200 });
}