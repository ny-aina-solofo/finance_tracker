import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBudgets } from "../../redux/fetchBudgets";
import { BudgetType } from "@/types";
import { RootState } from "@/redux/store";
import BudgetCard from "./BudgetCard";
import AddBudgetModal from "../Modals/Budget/AddBudgetModal";

const Budget =()=>{
    const dispatch = useDispatch();
    const { budgets, status, error } = useSelector((state: RootState) => state.budgets);
    let content;

    useEffect(() => {
        dispatch(fetchBudgets() as any);
    }, [dispatch]); 

    if (status === 'loading') {
        content = <p>Loading budgets...</p>;
    } else if (status === 'received') {
        if (Array.isArray(budgets) && budgets.length > 0) {
            content = (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {budgets.length > 0 ? (
                        budgets.map((item: BudgetType) => <BudgetCard key={item.id_budget} budgets={item} />)
                    ) : (
                        <p className="text-preset-4 text-start text-grey-300">
                            Aucun budget à afficher. 
                            Cliquez sur <strong>+ Ajouter</strong> pour en ajouter une.
                        </p>
                    )}
                </div>
            );
        } else {
            content = <p>No budgets found.</p>;
        }
    } else if (status === 'rejected') {
        content = <p>Error: {error}</p>;
    }
    return(
        <main className="container flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-preset-1 text-gray-900">Budgets</h1>                
                <AddBudgetModal/>   
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
export default Budget;