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
import { editTransaction } from "@/redux/transactionsSlice";
import { BudgetType, TransactionsType } from "@/types";

interface TransactionProps {
    selectedTransactions:any;
    setIsPopoverOpen:(data:boolean) => void; 
}

const EditTransaction = ({selectedTransactions,setIsPopoverOpen}:TransactionProps)=> {
    const dispatch = useDispatch();

    const id_transaction = selectedTransactions.id_transaction;
    const [libelle,setLibelle]= React.useState<string>(selectedTransactions.libelle)
    const [typeTransactions,setTypeTransactions]= React.useState<string>(selectedTransactions.type_transaction)
    const [date, setDate] = React.useState<Date | undefined>(selectedTransactions.date_creation);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const [libelleError, setLibelleError] = useState<string | null>(null);
    
    const handleEditTransaction = (event:React.FormEvent)=>{
        event.preventDefault(); 
        let isValid = true;
        let formattedDate = date ? format(date, 'yyyy-MM-dd') : undefined;
        

        // Validate Nom
        if (!libelle) {
            setLibelleError('Le nom du budget est obligatoire.');
            isValid = false;
        } else {
            setLibelleError(null);
        }

        
        if (isValid) {
            // console.log(libelle,formattedDate,nom_budget,id_budget,typeTransactions);
            dispatch(editTransaction({
                id_transaction,libelle: libelle, date_creation: formattedDate,type_transaction:typeTransactions
            }));
            transactionService.updateTransaction(
                id_transaction, libelle, formattedDate,typeTransactions
            ).then(()=>{})

            setLibelle(selectedTransactions.libelle);
            setDate(selectedTransactions.date_creation);
            setTypeTransactions(selectedTransactions.type_transaction);
            setLibelleError(null);
            setIsModalOpen(false);
            setIsPopoverOpen(false);     
        }
    }    
    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setIsCalendarOpen(false);
    };

    const handleReset = ()=>{
        setLibelle(selectedTransactions.libelle);
        setDate(selectedTransactions.date_creation);
        setTypeTransactions(selectedTransactions.type_transaction);
        setLibelleError(null);
        setIsModalOpen(false); 
        setIsPopoverOpen(false);
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <div className="cursor-pointer">Modifier</div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="mb-3">Modifiez {selectedTransactions.libelle}</DialogTitle>
                    <DialogDescription className="mb-3">
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditTransaction}>
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
                    </div>
                    <footer className="mt-4">
                        <Button 
                            className="w-full" 
                            type="submit"
                        >
                            Enregistrer
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
export default EditTransaction;