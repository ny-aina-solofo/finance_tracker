import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { TransactionsType } from "@/types";
import { TransactionChart } from "./TransactionChart";
import { BudgetChart } from "./BudgetChart";


const Dashboard = () => {
    const budgets = useSelector((state: RootState) => state.budgets.budgets);
    const transactions = useSelector((state: RootState) => state.transactions.transactions);
    const expenses = transactions.filter((tr:TransactionsType)=> tr.type_transaction === "depense")
    const income = transactions.filter((tr:TransactionsType)=> tr.type_transaction === "revenu")
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
        <main className="flex flex-col gap-8">
            <section className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6">
                <div className="bg-white w-full rounded-lg p-5 md:p-6">
                    <div className="flex flex-col gap-3">
                        <p className="text-preset-4 font-normal">Balance</p>
                        <h4 className="text-preset-1 font-bold">
                            {currentBalance}
                        </h4>
                    </div>
                </div>
                <div className="bg-white w-full rounded-lg p-5 md:p-6">
                    <div className="flex flex-col gap-3">
                        <p className="text-preset-4 font-normal text-grey-500">Depense Total</p>
                        <h4 className="text-preset-1 font-bold text-grey-900">
                        {tolalExpenses}
                        </h4>
                    </div>
                </div>
                <div className="bg-white w-full rounded-lg p-5 md:p-6">
                    <div className="flex flex-col gap-3">
                        <p className="text-preset-4 font-normal text-grey-500">Revenu Total</p>
                        <h4 className="text-preset-1 font-bold text-grey-900">
                            {tolalIncome}
                        </h4>
                    </div>
                </div>
            </section>
            <BudgetChart budgets={budgets}/>
            <TransactionChart transactions={transactions}/>
        </main>    
    )
}

export default Dashboard;

