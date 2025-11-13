export interface SignUpResponse {
  id: number;       // présent en cas de succès
  token: string;    // présent en cas de succès
}
export interface SignInResponse {
    userData : any;
}

export interface TransactionsResponse {
    transactions : any;
}

export interface IElectronAPI {
  signUp: (nom: string, password: string, email: string) => Promise<SignUpResponse>;
  signIn: (email: string, password_user: string) => Promise<SignInResponse>;
  getTransaction : () => Promise<TransactionsResponse>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

export {};

