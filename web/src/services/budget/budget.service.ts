import http from '../http_common';

class BudgetService {
    getBudget(){
        return http.get('/get-budget',{});
    }
    addBudget(budgetName:string, montant:number, date_creation:string | undefined){
        return http.post('/add-budget',{budgetName,montant,date_creation});
    }

    // deleteBudget(id_budget:number){
    //     return http.delete(`/delete-budget/${id_budget}`);
    // }
    // updateBudget(id_budget:number,budget_name:string){
    //     return http.put('/update-budget',{id_budget,budget_name});
    // }
}

export default new BudgetService();
