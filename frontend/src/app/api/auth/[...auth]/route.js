import { NextResponse } from 'next/server';

// Get backend URL with fallback for local development
const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

async function handleBackendResponse(response) {
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Backend returned non-JSON response');
  }

  const data = await response.json();
  return NextResponse.json(data, {
    status: response.status,
    headers: {
      'Set-Cookie': response.headers.get('set-cookie') || ''
    }
  });
}

export async function GET(request) {
  try {
    if (!BACKEND_URL) {
      return NextResponse.json(
        { error: 'Backend URL not configured' },
        { status: 500 }
      );
    }
    
    const authPath = request.nextUrl.pathname.replace('/api/auth/', '');
    const response = await fetch(`${BACKEND_URL}/auth/${authPath}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cookie': request.headers.get('cookie') || ''
      },
      credentials: 'include'
    });

    return await handleBackendResponse(response);
  } catch (error) {
    console.error('Auth proxy error:', error);
    console.error('Backend URL:', BACKEND_URL);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    if (!BACKEND_URL) {
      return NextResponse.json(
        { error: 'Backend URL not configured' },
        { status: 500 }
      );
    }
    
    const authPath = request.nextUrl.pathname.replace('/api/auth/', '');
    let body = {};
    try {
      const text = await request.text();
      body = text ? JSON.parse(text) : {};
    } catch (e) {
      body = {};
    }
    const response = await fetch(`${BACKEND_URL}/auth/${authPath}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || ''
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });
    return await handleBackendResponse(response);
  } catch (error) {
    console.error('Auth proxy error:', error);
    console.error('Backend URL:', BACKEND_URL);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const authPath = request.nextUrl.pathname.replace('/api/auth/', '');
    let body = {};
    try {
      const text = await request.text();
      body = text ? JSON.parse(text) : {};
    } catch (e) {
      body = {};
    }
    const response = await fetch(`${BACKEND_URL}/auth/${authPath}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || ''
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });
    return await handleBackendResponse(response);
  } catch (error) {
    console.error('Auth proxy error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const authPath = request.nextUrl.pathname.replace('/api/auth/', '');
    
    const response = await fetch(`${BACKEND_URL}/auth/${authPath}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Cookie': request.headers.get('cookie') || ''
      },
      credentials: 'include'
    });

    return await handleBackendResponse(response);
  } catch (error) {
    console.error('Auth proxy error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 