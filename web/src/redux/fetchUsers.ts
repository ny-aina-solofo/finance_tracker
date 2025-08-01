import { createSlice, PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "@/types";
import { RootState } from "./store";
import usersService from "@/services/users/users.service";

export const fetchUsers = createAsyncThunk<
    UserType[],
    undefined,
    {
      state: RootState;
      rejectValue: string;
    }
>(
    'budgets/fetchUsers',
    async (_, { rejectWithValue}) => {
        try {
            const response = await usersService.signIn();
            return response?.data || [];
        } catch (err) {
            if (err instanceof Error) return rejectWithValue(err.message);
            return rejectWithValue("Cannot fetch budgets");
        }
    }
);