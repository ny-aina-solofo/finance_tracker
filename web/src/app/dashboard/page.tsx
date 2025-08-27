import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { TransactionsType } from "@/types";
import { Link } from "react-router";
import { IconCaretRight } from "@tabler/icons-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Dashboard = () => {
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
    
    let slicedTransactions = transactions.slice(0, 4)
    const getLocaleDate = (date:any) => new Date(date).toLocaleDateString("fr", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
    
    return (
        <main>
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
            <div className="mt-5 min-h-[200px] break-inside-avoid rounded-lg bg-white px-5 py-6 md:p-8">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <h5 className="text-preset-2 font-bold text-grey-900">
                            Dernières transactions
                        </h5>
                        <Link
                            to='/dashboard/transactions'
                            className="inline-flex items-center gap-3  text-gray-500"
                        >
                            <span className="text-preset-4">voir details</span>
                            {/* <IconCaretRight /> */}
                        </Link>
                    </div>
                    <div className="mt-5">
                        {transactions.length > 0 ? ( slicedTransactions.map((transaction:TransactionsType) => (
                            
                            <div
                                key={transaction.id_transaction}
                                className="p-2 flex justify-between border-b border-input"
                            >
                                <div className="flex">
                                    <h4 className="">
                                        {transaction.libelle}
                                    </h4>
                                </div>
                                <div className="flex flex-col text-right">
                                    <p
                                        className={cn("text-preset-4 font-bold ", {
                                            "text-destructive": transaction.type_transaction === "depense",
                                            "text-green-500": transaction.type_transaction === "revenu",
                                        })}
                                        
                                    >
                                        {transaction.type_transaction === "revenu" ? '+' : '-'}
                                        {transaction.montant}
                                    </p>
                                    <small className="">
                                        {getLocaleDate(transaction.date_creation)}
                                    </small>
                                </div>
                            </div>
                            ))
                        ) : (
                            <p className="text-preset-4 text-grey-300">No Data Provided</p>
                        )}
                    </div>        
                </div>
            </div>
        </main>    
    )
}

export default Dashboard;

