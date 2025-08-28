"use client"

import React,{ useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux"
import { RootState } from "@/redux/store";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { BudgetType } from "@/types";


interface FilterTableProps {
    setColumnFilters:(data:any)=>void;
};

const FilterTable = ({setColumnFilters}:FilterTableProps)=> {
    const budgets = useSelector((state: RootState) => state.budgets.budgets);
    
    return (
        <div className="flex items-center gap-2">
            <label
                htmlFor="secondary-sort-select"
                className="text-preset-5 font-normal text-grey-500"
            >
                Filtrez par budget
            </label>
            <Select
                name="secondary-sort-select"
                onValueChange={(value) => {
                    if (value === 'all') {
                        setColumnFilters([])
                    } else {
                        setColumnFilters([{ id: 'nom_budget', value }])
                    }
                }}
            >
                <SelectTrigger className="w-44">
                    <SelectValue placeholder="Toutes les budgets" />
                </SelectTrigger>
                <SelectContent>    
                    <SelectItem value="all">Toutes les budgets</SelectItem>
                    {budgets.map((item:BudgetType) => (
                        <SelectItem key={item.id_budget} value={item.nom_budget}>
                            {item.nom_budget}
                        </SelectItem>    
                    ))}
                    
                </SelectContent>
            </Select>
            
        </div>
    )
}

export default FilterTable;