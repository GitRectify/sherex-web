import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false, isWalletConnected: true };

const authSlice = createSlice({
  name: "auth",
  initialState,
});

const { reducer } = authSlice;

export default reducer;
