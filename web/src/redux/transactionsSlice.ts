import { createSlice } from "@reduxjs/toolkit";
import { TransactionState} from "@/types";
import { fetchTransactions } from "./fetchTransactions";
import { TransactionsType } from "@/types";

const initialState: TransactionState = {
    transactions: [],
    status: "idle",
    error: null,
};

const TransactionSlice = createSlice({
    name: "Transactions",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.status = "received";
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload || "Cannot load data";
            });
    },
    reducers: {
        // addTransaction: (state, action: PayloadAction<{
        //     nom_Transaction: string, montant: number, 
        //     date_creation: string | undefined
        // }>) => {
        //     const {nom_Transaction,montant,date_creation} = action.payload;
        //     const newID = Date.now();
        //     const newTransaction = {
        //         id_Transaction: newID,
        //         nom_Transaction: nom_Transaction,
        //         montant: montant,
        //         date_creation: date_creation
        //     };
        //     state.transactions.push(newTransaction);
        // },
        // deleteTransaction: (state, action: PayloadAction<number>) => {
        //     const id_Transaction = action.payload;
        //     const updatedTransaction = state.transactions.filter((t:TransactionsType) => t.id_transactions !== id_transactions);
        //     state.transactions = updatedTransaction;
        // },
        // editTransaction: (state, action: PayloadAction<{
        //     id_Transaction: number, nom_Transaction: string, montant: number, 
        //     date_creation: string
        // }>) => {
        //     const { id_Transaction, nom_Transaction, montant,date_creation } = action.payload;
        //     const Transaction = state.transactions.find((transaction:TransactionsType) => Transaction.id_Transaction === id_Transaction);
        //     if (Transaction) {
        //         Transaction.nom_Transaction = nom_Transaction;
        //         Transaction.montant = montant;
        //         Transaction.date_creation = date_creation;
        //     }
            
        // }
    }
});

export const {
    // addTransaction,
    // editTransaction,
    // deleteTransaction
} = TransactionSlice.actions;

export default TransactionSlice.reducer;
