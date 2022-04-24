import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  getListSeller: [],
  getSellerById: {},
};

export const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    getListSeller: (state, action) => {
      state.getListSeller = [...state.getListSeller, action.payload];
    },
    getSellerById: (state, action) => {
      state.getSellerById = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getListSeller, getSellerById } = sellerSlice.actions;

export default sellerSlice.reducer;
