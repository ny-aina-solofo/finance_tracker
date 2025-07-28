import http from '../http_common';

class TransactionService {
    getTransaction(){
        return http.get('/get-transaction',{});
    }
    addTransaction(
        libelle:string, montant:number, date_creation:string | undefined,
        id_budget:number,type_transaction:string
    ){
        return http.post('/add-transaction',{libelle,montant,date_creation,id_budget,type_transaction});
    }
    // deleteTransaction(id_Transaction:number){
    //     return http.delete(`/delete-Transaction/${id_Transaction}`);
    // }
    // updateTransaction(id_Transaction:number,nom_Transaction:string,montant:number, date_creation:string | undefined){
    //     return http.put(`/update-Transaction/${id_Transaction}`,{nom_Transaction,montant,date_creation});
    // }
}

export default new TransactionService();
