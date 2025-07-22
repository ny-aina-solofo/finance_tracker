import { createSlice, PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import { BudgetState} from "@/types";
import { fetchBudgets } from "./fetchBudgets";
import { BudgetType } from "@/types";

const initialState: BudgetState = {
    // budgets: [{id_budget: -1, budget_name: "",column: []}],
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
            })
            .addCase(fetchBudgets.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload || "Cannot load data";
            });
    },
    reducers: {
        addBudget: (state, action: PayloadAction<{
            nom_budget: string, montant: number, 
            date_creation: string | undefined
        }>) => {
            const {nom_budget,montant,date_creation} = action.payload;
            const newID = Date.now();
            const newBudget = {
                id_budget: newID,
                nom_budget: nom_budget,
                montant: montant,
                date_creation: date_creation
            };
            state.budgets.push(newBudget);
        },
        deleteBudget: (state, action: PayloadAction<number>) => {
            const id_budget = action.payload;
            const updatedBudget = state.budgets.filter((budget:BudgetType) => budget.id_budget !== id_budget);
            state.budgets = updatedBudget;
        },
        editBudget: (state, action: PayloadAction<{
            id_budget: number, nom_budget: string, montant: number, 
            date_creation: string
        }>) => {
            const { id_budget, nom_budget, montant,date_creation } = action.payload;
            const budget = state.budgets.find((budget:BudgetType) => budget.id_budget === id_budget);
            if (budget) {
                budget.nom_budget = nom_budget;
                budget.montant = montant;
                budget.date_creation = date_creation;
            }
            
        }
    }
});

export const {
    addBudget,
    editBudget,
    deleteBudget
} = budgetSlice.actions;

export default budgetSlice.reducer;
