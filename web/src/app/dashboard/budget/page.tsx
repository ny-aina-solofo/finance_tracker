import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BudgetType } from "@/types";
import { RootState } from "@/redux/store";
import { AddBudgetModal} from "@/components";
import BudgetCard from "./BudgetCard";
import { searchBudget } from "@/redux/budgetSlice";
import { Input } from "@/components/ui/input";

const BudgetPage =()=>{
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    
    const searchBudgets = (e: React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        const searchTerm = e.target.value
        setSearchText(searchTerm);
        dispatch(searchBudget(searchTerm));
    }
    
    const { filteredBudgets, status, error } = useSelector((state: RootState) => state.budgets);
    let content;

    if (status === 'loading') {
        content = <p>Loading budgets...</p>;
    } else if (status === 'received') {
        if (Array.isArray(filteredBudgets) && filteredBudgets.length > 0) {
            content = (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredBudgets.map((item: BudgetType) => <BudgetCard key={item.id_budget} budgets={item} />)}
                </div>
            );
        } else {
            content =  (
                <p className="text-start text-sm text-muted-foreground">
                    Aucun budget à afficher. 
                    Cliquez sur <strong>+ Ajouter</strong> pour en ajouter une.
                </p>
            );
        }
    } else if (status === 'rejected') {
        content = <p>Error: {error}</p>;
    }
    return(
        <main className="flex flex-col gap-8">
            <div className="flex gap-4 items-center justify-between">
                <Input
                    className="w-full sm:max-w-sm bg-white h-10"
                    placeholder="rechercher un budget"
                    value={searchText}
                    onChange={searchBudgets}
                    aria-label="rechercher un budget"
                />      
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