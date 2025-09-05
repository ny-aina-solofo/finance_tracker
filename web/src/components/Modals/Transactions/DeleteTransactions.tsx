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

interface TransactionProps {
    selectedTransactions:any;
    setIsPopoverOpen:(data:boolean) => void; 
}
const DeleteTransactions = ({selectedTransactions,setIsPopoverOpen}:TransactionProps)=> {
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const libelle = selectedTransactions.libelle;
    const id_transaction = selectedTransactions.id_transaction;
    const type_transaction = selectedTransactions.type_transaction;
    const handleDelete = ()=>{
        console.log(libelle);
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