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
                // state.transactions = action.payload;
                state.transactions = action.payload.map((t: TransactionsType) => ({
                    ...t,
                    date_modification: t.date_modification || new Date().toISOString()
                })).sort((a: TransactionsType, b: TransactionsType) => {
                    const dateA = a.date_modification ? new Date(a.date_modification).getTime() : 0;
                    const dateB = b.date_modification ? new Date(b.date_modification).getTime() : 0;
                    return dateB - dateA; // Sort in descending order (latest first)
                });
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
        deleteTransaction: (state, action: PayloadAction<number>) => {
            const id_transaction = action.payload;
            const updatedTransaction = state.transactions.filter((t:TransactionsType) => t.id_transaction !== id_transaction);
            state.transactions = updatedTransaction;
        },
        editTransaction: (state, action: PayloadAction<{
            id_transaction: number, libelle: string, montant: number, date_creation: string | undefined,
            nom_budget:string,type_transaction:string
        }>) => {
            const { id_transaction, libelle, montant,date_creation,nom_budget,type_transaction } = action.payload;
            const transaction = state.transactions.find((transaction:TransactionsType) => transaction.id_transaction === id_transaction);
            if (transaction) {
                if (type_transaction === 'depense') {
                    transaction.libelle = libelle;
                    transaction.montant = montant;
                    transaction.date_creation = date_creation;
                    transaction.nom_budget = nom_budget;            
                    transaction.type_transaction = type_transaction;
                } else {
                    transaction.libelle = libelle;
                    transaction.montant = montant;
                    transaction.date_creation = date_creation;
                    transaction.nom_budget = nom_budget            
                    transaction.type_transaction = type_transaction;
                }
            }
            
        }
    }
});

export const {
    addTransaction,
    editTransaction,
    deleteTransaction,
} = TransactionSlice.actions;

export default TransactionSlice.reducer;
