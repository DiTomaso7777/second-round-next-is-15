import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  const timestamp = new Date().toISOString();
  try {
    console.log('=== Start Order Processing ===', timestamp);
    
    const orderXml = await request.text();
    console.log('1. Received order XML:', orderXml);
    
    const apiUrl = process.env.API_UPLOAD;
    console.log('2. API URL:', apiUrl);

    // Create form data for the API
    const formData = new URLSearchParams();
    formData.append('key', process.env.API_KEY as string);
    formData.append('what', 'order');
    formData.append('put', orderXml);

    console.log('3. Form Data prepared');

    const response = await fetch(apiUrl as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/xml, application/xml'
      },
      body: formData.toString()
    });

    console.log('4. Response status:', response.status);
    console.log('5. Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.text();
    console.log('6. Response data:', data);
    console.log('=== End Order Processing ===', timestamp);

    return new NextResponse(data, {
      headers: {
        'Content-Type': 'application/xml'
      }
    });
  } catch (error) {
    console.error('7. Order processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('Fetching orders:', new Date().toISOString());
    
    const formData = new URLSearchParams();
    formData.append('key', process.env.API_KEY as string);
    formData.append('what', 'order');
    formData.append('get', '1');

    const response = await fetch(process.env.API_UPLOAD as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/xml, application/xml'
      },
      body: formData.toString()
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      console.error('API Error:', response.statusText);
      return NextResponse.json(
        { error: `Error fetching orders: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.text();
    console.log('Received data:', data.substring(0, 200) + '...');

    return new NextResponse(data, {
      headers: {
        'Content-Type': 'application/xml'
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}