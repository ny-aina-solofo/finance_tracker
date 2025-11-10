import http from '../http_common_budget';

class TransactionService {
    getAuthHeaders() {
        const currentUser = sessionStorage.getItem("utilisateur connecté");
        const parseData = currentUser ? JSON.parse(currentUser) : null; 
        const token = parseData.token;
        if (token) {
            return { headers: { Authorization: `Bearer ${token}`} };
        }
        return {};
    }
    getTransaction(){
        return http.get('/get-transaction',this.getAuthHeaders());
    }
    addTransaction(
        libelle:string, montant:number, date_creation:string | undefined,
        id_budget:number,type_transaction:string
    ){
        return http.post('/add-transaction',
            {libelle,montant,date_creation,id_budget,type_transaction},
            this.getAuthHeaders()
        );
    }
    deleteTransaction(id_transaction:number,type_transaction:string){
        const authHeaders = this.getAuthHeaders();
        return http.delete(`/delete-transaction/${id_transaction}`, {
            ...authHeaders,
            params: {
                type_transaction: type_transaction
            }
        });
    }
    updateTransaction(
        id_transaction:number,libelle:string,date_creation:string | undefined,type_transaction:string
    ){
        return http.put(`/update-transaction/${id_transaction}`,{
            libelle,date_creation,type_transaction
        },this.getAuthHeaders());
    }
}

export default new TransactionService();
