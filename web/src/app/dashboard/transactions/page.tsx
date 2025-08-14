import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TransactionsType } from "@/types";
import { RootState } from "@/redux/store";
import { fetchTransactions } from "@/redux/fetchTransactions";
import { AddTransaction, columns, DataTable } from "@/components";
import { useSearchParams } from "react-router";

const TransactionPage =()=>{
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const id_budget_string = searchParams.get('budget');
    const id_budget = id_budget_string ? parseInt(id_budget_string) : null;
    const { transactions, status, error } = useSelector((state: RootState) => state.transactions);
    let content;

    useEffect(() => {
        dispatch(fetchTransactions() as any);
    }, [dispatch]); 

    if (id_budget) {    
        const budgetTransactions = transactions.filter((tr:TransactionsType)=> tr.id_budget === id_budget);
        
        if (status === 'loading') {
            content = <p>Loading Transactions...</p>;
        } else if (status === 'received') {
            if (Array.isArray(budgetTransactions) && budgetTransactions.length > 0) {
                content = (
                    <DataTable columns={columns} data={budgetTransactions} id_budget={id_budget} />
                );
            } else {
                content = <p>No Transactions found.</p>;
            }
        } else if (status === 'rejected') {
            content = <p>Error: {error}</p>;
        }   
    } else {
        if (status === 'loading') {
            content = <p>Loading Transactions...</p>;
        } else if (status === 'received') {
            if (Array.isArray(transactions) && transactions.length > 0) {
                content = (
                    <DataTable columns={columns} data={transactions} id_budget={id_budget} />
                );
            } else {
                content = <p>No Transactions found.</p>;
            }
        } else if (status === 'rejected') {
            content = <p>Error: {error}</p>;
        }
    }
    return(
        <main className="container flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-preset-1 text-gray-900">Transactions</h1>                
                <AddTransaction id_budget={id_budget}/>   
            </div>
            {content}
        </main>   
    )
}
export default TransactionPage;