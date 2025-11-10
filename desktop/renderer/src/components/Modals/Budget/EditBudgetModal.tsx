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
import { editBudget } from '@/redux/budgetSlice';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { cn,themes } from '@/lib/utils'
import { format, formatISO } from 'date-fns'
import budgetService from "@/services/budget/budget.service";
import { RootState } from '@/redux/store';
import { BudgetType } from "@/types";

interface BudgetProps {
    id_budget: number;
    setIsPopoverOpen:(data:boolean) => void; 
}

const EditBudgetModal = ({id_budget,setIsPopoverOpen}:BudgetProps)=> {
    const dispatch = useDispatch();

    const budgets = useSelector((state:RootState) => state.budgets.budgets);
    const selectedBudget = budgets.find((budget:BudgetType) => budget.id_budget === id_budget);
    const usedThemes = selectedBudget.themes

    const [budgetName,setBudgetName]= React.useState<string>(selectedBudget.nom_budget)
    const [date, setDate] = React.useState<Date | undefined>(selectedBudget.date_creation);
    const [theme, setTheme] = React.useState<string>(selectedBudget.themes);
        
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const [budgetNameError, setBudgetNameError] = useState<string | null>(null);
    const [dateError, setDateError] = useState<string | null>(null);
    const [themeError, setThemeError] = useState<string | null>(null);
    
    const handleEditBudget = (event:React.FormEvent)=>{
        event.preventDefault(); 
        let isValid = true;
        let formattedDate = date ? format(date, 'yyyy-MM-dd') : selectedBudget.date_creation;

        // Validate Nom (Budget Name)
        if (!budgetName) {
            setBudgetNameError('Le nom du budget est obligatoire.');
            isValid = false;
        } else {
            setBudgetNameError(null);
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
            dispatch(editBudget({
                id_budget,
                nom_budget: budgetName,
                date_creation: formattedDate,
                theme
            }));
            budgetService.updateBudget(id_budget,budgetName,formattedDate,theme).then(()=>{})
            setBudgetName(selectedBudget.nom_budget);
            setDate(selectedBudget.date_creation);
            setBudgetNameError(null);
            setIsModalOpen(false);
            setIsPopoverOpen(false);     
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
        setBudgetName(selectedBudget.nom_budget);
        setDate(selectedBudget.date_creation)    
        setBudgetNameError(null);
        setIsModalOpen(false);
        setIsPopoverOpen(false);
        setTheme(''); 
        setDateError(null);
        setThemeError(null); 
    }
    return (
        <Dialog  open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <div
                    className="cursor-pointer text-muted-foreground"
               >
                    Modifier
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="mb-3">Modifiez {selectedBudget.nom_budget}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditBudget}>
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
                                <p className="text-red-500 text-sm mt-1">{budgetNameError}</p>
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
export default EditBudgetModal;