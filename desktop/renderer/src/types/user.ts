export type UserType = {
    id_utilisateur: number;
    nom: string;
    passwords: string;
    email: string;
}

type Status = "idle" | "loading" | "received" | "rejected";

export type UserState = {
    users: any;
    status: Status;
    error: string | null;
}


