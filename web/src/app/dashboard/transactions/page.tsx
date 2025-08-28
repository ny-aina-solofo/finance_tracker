import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TransactionsType } from "@/types";
import { RootState } from "@/redux/store";
import { DataTable } from "./DataTable/DataTable";
import { columns } from "./DataTable/Columns";

const TransactionPage =()=>{
    const { transactions, status, error } = useSelector((state: RootState) => state.transactions);
    let content;

    if (status === 'loading') {
        content = <p>Loading Transactions...</p>;
    } else if (status === 'received') {
        if (Array.isArray(transactions) && transactions.length > 0) {
            content = (
                <DataTable columns={columns} data={transactions} />
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

    return(
        <>
            {content}
        </>   
    )
}
export default TransactionPage;