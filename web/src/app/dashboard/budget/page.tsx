import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BudgetType } from "@/types";
import { RootState } from "@/redux/store";
import { AddBudgetModal, BudgetCard } from "@/components";
import { Input } from "@/components/ui/input";

const BudgetPage =()=>{
    const { budgets, status, error } = useSelector((state: RootState) => state.budgets);
    let content;

    if (status === 'loading') {
        content = <p>Loading budgets...</p>;
    } else if (status === 'received') {
        if (Array.isArray(budgets) && budgets.length > 0) {
            content = (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {budgets.map((item: BudgetType) => <BudgetCard key={item.id_budget} budgets={item} />)}
                </div>
            );
        } else {
            content =  (
                <p className="text-start text-grey-300">
                    Aucun budget à afficher. 
                    Cliquez sur <strong>+ Ajouter</strong> pour en ajouter une.
                </p>
            );
        }
    } else if (status === 'rejected') {
        content = <p>Error: {error}</p>;
    }
    return(
        <main className="container flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div className="max-w-sm">
                    <Input
                        placeholder="Cherchez une transaction"
                        // value={bu}
                        // onChange={(event) =>
                        //     table.getColumn('libelle')?.setFilterValue(event.target.value)
                        // }
                        className="h-10  bg-white"
                    />            
                </div>
                          
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
export default BudgetPage;