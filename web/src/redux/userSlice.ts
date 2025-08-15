import { createSlice, PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import { UserState} from "@/types";
import { fetchUsers } from "./fetchUsers";

const initialState: UserState = {
    users: [],
    status: "idle",
    error: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = "received";
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload || "Cannot load data";
            });
    },
    reducers: {
        // addBudget: (state, action: PayloadAction<{
        //     nom_budget: string, montant: number, 
        //     date_creation: string | undefined
        // }>) => {
        //     const {nom_budget,montant,date_creation} = action.payload;
        //     const newID = Date.now();
        //     const newBudget = {
        //         id_budget: newID,
        //         nom_budget: nom_budget,
        //         montant: montant,
        //         date_creation: date_creation
        //     };
        //     state.users.push(newBudget);
        // },
        // deleteBudget: (state, action: PayloadAction<number>) => {
        //     const id_budget = action.payload;
        //     const updatedBudget = state.users.filter((budget:BudgetType) => budget.id_budget !== id_budget);
        //     state.users = updatedBudget;
        // },
        // editBudget: (state, action: PayloadAction<{
        //     id_budget: number, nom_budget: string, montant: number, 
        //     date_creation: string
        // }>) => {
        //     const { id_budget, nom_budget, montant,date_creation } = action.payload;
        //     const budget = state.users.find((budget:BudgetType) => budget.id_budget === id_budget);
        //     if (budget) {
        //         budget.nom_budget = nom_budget;
        //         budget.montant = montant;
        //         budget.date_creation = date_creation;
        //     }
            
        // }
    }
});

export const {
    // addBudget,
    // editBudget,
    // deleteBudget
} = userSlice.actions;

export default userSlice.reducer;
