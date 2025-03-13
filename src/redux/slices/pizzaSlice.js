import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    items: [],
    status: 'loading' // loading / OK / ERROR
}




export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    
    async (params) => {
        
        const {currentPage, pageSize, searchValue, categoryActiveIndex, selectedSortItem} = params;
        const response = await axios.get(`https://630b9081ed18e82516559755.mockapi.io/pizzas?page=${currentPage}&limit=${pageSize}&${searchValue ? `search=${searchValue}` : ``}&${categoryActiveIndex > 0 ? `category=${categoryActiveIndex}` : ``}&sortBy=${selectedSortItem}`);
        return response.data;

    }

)

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        /*setPizzas(state, action) {
            state.items = action.payload;
        },*/
        setPizzaType (state, action) {
            let found = state.items.find(elm => elm.id === action.payload.id);
            if(found){
                found.activeTypeIndex = action.payload.activeType;
            }
        },
        setPizzaSize (state, action) {
            let found = state.items.find(elm => elm.id === action.payload.id);
            if(found){
                found.activeSize = action.payload.pizzaSize;
            }
        }
    },
    extraReducers: {
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload.map( el => ({...el, activeTypeIndex: 0, activeSize: 26}))
            state.status = 'OK';
        },
        [fetchPizzas.pending]: (state) => {
            state.items = [];
            state.status = 'loading';
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = "error";
            state.items = [];
        },
    }

})

export const pizzaSelector = (state) => state.pizza;

export const { setPizzas, setPizzaSize, setPizzaType } = pizzaSlice.actions;

export default pizzaSlice.reducer;