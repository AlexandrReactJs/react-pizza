import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '../store';


interface PizzaItem {
    id: number;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
    activeTypeIndex: number;
    activeSize: number;
}

interface PizzaState {
    items: PizzaItem[];
    status: 'loading' | 'OK' | 'error';
}

interface FetchPizzaParams {
    currentPage: number;
    pageSize: number;
    searchValue: string;
    categoryActiveIndex: number;
    selectedSortItem: string;
}

const initialState: PizzaState = {
    items: [],
    status: 'loading'
}

export const fetchPizzas = createAsyncThunk<PizzaState['items'], FetchPizzaParams>(
    'pizza/fetchPizzas',
    async (params) => {
        const {currentPage, pageSize, searchValue, categoryActiveIndex, selectedSortItem} = params;
        const response = await axios.get(`https://67d2d3bb90e0670699bf464e.mockapi.io/items?page=${currentPage}&limit=${pageSize}&${searchValue ? `search=${searchValue}` : ``}&${categoryActiveIndex > 0 ? `category=${categoryActiveIndex}` : ``}&sortBy=${selectedSortItem}`);
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload.map(el => ({...el, activeTypeIndex: 0, activeSize: 26}));
                state.status = 'OK';
            })
            .addCase(fetchPizzas.pending, (state) => {
                state.items = [];
                state.status = 'loading';
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = "error";
                state.items = [];
            });
    }
})

export const pizzaSelector = (state: RootState) => state.pizza;

export const { setPizzaSize, setPizzaType } = pizzaSlice.actions;

export default pizzaSlice.reducer;