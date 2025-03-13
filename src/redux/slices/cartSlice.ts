import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface CartItem {
  id: number;
  title: string;
  types: string;
  sizes: number;
  price: number;
  count: number;
  img: string;
}

interface CartState {
  totalPrice: number;
  cart: CartItem[];
}

const initialState: CartState = {
    totalPrice: 0,
    cart: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizza(state, action) {
            const found = state.cart.find(item => item.id === action.payload.id && item.types === action.payload.types && item.sizes === action.payload.sizes);
            if (found) {
                found.count++;
            } else {
                state.cart.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.totalPrice += action.payload.price;

        },
        minusPizza(state, action) {
            const foundPizza = state.cart.find(item => item.id === action.payload.id && item.types === action.payload.types && item.sizes === action.payload.sizes);
            if (foundPizza && foundPizza.count > 1) {
                foundPizza.count--;
                state.totalPrice -= action.payload.price;
            }

        },
        plusPizza(state, action) {
            const foundPizza = state.cart.find(item => item.id === action.payload.id && item.types === action.payload.types && item.sizes === action.payload.sizes);
            if (foundPizza) {
                foundPizza.count++;
                state.totalPrice += action.payload.price;
            }
        },
        removePizza(state, action) {
            const foundPizza = state.cart.find(item => item.id === action.payload.id && item.types === action.payload.types && item.sizes === action.payload.sizes);
            if (foundPizza) {
                state.cart = state.cart.filter(item => item !== foundPizza)
                state.totalPrice -= action.payload.price * foundPizza.count;
            }
        },
        clearCart(state) {
            state.cart = [];
            state.totalPrice = 0;
        }

    }
})


export const cartSelector = (state: RootState) => state.cart; 

export const { addPizza, minusPizza, plusPizza, removePizza, clearCart } = cartSlice.actions;

export default cartSlice.reducer;