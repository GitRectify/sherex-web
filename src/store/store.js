import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import walletReducer from "./slices/wallet";
import tokenReducer from "./slices/tokens";
import poolsReducer from "./slices/pools";
import positionsReducer from './slices/positions';
import stakingReducer from "./slices/staking";
import swapReducer from './slices/swaps';
import bundleReducer from './slices/bundle';
import masterchefReducer from './slices/masterchef';

const reducer = {
  auth: authReducer,
  wallet: walletReducer,
  tokens: tokenReducer,
  pools: poolsReducer,
  positions: positionsReducer,
  staking: stakingReducer,
  swaps: swapReducer,
  masterChef: masterchefReducer,
  bundle: bundleReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;
