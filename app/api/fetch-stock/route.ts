import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(process.env.API_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `key=${process.env.API_KEY}&what=stocklevel&get=1`,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error fetching data: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.text();

    
    // Return XML data with proper content type
    return new NextResponse(data, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });

  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}