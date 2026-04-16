import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],   // Array of pooja objects
  cartTotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Check if item already exists
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.cartItems.push(action.payload);
      }
      
      // Update total (assuming payload has a numeric 'price' property)
      state.cartTotal = state.cartItems.reduce((total, item) => total + (Number(item.price) || 0), 0);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
      state.cartTotal = state.cartItems.reduce((total, item) => total + (Number(item.price) || 0), 0);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotal = 0;
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
