import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "./budgetSlice";
import transactionsReducer from "./transactionsSlice";
import userReducer  from "./userSlice";

export const store = configureStore({
    reducer: {
        budgets : budgetReducer,
        transactions: transactionsReducer,
        users : userReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

