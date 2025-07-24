import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionsType } from "@/types";
import { RootState } from "./store";
import transactionService from "@/services/transactions/transaction.service";

export const fetchTransactions = createAsyncThunk<
    TransactionsType[],
    undefined,
    {
      state: RootState;
      rejectValue: string;
    }
>(
    'budgets/fetchBudgets',
    async (_, { rejectWithValue}) => {
        try {
            const response = await transactionService.getTransaction();
            return response?.data || [];
        } catch (err) {
            if (err instanceof Error) return rejectWithValue(err.message);
            return rejectWithValue("Cannot fetch transactions");
        }
    }
);