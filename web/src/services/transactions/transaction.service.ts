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
    deleteTransaction(id_transaction:number,type_transaction:string){
        return http.delete(`/delete-transaction/${id_transaction}`, {
            params: {
                type_transaction: type_transaction
            }
        });
    }
    updateTransaction(
        id_transaction:number,libelle:string,montant:number, date_creation:string | undefined,
        id_budget:number,type_transaction:string
    ){
        return http.put(`/update-transaction/${id_transaction}`,{
            libelle,montant,date_creation,
            id_budget,type_transaction
        });
    }
}

export default new TransactionService();
