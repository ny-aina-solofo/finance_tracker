interface ImportMetaEnv {
    readonly VITE_API_BASE_URL_BUDGET: string;
    readonly VITE_API_BASE_URL_USER: string;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}
