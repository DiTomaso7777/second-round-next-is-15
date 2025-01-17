import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
    try {
      console.log('Placing order:', new Date().toISOString());
      
      // Get XML order data directly from request
      const orderData = await request.text();
      console.log('Order payload:', orderData);

      // Construct URL with query parameters
      const baseUrl = process.env.API_UPLOAD as string;
      const apiKey = process.env.API_KEY as string;
      const encodedXml = encodeURIComponent(orderData);
      
      // Build form data
      const formData = new URLSearchParams();
      formData.append('key', apiKey);
      formData.append('what', 'order');
      formData.append('put', orderData);

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      });
  
      console.log('Response status:', response.status);
  
      if (!response.ok) {
        console.error('API Error:', response.statusText);
        return NextResponse.json(
          { error: `Error placing order: ${response.statusText}` },
          { status: response.status }
        );
      }

      const data = await response.text();
      console.log('Response data:', data);

      return new NextResponse(data, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml',
        },
      });
    } catch (error) {
      console.error('Error placing order:', error);
      return NextResponse.json(
        { error: 'Failed to process order' },
        { status: 500 }
      );
    }
}

export async function GET() {
    try {
      console.log('Fetching orders:', new Date().toISOString());
      console.log('API URL:', process.env.API_UPLOAD);
      
      const response = await fetch(process.env.API_UPLOAD as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `key=${process.env.API_KEY}&what=order&get=1`,
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
          'Content-Type': 'application/xml',
        },
      });
  
    } catch (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      );
    }
}