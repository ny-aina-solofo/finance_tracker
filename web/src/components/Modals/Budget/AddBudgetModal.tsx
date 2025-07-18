import React, { useState,useEffect } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DatePicker from "./DatePicker"
import { useDispatch } from "react-redux"
import { addBudget } from '@/redux/budgetSlice';


const AddBudgetModal = ()=> {
    const dispatch = useDispatch();
    const [budgetName,setBudgetName]= React.useState<string>('')
    const [montant,setMontant]= React.useState<string>('')

    const handleAddBudget = ()=>{
        // if (!budgetName) return;
        // dispatch(addBudget({
        //     nom_budget: budgetName,
        //     montant: parseInt(montant),
        //     date_creation: value
        // }));
        setBudgetName('');
        setMontant('');
    }    
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button>+ Ajouter</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="mb-3">Ajouter un budget à gérer</DialogTitle>
                        <DialogDescription className="mb-3">
                            Ajoutez un nom, un montant et la date de la création de votre budget, 
                            puis enregistrez 
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3 mb-3">
                            <Label htmlFor="name-1">Nom</Label>
                            <Input 
                                id="nom_budget" name="name" placeholder="e.g Vacances" 
                                value={budgetName} onChange={(e)=>setBudgetName(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3 mb-3">
                            <Label htmlFor="username-1">Montant</Label>
                            <Input 
                                id="montant" name="username" placeholder="5000" 
                                value={montant} onChange={(e)=>setMontant(e.target.value)}   
                            />
                        </div>
                        <div className="grid gap-3 mb-3">
                            <DatePicker/>                                                
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button 
                                className="w-full" 
                                type="submit"
                                onClick={handleAddBudget}
                            >
                                Enregistrer
                            </Button>
                            <Button variant="outline" className="w-full">Annuler</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
export default AddBudgetModal