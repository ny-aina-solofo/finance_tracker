import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import TotalSection from "@/app/dashboard/TotalSection";
import LatestTransactions from "@/app/dashboard/LatestTransactions";

const Dashboard = () => {
    const transactions = useSelector((state: RootState) => state.transactions.transactions);
    
    return (
        <main>
            <TotalSection transactions={transactions}/>
            <LatestTransactions transactions={transactions}/>
        </main>    
    )
}

export default Dashboard;

