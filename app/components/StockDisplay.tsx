'use client';

import { useEffect, useState } from 'react';
import StockCard from './StockCard';

interface StockItem {
  code: string;
  name: string;
  salesprice: string;
  quantity: number;
  serialnumber: string;
}

interface GroupedStockItem {
  code: string;
  name: string;
  salesprice: string;
  quantity: number;
}

export default function StockGrid() {
  const [stock, setStock] = useState<GroupedStockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await fetch('/api/fetch-stock');
        if (!response.ok) throw new Error('Failed to fetch');
        
        const xmlData = await response.text();
        
        // Manually parse XML data
        const stockItems: StockItem[] = [];
        const regex = /<stocklevel code="([^"]+)" stock="([^"]+)" quantity="([^"]+)" serialnumber="([^"]+)" name="([^"]+)" salesprice="([^"]+)" sn_freequantity="([^"]+)"\/>/g;
        let match;
        while ((match = regex.exec(xmlData)) !== null) {
          stockItems.push({
            code: match[1],
            name: match[5],
            salesprice: match[6],
            quantity: parseInt(match[3]),
            serialnumber: match[4],
          });
        }
        
        // Group items by code
        const groupedStock: { [key: string]: GroupedStockItem } = {};
        stockItems.forEach(item => {
          if (!groupedStock[item.code]) {
            groupedStock[item.code] = {
              code: item.code,
              name: item.name,
              salesprice: item.salesprice,
              quantity: 0,
            };
          }
          groupedStock[item.code].quantity += item.quantity;
        });
        
        setStock(Object.values(groupedStock));
      } catch (err) {
        console.error('Error parsing stock data:', err);
        setError('Failed to load stock data');
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stock.map((item) => (
          <StockCard
            key={item.code}
            code={item.code}
            name={item.name}
            salesprice={item.salesprice}
            quantity={item.quantity}
          />
        ))}
      </div>
      {stock.length === 0 && !error && (
        <p className="text-center text-gray-500 mt-4">No stock items available</p>
      )}
    </div>
  );
}