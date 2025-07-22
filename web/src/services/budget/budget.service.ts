import http from '../http_common';

class BudgetService {
    getBudget(){
        return http.get('/get-budget',{});
    }
    addBudget(nom_budget:string, montant:number, date_creation:string | undefined){
        return http.post('/add-budget',{nom_budget,montant,date_creation});
    }
    // deleteBudget(id_budget:number){
    //     return http.delete(`/delete-budget/${id_budget}`);
    // }
    updateBudget(id_budget:number,nom_budget:string,montant:number, date_creation:string | undefined){
        return http.put(`/update-budget/${id_budget}`,{nom_budget,montant,date_creation});
    }
}

export default new BudgetService();
