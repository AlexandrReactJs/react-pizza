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
                found.count ++;
            } else {
                state.cart.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.totalPrice += action.payload.price;

        },
        minusPizza (state, action) {
            const foundPizza = state.cart.find(item => item.id === action.payload.id && item.types === action.payload.types && item.sizes === action.payload.sizes);
            debugger;
            if (foundPizza) {
                foundPizza.count --;
            }
            
        },
        plusPizza(state, action){
            const foundPizza = state.cart.find(item => item.id === action.payload.id && item.types === action.payload.types && item.sizes === action.payload.sizes);
            if (foundPizza) {
                foundPizza.count ++;
            }
        }
    },
})


export const { addPizza, minusPizza,plusPizza } = cartSlice.actions;

export default cartSlice.reducer;