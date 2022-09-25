import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    cart: [

    ]
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

            state.cart = state.cart.filter(item => item !== foundPizza)
            state.totalPrice -= action.payload.price * foundPizza.count;


        },
        clearCart(state) {
            state.cart = [];
            state.totalPrice = 0;
        }

    }
})


export const cartSelector = (state) => state.cart; 

export const { addPizza, minusPizza, plusPizza, removePizza, clearCart } = cartSlice.actions;

export default cartSlice.reducer;