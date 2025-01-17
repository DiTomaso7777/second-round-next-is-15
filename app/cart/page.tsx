'use client';

import CheckoutButton from '../components/CheckoutButton';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useShoppingCart();

  const total = cart.reduce((sum, item) => (
    sum + (parseFloat(item.salesprice) * item.quantity)
  ), 0);

  const handleQuantityChange = (code: string, value: string) => {
    const quantity = parseInt(value);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(code, quantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600">Add some items to start shopping!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="space-y-4">
          {cart.map((item) => (
            <div 
              key={item.code}
              className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between"
            >
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">Code: {item.code}</p>
                <p className="text-blue-600 font-bold">£{item.salesprice}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.code, e.target.value)}
                  className="w-20 px-2 py-1 border rounded-md"
                />
                <button 
                  onClick={() => removeFromCart(item.code)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold">£{total.toFixed(2)}</span>
          </div>
          <CheckoutButton />
        </div>
      </div>
    </div>
  );
}