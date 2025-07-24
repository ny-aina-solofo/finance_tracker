export type BudgetType = {
    id_budget: number;
    nom_budget: string;
    montant: number;
    date_creation: string;
    date_modification: string;

}
export type TransactionsType = {
    id_transaction: number;
    libelle: string;
    montant: number;
    date_creation: string;
    date_modification: string;
    id_budget:number;
    nom_budget: string;
    type_transaction:string;
}

export type Status = "idle" | "loading" | "received" | "rejected";

export type BudgetState = {
    budgets: any;
    status: Status;
    error: string | null;
}
export type TransactionState = {
    transactions: any;
    status: Status;
    error: string | null;
}


