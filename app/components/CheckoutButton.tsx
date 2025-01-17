'use client';
import { useState } from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { createOrderPayload } from '../utils/orderService';

export default function CheckoutButton() {
  const { cart, clearCart } = useShoppingCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const orderXml = createOrderPayload(cart);
      
      // Send to our Next.js API route
      const response = await fetch('/api/order', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/xml',
        },
        body: orderXml,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to place order');
      }

      const data = await response.text();
      console.log('Order response:', data);

      clearCart();
      alert('Order placed successfully!');
      
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading || cart.length === 0}
      className={`w-full py-3 rounded-lg font-semibold transition-colors 
        ${isLoading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
    >
      {isLoading ? 'Processing...' : 'Place Order'}
    </button>
  );
}