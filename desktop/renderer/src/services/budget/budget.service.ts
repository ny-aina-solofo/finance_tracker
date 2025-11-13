class BudgetService {
    // getAuthHeaders() {
    //     const currentUser = sessionStorage.getItem("utilisateur connecté");
    //     const parseData = currentUser ? JSON.parse(currentUser) : null; 
    //     const token = parseData.token;
    //     if (token) {
    //         return { headers: { Authorization: `Bearer ${token}`} };
    //     }
    //     return {};
    // }
    getBudget(){
    }
    addBudget(nom_budget:string, montant:number, date_creation:string | undefined,themes:string){
    }
    deleteBudget(id_budget:number){
    }
    updateBudget(id_budget:number,nom_budget:string,date_creation:string | undefined,themes:string){
    }
}

export default new BudgetService();
