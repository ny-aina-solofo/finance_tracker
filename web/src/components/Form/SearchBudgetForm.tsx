import { resetSearch, searchBudget } from "@/redux/budgetSlice";
import { IconSearch, IconX } from "@tabler/icons-react";
import React,{ useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const SearchBudgetForm = ()=> {
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
    return (
        <form autoComplete="off">
            <div className="flex bg-white items-center justify-between border-none  
                    rounded-lg max-w-4xl h-10      
                "
            >
                <IconSearch className="ms-4"/>                
                <input
                    type="text"
                    className="p-5 text-gray-600 placeholder-gray-600 w-full 
                        rounded outline-none transition-all duration-200
                    "
                    placeholder="rechercher un budget..."
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
            </div>
        </form>
    )
}

export default SearchBudgetForm;