import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions } from "../../redux/fetchTransactions";
import { TransactionsType } from "@/types";
import { RootState } from "@/redux/store";
import { DataTable } from "../DataTable/DataTable";
import { columns } from "../DataTable/Columns";

const Transactions =()=>{
    const dispatch = useDispatch();
    const { transactions, status, error } = useSelector((state: RootState) => state.transactions);
    let content;

    useEffect(() => {
        dispatch(fetchTransactions() as any);
    }, [dispatch]); 

    if (status === 'loading') {
        content = <p>Loading Transactions...</p>;
    } else if (status === 'received') {
        if (Array.isArray(transactions) && transactions.length > 0) {
            content = (
                <DataTable columns={columns} data={transactions} />
            );
        } else {
            content = <p>No Transactions found.</p>;
        }
    } else if (status === 'rejected') {
        content = <p>Error: {error}</p>;
    }
    return(
        <main className="container flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-preset-1 text-gray-900">Transactions</h1>                
                {/* <AddTransactionsModal/>    */}
            </div>
            {content}
            {/* <Pagination
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
            <PageSizeSelector 
                total={filteredCountries.length} 
                resultsPerPage={resultsPerPage}
                setResultsPerPage={setResultsPerPage}
            />             */}
        </main>   
    )
}
export default Transactions;