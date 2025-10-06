import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { TransactionState} from "@/types";
import { TransactionsType } from "@/types";
import { deleteBudget } from "./budgetSlice";

const initialState: TransactionState = {
    transactions: [],
    status: "idle",
    error: null,
};

const TransactionSlice = createSlice({
    name: "Transactions",
    initialState,
    reducers: {
        setTransactions:(state, action: PayloadAction<{data:any[]}>)=>{
            const {data} = action.payload;
            state.status = "received";
            state.transactions = data;
        },
        addTransaction: (state, action: PayloadAction<{
            libelle: string, montant: number, date_creation: string | undefined,
            nom_budget:string,type_transaction:string,id_budget:number
        }>) => {
            const {libelle,montant,date_creation,nom_budget,type_transaction,id_budget} = action.payload;
            const newID = Date.now();
            const newTransactions = {
                id_transaction: newID,
                libelle: libelle,
                montant: montant,
                date_creation: date_creation,
                nom_budget: nom_budget,
                type_transaction: type_transaction,
                date_modification: new Date().toISOString(),
                id_budget:id_budget
            };
            state.transactions = [newTransactions, ...state.transactions].sort((a, b) => {
                const dateA = a.date_modification ? new Date(a.date_modification).getTime() : 0;
                const dateB = b.date_modification ? new Date(b.date_modification).getTime() : 0;
                return dateB - dateA;
            });
        },
        deleteTransaction: (state, action: PayloadAction<{id_transaction:number,type_transaction:string}>) => {
            const {id_transaction,type_transaction} = action.payload;
            const updatedTransaction = state.transactions.filter((t:TransactionsType) => {
                const isMatch = t.id_transaction === id_transaction && t.type_transaction === type_transaction;
                return !isMatch;
            });

            state.transactions = updatedTransaction;
        },
        editTransaction: (state, action: PayloadAction<{
            id_transaction: number, libelle: string, date_creation: string | undefined,type_transaction:string
        }>) => {
            const { id_transaction, libelle, date_creation,type_transaction } = action.payload;
            const transaction = state.transactions.find((transaction:TransactionsType) => transaction.id_transaction === id_transaction);
            if (transaction) {
                transaction.libelle = libelle;
                transaction.date_creation = date_creation;            
                transaction.type_transaction = type_transaction;
            }  
        },
        setLoadingStatus:(state, action: PayloadAction<{}>)=>{
            state.status = "loading";
            state.error = null
        },
        setErrorStatus:(state, action: PayloadAction<{error:any}>)=>{
            const {error} = action.payload;
            state.status = "rejected";
            state.error = error && "Cannot load data";
        }, 

    },
    extraReducers: (builder) => {
        builder.addCase(deleteBudget, (state, action) => {
            const id_budget = action.payload;
            state.transactions = state.transactions.filter(
                (t: TransactionsType) => t.id_budget !== id_budget
            );
        });
    }
});

export const {
    setTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    setLoadingStatus,
    setErrorStatus
} = TransactionSlice.actions;

export default TransactionSlice.reducer;
