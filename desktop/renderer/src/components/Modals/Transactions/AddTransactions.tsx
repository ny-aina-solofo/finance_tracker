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
  DialogTrigger
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch,useSelector } from "react-redux"
import { RootState } from "@/redux/store";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, PlusIcon } from "lucide-react"
import { cn } from '@/lib/utils'
import { format, formatISO } from 'date-fns'
import { addTransaction } from "@/redux/transactionsSlice";
import { BudgetType } from "@/types";
import transactionService from "@/services/transactions/transaction.service";
import { updateMontantActuel } from "@/redux/budgetSlice";

const AddTransaction = ()=> {
    const dispatch = useDispatch();
    const budgets = useSelector((state: RootState) => state.budgets.budgets);    
    
    const [libelle,setLibelle]= React.useState<string>('')
    const [montant,setMontant]= React.useState<string>('')
    const [budgetId,setBudgetId]=React.useState<string>('')
    const [typeTransactions,setTypeTransactions]= React.useState<string>('')
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const [libelleError, setLibelleError] = useState<string | null>(null);
    const [montantError, setMontantError] = useState<string | null>(null);

    const handleAddTransaction = (event:React.FormEvent)=>{
        event.preventDefault(); 
        let isValid = true;
        let montant_to_int = parseInt(montant);
        let formattedDate = date ? format(date, 'yyyy-MM-dd') : undefined;
        
        // Validate Nom
        if (!libelle.trim()) {
            setLibelleError('Le nom du budget est obligatoire.');
            isValid = false;
        } else {
            setLibelleError(null);
        }

        // Validate Montant
        if (!montant.trim()) {
            setMontantError('Le montant est obligatoire.');
            isValid = false;
        } else if (isNaN(montant_to_int)) {
            setMontantError('Le montant doit être un nombre valide.');
            isValid = false;
        }
        else if (montant_to_int <= 0) {
            setMontantError('Le montant doit être supérieur à zéro.');
            isValid = false;
        }
         else {
            setMontantError(null);
        }
        
        if (isValid) {
            // console.log(libelle,montant_to_int,formattedDate,nom_budget,id_budget,typeTransactions);
            const selectedBudget = budgets.find((budget:BudgetType) => budget.id_budget === parseInt(budgetId));
            const nom_budget = selectedBudget ? selectedBudget.nom_budget : 'Inconnu';
            
            const oldAmount = selectedBudget.montant_actuel;
            
            if (typeTransactions === "depense") {
                const newAmount = oldAmount - montant_to_int;
                dispatch(updateMontantActuel({
                    id_budget: parseInt(budgetId),
                    montant_actuel: newAmount
                }));
            } else {
                const newAmount = oldAmount + montant_to_int;
                dispatch(updateMontantActuel({
                    id_budget: parseInt(budgetId),
                    montant_actuel: newAmount
                }));
            }
            dispatch(addTransaction({
                libelle: libelle, montant: montant_to_int, date_creation: formattedDate,
                nom_budget: nom_budget,type_transaction:typeTransactions,
                id_budget:parseInt(budgetId)
            }));
            transactionService.addTransaction(libelle,montant_to_int,formattedDate,parseInt(budgetId),typeTransactions).then(()=>{})    

            setLibelle('');
            setMontant('');
            setDate(undefined);
            setBudgetId('');
            setTypeTransactions('');
            setLibelleError(null);
            setMontantError(null);
            setIsModalOpen(false);     
        }
    }    
    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setIsCalendarOpen(false);
    };

    const handleReset = ()=>{
        setLibelle('');
        setMontant('');
        setDate(undefined);    
        setBudgetId('');
        setTypeTransactions('');
        setLibelleError(null);
        setMontantError(null);
        setIsModalOpen(false); 
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button size="lg"><PlusIcon/> Ajouter</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="mb-3">Ajouter une transaction</DialogTitle>
                    <DialogDescription className="mb-3">
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddTransaction}>
                    <div className="grid gap-4">
                        <div className="grid gap-3 mb-3">
                            <Label htmlFor="name-1">Nom</Label>
                            <Input 
                                id="nom_budget" name="name" placeholder="e.g Vacances" 
                                value={libelle} 
                                onChange={(e) => {
                                    setLibelle(e.target.value);
                                    setLibelleError(null); // Clear error on change
                                }}
                                className={libelleError ? 'border-red-500' : ''}
                            />
                            {libelleError && (
                                <p className="text-red-500 text-sm mt-1">{libelleError}</p>
                            )}
                        </div>
                        <div className="grid gap-3 mb-3">
                            <Label htmlFor="montant">Montant</Label>
                            <Input 
                                id="montant" name="username" placeholder="5000" 
                                value={montant} 
                                onChange={(e) => {
                                    setMontant(e.target.value);
                                    setMontantError(null); // Clear error on change
                                }}
                                className={montantError ? 'border-red-500' : ''}
                            />
                            {montantError && (
                                <p className="text-red-500 text-sm mt-1">{montantError}</p>
                            )}
                        </div>
                        <div className="grid gap-3 mb-3">
                            <Label htmlFor="budget">Budget</Label>
                            <Select 
                                value={budgetId} 
                                onValueChange={setBudgetId}
                            >
                                <SelectTrigger className="w-full text-muted-foreground">
                                    <SelectValue placeholder="sélectionnez le budget correspondant" />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectGroup>
                                    {budgets.map((item:BudgetType) => (
                                        <SelectItem key={item.id_budget} value={item.id_budget.toString()}>
                                            {item.nom_budget}
                                        </SelectItem>    
                                    ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            
                        </div>
                        <div className="grid gap-3 mb-3">
                            <Label htmlFor="date">
                                Date de création
                            </Label>
                            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                        className={cn(
                                            'w-full pl-3 text-left font-normal',
                                            !date ? 'text-muted-foreground' : ''
                                        )}
                                    >
                                        {date ? (
                                            format(date, 'yyyy-MM-dd')
                                        ) : (
                                            <span className="opacity-50">Choisir une date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={handleDateSelect}
                                        disabled={(date: any) =>
                                            date < new Date(new Date().setHours(0, 0, 0, 0))
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid gap-3 mb-3">
                            <Label htmlFor="type">Type de transaction</Label>
                            <Select 
                                value={typeTransactions} 
                                onValueChange={setTypeTransactions}
                            >
                                <SelectTrigger className="w-full text-muted-foreground">
                                    <SelectValue placeholder="sélectionnez le type de transaction" />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectGroup>
                                        <SelectItem value="depense">dépense</SelectItem>
                                        <SelectItem value="revenu">revenu</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            
                        </div>
                    </div>
                    <footer className="mt-4">
                        <Button 
                            className="w-full" 
                            type="submit"
                        >
                            Ajouter
                        </Button>
                        <Button 
                            variant="secondary" className="w-full mt-3"
                            type="button"
                            onClick={handleReset}
                        >
                            Annuler
                        </Button>
                    </footer>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default AddTransaction;