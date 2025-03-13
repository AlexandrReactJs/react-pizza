import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import pizzaReducer from './slices/pizzaSlice';
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzaReducer
  },
})