export type BudgetType = {
    id_budget: number;
    nom_budget: string;
    montant: number;
    date_creation: string;
    date_modification: string;

}

export type Status = "idle" | "loading" | "received" | "rejected";

export type BudgetState = {
    budgets: any;
    status: Status;
    error: string | null;
}



