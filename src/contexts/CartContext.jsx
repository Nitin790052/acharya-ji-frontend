import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

const initialItems = [
  {
    id: '1',
    name: 'Premium Dhoop',
    price: 299,
    quantity: 2,
    image: '/placeholder.svg',
    category: 'Puja Essentials'
  },
  {
    id: '2',
    name: 'Pure Desi Ghee',
    price: 599,
    quantity: 1,
    image: '/placeholder.svg',
    category: 'Puja Essentials'
  },
  {
    id: '3',
    name: 'Samidha Wood',
    price: 199,
    quantity: 3,
    image: '/placeholder.svg',
    category: 'Hawan Items'
  },
  {
    id: '4',
    name: 'Complete Puja Samagri',
    price: 999,
    quantity: 1,
    image: '/placeholder.svg',
    category: 'Puja Kits'
  }
];

export function CartProvider({ children }) {
  const [items, setItems] = useState(initialItems);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = (newItem) => {
    setItems(current => {
      const existing = current.find(item => item.id === newItem.id);
      if (existing) {
        return current.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
