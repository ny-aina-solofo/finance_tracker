import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TransactionsType } from "@/types";
import { RootState } from "@/redux/store";
import { AddTransaction} from "@/components";
import { useSearchParams } from "react-router";
import { DataTable } from "./DataTable/DataTable";
import { columns } from "./DataTable/Columns";

const TransactionPage =()=>{
    const [searchParams] = useSearchParams();
    const id_budget_string = searchParams.get('budget');
    const id_budget = id_budget_string ? parseInt(id_budget_string) : null;
    const { transactions, status, error } = useSelector((state: RootState) => state.transactions);
    let content;

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
                content = (
                    <p className=" text-start text-grey-300">
                        Aucune Transactions à afficher. 
                        Cliquez sur <strong>+ Ajouter</strong> pour en ajouter une.
                    </p>
                );
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
                content = (
                    <p className=" text-start text-grey-300">
                        Aucune Transactions à afficher. 
                        Cliquez sur <strong>+ Ajouter</strong> pour en ajouter une.
                    </p>
                );
            }
        } else if (status === 'rejected') {
            content = <p>Error: {error}</p>;
        }
    }

    return(
        <main className="container flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div></div>
                <div>
                    <AddTransaction id_budget={id_budget}/>   
                </div>
            </div>
            {content}
        </main>   
    )
}
export default TransactionPage;