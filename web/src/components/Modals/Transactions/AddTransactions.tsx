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
import transactionService from "@/services/transactions/transaction.service";
import { addTransaction } from "@/redux/transactionsSlice";
import { BudgetType } from "@/types";
import budgetService from "@/services/budget/budget.service";
import { fetchTransactions } from "@/redux/fetchTransactions";

interface Props {
    id_budget : number | null;
};

const AddTransaction = ({id_budget}:Props)=> {
    const dispatch = useDispatch();

    const [budgets, setBudgets] = useState<BudgetType[]>([]);

    useEffect(() => {
        budgetService.getBudget().then(response => {
            const data = response?.data || [];
            setBudgets(data);
        }).catch(error => {
            console.error("Erreur lors de la récupération des budgets :", error);
        });
    }, []);
    const budgetsToShow = id_budget ? budgets.filter((b: BudgetType) => b.id_budget === id_budget) : budgets;
    
    const [libelle,setLibelle]= React.useState<string>('')
    const [montant,setMontant]= React.useState<string>('')
    const [budgetId,setBudgetId]=React.useState<string>(budgets.length > 0 ? budgets[0].id_budget.toString() : '')
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
            if (id_budget) {
                const selectedBudget = budgets.find(budget => budget.id_budget === id_budget);
                const nom_budget = selectedBudget ? selectedBudget.nom_budget : 'Inconnu';
                dispatch(addTransaction({
                    libelle: libelle, montant: montant_to_int, date_creation: formattedDate,
                    nom_budget: nom_budget,type_transaction:typeTransactions
                }));
                // transactionService.addTransaction(libelle,montant_to_int,formattedDate,id_budget,typeTransactions).then(()=>{})
                // dispatch(fetchTransactions() as any);
            } else {
                const selectedBudget = budgets.find(budget => budget.id_budget === parseInt(budgetId));
                const nom_budget = selectedBudget ? selectedBudget.nom_budget : 'Inconnu';
                dispatch(addTransaction({
                    libelle: libelle, montant: montant_to_int, date_creation: formattedDate,
                    nom_budget: nom_budget,type_transaction:typeTransactions
                }));
                // transactionService.addTransaction(libelle,montant_to_int,formattedDate,parseInt(budgetId),typeTransactions).then(()=>{})    
            }
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
                            {id_budget ? (
                                <Select>
                                    {budgetsToShow.map((item:BudgetType) => (
                                        <SelectTrigger className="w-full" key={item.id_budget}>
                                            <SelectValue placeholder={`${item.nom_budget}`} />
                                        </SelectTrigger>    
                                    ))}
                                </Select>
                            ) : (
                                <Select 
                                    value={budgetId} 
                                    onValueChange={setBudgetId}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="sélectionnez le budget correspondant" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectGroup>
                                        {budgetsToShow.map((item:BudgetType) => (
                                            <SelectItem key={item.id_budget} value={item.id_budget.toString()}>
                                                {item.nom_budget}
                                            </SelectItem>    
                                        ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                            
                        </div>
                        <div className="grid gap-3 mb-3">
                            <Label htmlFor="date">
                                Date de création
                            </Label>
                            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={'secondary'}
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
                            <Label htmlFor="type">Type transaction</Label>
                            <RadioGroup 
                                value={typeTransactions}
                                onValueChange={setTypeTransactions}
                                defaultValue="depense"
                                className="flex flex-row"
                            >
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="depense" id="r1" />
                                    <Label htmlFor="r1">dépense</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="revenu" id="r2" />
                                    <Label htmlFor="r2">revenu</Label>
                                </div>
                            </RadioGroup>
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
                            variant="outline" className="w-full mt-3"
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