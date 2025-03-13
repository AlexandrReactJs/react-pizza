import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {
  categoryIndex: 0,
  sortIndex: 0,
  pageSize: 4,
  totalPizzasCount: 10,
  currentPage: 1,
  isOpenPopup: false,
  searchValue: ''
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
   },
   setFilters (state, action) {
    state.sortIndex = Number(action.payload.sort)
    state.currentPage = Number(action.payload.currentPage)
    state.categoryIndex = Number(action.payload.categoryActiveIndex)
   },
   setSearchValue (state, action) {
    state.searchValue = action.payload;
   }
  },
})

export const filterSelector = (state: RootState) => state.filter;
export const { setCategoryIndex, setSortIndex, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer