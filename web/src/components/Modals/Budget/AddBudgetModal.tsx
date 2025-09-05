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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch,useSelector } from "react-redux"
import { addBudget } from '@/redux/budgetSlice';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, PlusIcon } from "lucide-react"
import { cn,themes } from '@/lib/utils'
import { format, formatISO } from 'date-fns'
import budgetService from "@/services/budget/budget.service";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { RootState } from "@/redux/store";
import { BudgetType } from "@/types";


const AddBudgetModal = ()=> {
    const dispatch = useDispatch();
    const { filteredBudgets, status, error } = useSelector((state: RootState) => state.budgets);
    const [budgetName,setBudgetName]= React.useState<string>('');
    const [montant,setMontant]= React.useState<string>('');
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [theme, setTheme] = React.useState<string>('');
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const [budgetNameError, setBudgetNameError] = useState<string | null>(null);
    const [montantError, setMontantError] = useState<string | null>(null);
    const [dateError, setDateError] = useState<string | null>(null);
    const [themeError, setThemeError] = useState<string | null>(null);
    
    const usedThemes = filteredBudgets.map((b:BudgetType)=>b.themes)

    const handleAddBudget = (event:React.FormEvent)=>{
        event.preventDefault(); 
        let isValid = true;
        let montant_to_int = parseInt(montant);
        let formattedDate = date ? format(date, 'yyyy-MM-dd') : undefined;

        // Validate Nom (Budget Name)
        if (!budgetName.trim()) {
            setBudgetNameError('Le nom du budget est obligatoire.');
            isValid = false;
        } else {
            setBudgetNameError(null);
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
        
        if(date === undefined){
            setDateError("La date est obligatoire")
        }else{
            setDateError(null)
        }

        if(theme === ""){
            setThemeError("Le theme est obligatoire")
        }else{
            setThemeError(null)
        }

        if (isValid) {
            // console.log(budgetName, montant, formattedDate);
            dispatch(addBudget({
                nom_budget: budgetName,
                montant: montant_to_int,
                date_creation: formattedDate || undefined,
                theme
            }));
            budgetService.addBudget(budgetName,montant_to_int,formattedDate,theme).then(()=>{})
            setBudgetName('');
            setMontant('');
            setDate(undefined);
            setBudgetNameError(null);
            setMontantError(null);
            setIsModalOpen(false);    
            setTheme(''); 
            setDateError(null);
            setThemeError(null);
        }
    }    
    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setIsCalendarOpen(false);
    };

    const handleReset = ()=>{
        setBudgetName('');
        setMontant('');
        setDate(undefined)    
        setBudgetNameError(null);
        setMontantError(null);
        setIsModalOpen(false);
        setTheme(''); 
        setDateError(null);
        setThemeError(null);
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button size="lg"><PlusIcon/> Ajouter</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="mb-3">Ajouter un budget à gérer</DialogTitle>
                    <DialogDescription className="mb-3">
                        Ajoutez un nom, un montant, la date de la création de votre budget, 
                        choisir un thème puis enregistrez 
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddBudget}>
                    <div className="grid gap-4">
                        <div className="grid gap-3 mb-3">
                            <Label htmlFor="name-1">Nom</Label>
                            <Input 
                                id="nom_budget" name="name" placeholder="e.g Vacances" 
                                value={budgetName} 
                                onChange={(e) => {
                                    setBudgetName(e.target.value);
                                    setBudgetNameError(null); // Clear error on change
                                }}
                                className={budgetNameError ? 'border-red-500' : ''}
                            />
                            {budgetNameError && (
                                <p className="text-red-500 text-sm">{budgetNameError}</p>
                            )}
                        </div>
                        <div className="grid gap-3 mb-3">
                            <Label htmlFor="username-1">Montant</Label>
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
                                <p className="text-red-500 text-sm">{montantError}</p>
                            )}
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
                                            !date ? 'text-muted-foreground' : '',
                                            dateError ? 'border-red-500' : ''
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
                            {dateError && (
                                <p className="text-red-500 text-sm">{dateError}</p>
                            )}
                        </div>
                        <div className="grid gap-3 mb-3">
                            <Label htmlFor="theme">
                                Theme
                            </Label>
                            <Select value={theme} onValueChange={setTheme}>
                                <SelectTrigger
                                    className={cn(
                                        'w-full cursor-pointer',
                                        themeError ? 'border-red-500' : ''
                                    )}
                                    aria-label="Select a value"
                                >
                                    <SelectValue placeholder="Ajouter un thème" />
                                </SelectTrigger>
                                <SelectContent className="rounded-lg">
                                    {themes.map((th)=>(
                                        <SelectItem 
                                            key={th.label} 
                                            value={th.color} 
                                            className="rounded-lg"
                                            disabled={usedThemes.includes(th.color)}
                                        >
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex items-center">
                                                    <span
                                                        className="mr-2 h-4 w-4 rounded-full"
                                                        style={{backgroundColor:th.color}}
                                                    />
                                                    <p className="">{th.label}</p>
                                                </div>
                                                {usedThemes.includes(th.color) && (
                                                    <p className="ml-4 text-right text-muted-foreground text-sm">
                                                        (déjà utilisé)
                                                    </p>
                                                )}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {themeError && (
                                <p className="text-red-500 text-sm">{themeError}</p>
                            )}
                        </div>
                    </div>
                    <footer className="mt-4">
                        <Button 
                            className="w-full" 
                            type="submit"
                        >
                            Enregistrer
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
export default AddBudgetModal;