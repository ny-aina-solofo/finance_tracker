import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { BudgetState } from "@/types";
import { fetchBudgets } from "./fetchBudgets";
import { BudgetType } from "@/types";

const initialState: BudgetState = {
    budgets: [],
    // Nouveau tableau pour les résultats de recherche
    filteredBudgets: [], 
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
                state.filteredBudgets = action.payload; 
            })
            .addCase(fetchBudgets.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload || "Cannot load data";
            });
    },
    reducers: {
        addBudget: (state, action: PayloadAction<{
            nom_budget: string, montant: number, 
            date_creation: string | undefined,theme:string
        }>) => {
            const { nom_budget, montant, date_creation,theme } = action.payload;
            const newID = Date.now();
            const newBudget = {
                id_budget: newID,
                nom_budget: nom_budget,
                montant_actuel: montant,
                date_creation: date_creation,
                themes: theme,
                montant_initial: montant,
                date_modification: new Date().toISOString()
            };
            state.budgets = [newBudget, ...state.budgets].sort((a, b) => {
                const dateA = a.date_modification ? new Date(a.date_modification).getTime() : 0;
                const dateB = b.date_modification ? new Date(b.date_modification).getTime() : 0;
                return dateB - dateA;
            });
            state.filteredBudgets = [newBudget, ...state.filteredBudgets].sort((a, b) => {
                const dateA = a.date_modification ? new Date(a.date_modification).getTime() : 0;
                const dateB = b.date_modification ? new Date(b.date_modification).getTime() : 0;
                return dateB - dateA;
            });
        },
        deleteBudget: (state, action: PayloadAction<number>) => {
            const id_budget = action.payload;
            const updatedBudget = state.budgets.filter((budget: BudgetType) => budget.id_budget !== id_budget);
            state.budgets = updatedBudget;
            // Assurez-vous que le tableau filtré est aussi mis à jour
            state.filteredBudgets = updatedBudget;
        },
        editBudget: (state, action: PayloadAction<{
            id_budget: number, nom_budget: string, date_creation: string, theme:string
        }>) => {
            const { id_budget, nom_budget, date_creation,theme } = action.payload;
            const budgetToEdit = state.budgets.find((budget: BudgetType) => budget.id_budget === id_budget);
            if (budgetToEdit) {
                budgetToEdit.nom_budget = nom_budget;
                budgetToEdit.date_creation = date_creation;
                budgetToEdit.themes = theme;
            }
            // Mettez à jour le tableau filtré également
            const filteredBudgetToEdit = state.filteredBudgets.find((budget: BudgetType) => budget.id_budget === id_budget);
            if (filteredBudgetToEdit) {
                filteredBudgetToEdit.nom_budget = nom_budget;
                filteredBudgetToEdit.date_creation = date_creation;
                filteredBudgetToEdit.themes = theme;
            }
        },
        searchBudget: (state, action: PayloadAction<string>) => {
            const searchTerm = action.payload.toLowerCase(); // Utilisez toLowerCase() pour une recherche insensible à la casse
            // Filtrez à partir de la liste originale, pas de la liste filtrée
            state.filteredBudgets = state.budgets.filter((budget: BudgetType) => 
                budget.nom_budget.toLowerCase().includes(searchTerm)
            );
        },
        updateMontantActuel: (state, action: PayloadAction<{id_budget:number, montant_actuel:number}>) => {
            const {id_budget,montant_actuel} = action.payload;
            const budgetToEdit = state.budgets.find((budget: BudgetType) => budget.id_budget === id_budget);
            if (budgetToEdit) {
                budgetToEdit.montant_actuel = montant_actuel;
            }
            const filteredBudgetToEdit = state.filteredBudgets.find((budget: BudgetType) => budget.id_budget === id_budget);
            if (filteredBudgetToEdit) {
                filteredBudgetToEdit.montant_actuel = montant_actuel;
            }
        }, 
    }
});

export const {
    addBudget,
    editBudget,
    deleteBudget,
    searchBudget,
    updateMontantActuel,
} = budgetSlice.actions;

export default budgetSlice.reducer;