class TransactionService {

    getTransaction(){
        // const userStr = sessionStorage.getItem("utilisateur connecté");
        // const id_utilisateur = userStr 
        const transactions = window.electronAPI.getTransaction();        
        return transactions;
    }
    addTransaction(
        libelle:string, montant:number, date_creation:string | undefined,
        id_budget:number,type_transaction:string
    ){
        
    }
    deleteTransaction(id_transaction:number,type_transaction:string){
        
    }
    updateTransaction(
        id_transaction:number,libelle:string,date_creation:string | undefined,type_transaction:string
    ){
    
    }
}

export default new TransactionService();
