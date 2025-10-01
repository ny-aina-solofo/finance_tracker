import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { DataTable } from "./DataTable/DataTable";
import { columns } from "./DataTable/Columns";

const TransactionPage =()=>{
    const { transactions } = useSelector((state: RootState) => state.transactions);
    
    return(
        <>
            <DataTable columns={columns} data={transactions} />
        </>   
    )
}
export default TransactionPage;