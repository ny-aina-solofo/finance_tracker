import { createSlice, PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import { BudgetType } from "@/types";
import { RootState } from "./store";
import budgetService from "../services/budget/budget.service";

export const fetchBudgets = createAsyncThunk<
    BudgetType[],
    undefined,
    {
      state: RootState;
      rejectValue: string;
    }
>(
    'budgets/fetchBudgets',
    async (_, { rejectWithValue}) => {
        try {
            const response = await budgetService.getBudget();
            return response?.data || [];
        } catch (err) {
            if (err instanceof Error) return rejectWithValue(err.message);
            return rejectWithValue("Cannot fetch budgets");
        }
    }
);