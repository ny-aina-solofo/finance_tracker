import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { BudgetType } from "@/types";
import { Progress } from "@/components/ui/progress"
import transactionService from "@/services/transactions/transaction.service";
import { TransactionsType } from "@/types";

interface BudgetProps {
    budgets: BudgetType;
}

const BudgetDashboard = ({budgets}:BudgetProps) => {
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
    const expenses = budgetTransactions.filter((tr:TransactionsType)=> tr.type_transaction === "depense")
    const income = budgetTransactions.filter((tr:TransactionsType)=> tr.type_transaction === "revenu")
    const incomeAmount = income.map(((tr:TransactionsType)=> tr.montant)) 
    const expenseAmount = expenses.map(((tr:TransactionsType)=> tr.montant)) 
    const tolalIncome = incomeAmount.reduce(
        (accumulator:number, currentValue:number) => accumulator + currentValue,0
    )
    const tolalExpenses = expenseAmount.reduce(
        (accumulator:number, currentValue:number) => accumulator + currentValue,0
    )
    const currentBalance = tolalIncome - tolalExpenses;
    
    return (
        <div>
            <div className="flex items-center justify-between">
                <h4 className="text-preset-4 text-gray-500">Montant Actuelle</h4>
                <p className="text-preset-1">{currentBalance}</p>
            </div>
            <div className="flex flex-col gap-3">
                <Progress
                    className="h-2"
                    max={budgets.montant}
                    value={tolalExpenses}
                    // indicatorColor={getColorHexCode(pot.theme)}
                />
                <div className="flex items-center">
                    <div className="relative flex flex-1 flex-col justify-between pl-5">
                        <p className="text-preset-5 text-grey-500">Depense</p>
                        <p className="text-preset-4 font-bold text-grey-900">
                            {tolalExpenses}
                        </p>
                    </div>
                    <div className="relative flex flex-1 flex-col justify-between pl-5">
                        <p className="text-preset-5 text-grey-500">Revenu</p>
                        <p className="text-preset-4 font-bold text-grey-900">
                            {tolalIncome}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BudgetDashboard;
