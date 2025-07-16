import { createSlice, PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import { BudgetState} from "@/types";
import { fetchBudgets } from "./fetchBudgets";

const initialState: BudgetState = {
    // budgets: [{id_board: -1, board_name: "",column: []}],
    budgets: [],
    status: "idle",
    error: null,
};

const budgetSlice = createSlice({
    name: "budgets",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchBudgets.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchBudgets.fulfilled, (state, action) => {
                state.status = "received";
                state.budgets = action.payload;
                // if (state.activeBoardId === null && state.budgets.length > 0) {
                //     state.activeBoardId = state.budgets[0].id_board;
                // }
            })
            .addCase(fetchBudgets.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload || "Cannot load data";
            });
    },
    reducers: {
        // setActiveBoard: (state, action: PayloadAction<number | null>) => {
        //     state.activeBoardId = action.payload;
        // }
    }
});

export const {
    
} = budgetSlice.actions;

export default budgetSlice.reducer;
