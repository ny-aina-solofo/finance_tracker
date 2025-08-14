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
import transactionService from "@/services/transactions/transaction.service";
import { columns, DataTable } from "@/components";
import { TransactionsType } from "@/types";
import { BudgetType } from "@/types";
import { IconEye } from "@tabler/icons-react";

interface BudgetProps {
    budgets: BudgetType;
}

const ViewTransactions = ({budgets}:BudgetProps)=> {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactions, setTransactions] = useState<TransactionsType[]>([]);
                
    useEffect(() => {
        transactionService.getTransaction().then(response => {
            const data = response?.data || [];
            setTransactions(data);
        }).catch(error => {
            console.error("Erreur lors de la récupération des budgets :", error);
        });
    }, []);
    
    const budgetTransactions = transactions.filter((tr:TransactionsType)=> tr.id_budget === budgets.id_budget);
    
    const handleReset = ()=>{
        setIsModalOpen(false); 
    }
    return (
        <Dialog  open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="w-full"><IconEye/> Voir Transactions</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1064px]">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="mb-3">Transactions de {budgets.nom_budget}</DialogTitle>                
                        <DialogDescription className="mb-3"></DialogDescription>
                        <Button 
                            size="lg"
                            type="button"
                            onClick={handleReset}
                        >
                            Fermer
                        </Button>
                    </div>    
                </DialogHeader>
                {/* <DataTable columns={columns} data={budgetTransactions} />             */}
            </DialogContent>
        </Dialog>
        
    )
}
export default ViewTransactions;