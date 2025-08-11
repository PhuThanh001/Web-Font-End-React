import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
  },
});

// Export action
export const { searchProduct } = productSlice.actions;

// Export reducer
export default productSlice.reducer;
