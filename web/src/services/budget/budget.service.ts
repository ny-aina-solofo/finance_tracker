import http from '../http_common_budget';

class BudgetService {
    getAuthHeaders() {
        const currentUser = sessionStorage.getItem("utilisateur connecté");
        const parseData = currentUser ? JSON.parse(currentUser) : null; 
        const token = parseData.token;
        if (token) {
            return { headers: { Authorization: `Bearer ${token}`} };
        }
        return {};
    }
    getBudget(){
        return http.get(`/get-budget`,this.getAuthHeaders());
    }
    addBudget(nom_budget:string, montant:number, date_creation:string | undefined){
        return http.post('/add-budget',{nom_budget,montant,date_creation},this.getAuthHeaders());
    }
    deleteBudget(id_budget:number){
        return http.delete(`/delete-budget/${id_budget}`,this.getAuthHeaders());
    }
    updateBudget(id_budget:number,nom_budget:string,date_creation:string | undefined){
        return http.put(`/update-budget/${id_budget}`,{nom_budget,date_creation},this.getAuthHeaders());
    }
}

export default new BudgetService();
