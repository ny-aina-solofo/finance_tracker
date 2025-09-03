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
                // Stockez les données originales ici
                const sortedBudgets = action.payload.map((b: BudgetType) => ({
                    ...b,
                    date_modification: b.date_modification || new Date().toISOString()
                })).sort((a: BudgetType, b: BudgetType) => {
                    const dateA = a.date_modification ? new Date(a.date_modification).getTime() : 0;
                    const dateB = b.date_modification ? new Date(b.date_modification).getTime() : 0;
                    return dateB - dateA;
                });
                state.budgets = sortedBudgets;
                // Stockez également les données non filtrées pour l'affichage initial
                state.filteredBudgets = sortedBudgets; 
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
            const { nom_budget, montant, date_creation } = action.payload;
            const newID = Date.now();
            const newBudget = {
                id_budget: newID,
                nom_budget: nom_budget,
                montant: montant,
                date_creation: date_creation
            };
            // Ajoutez à la fois aux budgets originaux et filtrés
            state.budgets.push(newBudget);
            state.filteredBudgets.push(newBudget);
        },
        deleteBudget: (state, action: PayloadAction<number>) => {
            const id_budget = action.payload;
            const updatedBudget = state.budgets.filter((budget: BudgetType) => budget.id_budget !== id_budget);
            state.budgets = updatedBudget;
            // Assurez-vous que le tableau filtré est aussi mis à jour
            state.filteredBudgets = updatedBudget;
        },
        editBudget: (state, action: PayloadAction<{
            id_budget: number, nom_budget: string, date_creation: string
        }>) => {
            const { id_budget, nom_budget, date_creation } = action.payload;
            const budgetToEdit = state.budgets.find((budget: BudgetType) => budget.id_budget === id_budget);
            if (budgetToEdit) {
                budgetToEdit.nom_budget = nom_budget;
                budgetToEdit.date_creation = date_creation;
            }
            // Mettez à jour le tableau filtré également
            const filteredBudgetToEdit = state.filteredBudgets.find((budget: BudgetType) => budget.id_budget === id_budget);
            if (filteredBudgetToEdit) {
                filteredBudgetToEdit.nom_budget = nom_budget;
                filteredBudgetToEdit.date_creation = date_creation;
            }
        },
        searchBudget: (state, action: PayloadAction<string>) => {
            const searchTerm = action.payload.toLowerCase(); // Utilisez toLowerCase() pour une recherche insensible à la casse
            // Filtrez à partir de la liste originale, pas de la liste filtrée
            state.filteredBudgets = state.budgets.filter((budget: BudgetType) => 
                budget.nom_budget.toLowerCase().includes(searchTerm)
            );
        },
    }
});

export const {
    addBudget,
    editBudget,
    deleteBudget,
    searchBudget
} = budgetSlice.actions;

export default budgetSlice.reducer;