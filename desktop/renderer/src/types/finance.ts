export type BudgetType = {
    id_budget: number;
    nom_budget: string;
    montant_initial: number;
    montant_actuel:number;
    date_creation: string;
    date_modification: string;
    id_utilisateur:string;
    themes:string;
}
export type TransactionsType = {
    id_transaction: number;
    libelle: string;
    montant: number;
    type_transaction:string;
    date_creation: string;
    date_modification: string;
    id_utilisateur:string;
}

export type Status = "idle" | "loading" | "received" | "rejected";

export type BudgetState = {
    budgets: any;
    filteredBudgets: any;
    status: Status;
    error: string | null;
}
export type TransactionState = {
    transactions: any;
    status: Status;
    error: string | null;
}


