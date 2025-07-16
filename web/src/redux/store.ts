import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "./budgetSlice";


export const store = configureStore({
    reducer: {
        budgets : budgetReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

