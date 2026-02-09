import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || '';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Forward the request to our backend
    const response = await fetch(`${BACKEND_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || 'Failed to sign in with Google' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Set-Cookie': response.headers.get('set-cookie') || ''
      }
    });
  } catch (error) {
    console.error('Google sign-in error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 