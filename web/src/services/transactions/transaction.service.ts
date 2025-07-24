import http from '../http_common';

class TransactionService {
    getTransaction(){
        return http.get('/get-transaction',{});
    }
    // addTransaction(nom_Transaction:string, montant:number, date_creation:string | undefined){
    //     return http.post('/add-Transaction',{nom_Transaction,montant,date_creation});
    // }
    // deleteTransaction(id_Transaction:number){
    //     return http.delete(`/delete-Transaction/${id_Transaction}`);
    // }
    // updateTransaction(id_Transaction:number,nom_Transaction:string,montant:number, date_creation:string | undefined){
    //     return http.put(`/update-Transaction/${id_Transaction}`,{nom_Transaction,montant,date_creation});
    // }
}

export default new TransactionService();
