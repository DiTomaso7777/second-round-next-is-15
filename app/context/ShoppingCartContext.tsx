"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  code: string;
  name: string;
  quantity: number;
  salesprice: string;
}

interface ShoppingCartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (code: string) => void;
  updateQuantity: (code: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const ShoppingCartContext = createContext<ShoppingCartContextProps | undefined>(undefined);

export const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.code === item.code);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.code === item.code
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (code: string) => {
    setCart((prevCart) => prevCart.filter(item => item.code !== code));
  };

  const updateQuantity = (code: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map(item =>
        item.code === code ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => 
      total + (parseFloat(item.salesprice) * item.quantity), 0
    );
  };

  return (
    <ShoppingCartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return context;
};