import { configureStore } from "@reduxjs/toolkit";
// import boardReducer from "./boardSlice";


export const store = configureStore({
    reducer: {
        // boards : boardReducer,
        // modal : modalReducer,
        // input : inputReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

