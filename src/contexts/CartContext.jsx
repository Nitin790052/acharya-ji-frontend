import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load initial state from localStorage
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('samagri_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
      return [];
    }
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('samagri_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product) => {
    // Normalize ID: backend uses _id, some frontend logic might use id
    const itemId = product.id || product._id;
    
    setItems(current => {
      const existing = current.find(item => (item.id || item._id) === itemId);
      
      if (existing) {
        return current.map(item =>
          (item.id || item._id) === itemId
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      
      // Ensure the item in the cart has a consistent 'id' field for other components
      return [...current, { ...product, id: itemId, quantity: 1 }];
    });
    
    // Open drawer automatically for feedback
    setIsCartOpen(true);
  };

  const removeItem = (id) => {
    setItems(current => current.filter(item => (item.id || item._id) !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(current =>
      current.map(item =>
        (item.id || item._id) === id ? { ...item, quantity } : item
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
