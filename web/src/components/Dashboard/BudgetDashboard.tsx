import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { BudgetType } from "@/types";
import { Progress } from "@/components/ui/progress"
import { TransactionsType } from "@/types";
import { RootState } from "@/redux/store";

interface BudgetProps {
    budgets: BudgetType;
}

const BudgetDashboard = ({budgets}:BudgetProps) => {
    const transactions = useSelector((state: RootState) => state.transactions.transactions);
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
    const percentage = (tolalExpenses / budgets.montant_initial)*100;

    return (
        <div>
            <div className="flex items-center justify-between">
                <h4 className="text-preset-4 text-gray-500">Montant Actuelle</h4>
                <p className="text-preset-1">{budgets.montant_actuel}</p>
            </div>
            <div className="flex flex-col gap-3">
                <Progress
                    className="h-2 mt-3"
                    value={percentage}
                    // indicatorColor={getColorHexCode(pot.theme)}
                />
                <div className="flex justify-between">
                    <p className="text-preset-5 text-grey-500">
                        {percentage.toFixed(2)}%
                    </p>
                    <p className="text-preset-5 text-grey-500">{`${tolalExpenses}/${budgets.montant_initial}`}</p>
                </div>
                {/* <div className="flex items-center mt-4 mb-4">
                    <div className="relative flex flex-1 flex-col justify-between pl-5">
                        <span className="absolute bottom-0 left-0 top-0 h-full w-1 rounded-lg bg-destructive" />
                        <p className="text-preset-5 text-grey-500">Depense Total</p>
                        <p className="text-preset-4 font-bold text-grey-900">
                            {tolalExpenses}
                        </p>
                    </div>
                    <div className="relative flex flex-1 flex-col justify-between pl-5">
                        <span className="absolute bottom-0 left-0 top-0 h-full w-1 rounded-lg bg-green-500" />
                        <p className="text-preset-5 text-grey-500">Revenu Total</p>
                        <p className="text-preset-4 font-bold text-grey-900">
                            {tolalIncome}
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default BudgetDashboard;
