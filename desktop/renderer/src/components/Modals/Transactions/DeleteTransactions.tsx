import React, { useState,useEffect } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { useDispatch,useSelector } from "react-redux"
import { deleteTransaction } from "@/redux/transactionsSlice";
import transactionService from "@/services/transactions/transaction.service";
import { RootState } from "@/redux/store";
import { BudgetType } from "@/types";
import { updateMontantActuel } from "@/redux/budgetSlice";

interface TransactionProps {
    selectedTransactions:any;
    setIsPopoverOpen:(data:boolean) => void; 
}
const DeleteTransactions = ({selectedTransactions,setIsPopoverOpen}:TransactionProps)=> {
    const dispatch = useDispatch();
    const budgets = useSelector((state: RootState) => state.budgets.budgets);    
        
    const [isModalOpen, setIsModalOpen] = useState(false);
    const id_transaction = selectedTransactions.id_transaction;
    const type_transaction = selectedTransactions.type_transaction;
    
    const handleDelete = ()=>{
        const selectedBudget = budgets.find((budget:BudgetType) => budget.nom_budget === selectedTransactions.nom_budget);
        const oldAmount = selectedBudget.montant_actuel;
        
        if (type_transaction === "depense") {
            const newAmount = oldAmount + selectedTransactions.montant;
            dispatch(updateMontantActuel({
                id_budget: selectedBudget.id_budget,
                montant_actuel: newAmount
            }));
        } else {
            const newAmount = oldAmount - selectedTransactions.montant;
            dispatch(updateMontantActuel({
                id_budget: selectedBudget.id_budget,
                montant_actuel: newAmount
            }));
        }
        
        dispatch(deleteTransaction({id_transaction,type_transaction}));
        transactionService.deleteTransaction(id_transaction,type_transaction).then(()=>{})
        setIsModalOpen(false);
        setIsPopoverOpen(false);     
        
    }    
    const handleReset = ()=>{
        setIsModalOpen(false);
        setIsPopoverOpen(false);     
    }
    return (
        <Dialog  open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <div className="cursor-pointer text-destructive">
                    Supprimer
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="mb-3 text-destructive">Supprimer {selectedTransactions.libelle}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <p className="text-muted-foreground">
                    Tu es sûr de vouloir supprimer {selectedTransactions.libelle} ? 
                    Cette action supprimera la transaction séléctionnée
                </p>
                <DialogFooter>
                    <Button 
                        variant="destructive" 
                        type="button"
                        onClick={handleDelete}
                    >
                        Supprimer
                    </Button>
                    <Button 
                        variant="secondary"
                        type="button"
                        onClick={handleReset}
                    >
                        Annuler
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        
    )
}
export default DeleteTransactions;