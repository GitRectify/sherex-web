import { configureStore } from '@reduxjs/toolkit';
import statisticsReducer from './slices/statistics';
// ... other imports

export const store = configureStore({
    reducer: {
        statistics: statisticsReducer,
        // ... other reducers
    }
}); 