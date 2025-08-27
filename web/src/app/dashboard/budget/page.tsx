import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BudgetType } from "@/types";
import { RootState } from "@/redux/store";
import { AddBudgetModal} from "@/components";
import BudgetCard from "./BudgetCard";
import { resetSearch, searchBudget } from "@/redux/budgetSlice";
import { IconSearch, IconX } from "@tabler/icons-react";
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
    const handleResetSearch =()=>{
        setSearchText("");
        dispatch(resetSearch());
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
                    <form 
                        autoComplete="off" 
                        className="flex bg-white items-center justify-between  
                            rounded-lg max-w-sm h-10 border border-input
                        "
                    >
                        <IconSearch className="ms-4"/>                
                        <Input
                            className=""
                            placeholder="rechercher un budget"
                            value={searchText}
                            onChange={searchBudgets}
                            aria-label="rechercher un budget"
                        />
                        <div className="px-4">
                            {searchText !== "" && (
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                    onClick={handleResetSearch}
                                >
                                    <IconX/>
                                </button>                    
                            )}
                        </div>
                    </form>
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