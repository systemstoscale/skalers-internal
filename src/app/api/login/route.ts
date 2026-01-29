import { NextResponse } from 'next/server';

const PASSWORD = 'aquarius';
const COOKIE_NAME = 'skalers_auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === PASSWORD) {
      const response = NextResponse.json({ success: true });

      // Set cookie for 30 days
      response.cookies.set(COOKIE_NAME, PASSWORD, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
