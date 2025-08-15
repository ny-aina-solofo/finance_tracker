export type UserType = {
    id_user: number;
    nom: string;
    password_user: string;
    email: string;
}

type Status = "idle" | "loading" | "received" | "rejected";

export type UserState = {
    users: any;
    status: Status;
    error: string | null;
}


