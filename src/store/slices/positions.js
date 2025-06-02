import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  positions: [],
  loading: false,
  error: null
};

const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    setPositions: (state, action) => {
      state.positions = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setPositions, setLoading, setError } = positionsSlice.actions;
export default positionsSlice.reducer;
