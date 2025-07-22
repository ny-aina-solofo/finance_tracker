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
import { deleteBudget } from '@/redux/budgetSlice';
import budgetService from "@/services/budget/budget.service";
import { RootState } from '@/redux/store';
import { BudgetType } from "@/types";

interface BudgetProps {
    id_budget: number;
    setIsPopoverOpen:(data:boolean) => void; 
}

const DeleteBudgetModal = ({id_budget,setIsPopoverOpen}:BudgetProps)=> {
    const dispatch = useDispatch();

    const budgets = useSelector((state:RootState) => state.budgets.budgets);
    const selectedBudget = budgets.find((budget:BudgetType) => budget.id_budget === id_budget);
    const nom_budget = selectedBudget.nom_budget;

    const [isModalOpen, setIsModalOpen] = useState(false);
     
    const handleDelete = ()=>{
        dispatch(deleteBudget(id_budget));
        budgetService.deleteBudget(id_budget).then(()=>{})
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
                <div
                    className="cursor-pointer text-destructive font-bold py-2"
               >
                    Supprimer
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="mb-3 text-destructive">Supprimer {nom_budget}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <p>
                    Tu es sûr de vouloir supprimer {nom_budget} ? 
                    Cette action supprimera le bugdet séléctionné
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
                        className=""
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
export default DeleteBudgetModal;