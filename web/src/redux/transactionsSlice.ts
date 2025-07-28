import { createSlice,PayloadAction } from "@reduxjs/toolkit";
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
        addTransaction: (state, action: PayloadAction<{
            libelle: string, montant: number, date_creation: string | undefined,
            nom_budget:string,type_transaction:string
        }>) => {
            const {libelle,montant,date_creation,nom_budget,type_transaction} = action.payload;
            const newID = Date.now();
            if (type_transaction === 'depense') {
                const newDepense = {
                    id_depense: newID,
                    libelle: libelle,
                    montant: montant,
                    date_creation: date_creation,
                    nom_budget: nom_budget,
                    type_transaction: type_transaction
                };
                state.transactions.push(newDepense);    
            } else {
                const newRevenu = {
                    id_revenu: newID,
                    libelle: libelle,
                    montant: montant,
                    date_creation: date_creation,
                    nom_budget: nom_budget,
                    type_transaction: type_transaction
                };
                state.transactions.push(newRevenu);
            }
            
        },
        // deleteTransaction: (state, action: PayloadAction<number>) => {
        //     const id_Transaction = action.payload;
        //     const updatedTransaction = state.transactions.filter((t:TransactionsType) => t.id_transactions !== id_transactions);
        //     state.transactions = updatedTransaction;
        // },
        // editTransaction: (state, action: PayloadAction<{
        //     id_Transaction: number, libelle: string, montant: number, 
        //     date_creation: string
        // }>) => {
        //     const { id_Transaction, libelle, montant,date_creation } = action.payload;
        //     const Transaction = state.transactions.find((transaction:TransactionsType) => Transaction.id_Transaction === id_Transaction);
        //     if (Transaction) {
        //         Transaction.libelle = libelle;
        //         Transaction.montant = montant;
        //         Transaction.date_creation = date_creation;
        //     }
            
        // }
    }
});

export const {
    addTransaction,
    // editTransaction,
    // deleteTransaction
} = TransactionSlice.actions;

export default TransactionSlice.reducer;
