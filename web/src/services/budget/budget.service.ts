import http from '../http_common';

class BudgetService {
    getBudget(){
        return http.get('/get-budget',{});
    }
    // addBudget(budget_name:string){
    //     return http.post('/add-budget',{budget_name});
    // }
    // deleteBudget(id_budget:number){
    //     return http.delete(`/delete-budget/${id_budget}`);
    // }
    // updateBudget(id_budget:number,budget_name:string){
    //     return http.put('/update-budget',{id_budget,budget_name});
    // }
}

export default new BudgetService();
