
import { NextResponse } from 'next/server';
import { createSession } from '@/app/actions';

export async function POST(request: Request) {
  const { idToken } = await request.json();

  if (!idToken) {
    return NextResponse.json({ error: 'ID token is required' }, { status: 400 });
  }

  const result = await createSession(idToken);

  if (result.success) {
    return NextResponse.json({ success: true }, { status: 200 });
  } else {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
}
