import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryIndex: 0,
  sortIndex: 0,
  pageSize: 4,
  totalPizzasCount: 10,
  currentPage: 1
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
   setCategoryIndex (state, action) {
      state.categoryIndex = action.payload;
   },
   setSortIndex (state, action) {
      state.sortIndex = action.payload;
   },
   setCurrentPage (state, action) {
    state.currentPage = action.payload;
   }
  },
})


export const { setCategoryIndex, setSortIndex, setCurrentPage } = filterSlice.actions

export default filterSlice.reducer