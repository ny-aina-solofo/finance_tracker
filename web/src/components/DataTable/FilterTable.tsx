"use client"

import React,{ useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import budgetService from "@/services/budget/budget.service";
import { BudgetType } from "@/types";

interface FilterTableProps {
    setColumnFilters:(data:any)=>void;
    id_budget : number | null;
};

const FilterTable = ({setColumnFilters,id_budget}:FilterTableProps)=> {
    const [budgets, setBudgets] = useState<BudgetType[]>([]);
    useEffect(() => {
        budgetService.getBudget().then(response => {
            const data = response?.data || [];
            setBudgets(data);
        }).catch(error => {
            console.error("Erreur lors de la récupération des budgets :", error);
        });
    }, []);

    const budgetsToShow = id_budget ? budgets.filter((b: BudgetType) => b.id_budget === id_budget) : budgets;
    
    return (
        <div className="flex items-center gap-2">
            <label
                htmlFor="secondary-sort-select"
                className="text-preset-5 font-normal text-grey-500"
            >
                Filtrez par budget
            </label>
            {id_budget ? (
                <Select>
                    {budgetsToShow.map((item:BudgetType) => (
                        <SelectTrigger className="w-44" key={item.id_budget}>
                            <SelectValue placeholder={`${item.nom_budget}`} />
                        </SelectTrigger>    
                    ))}
                </Select>
            ) : (
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
                        {budgetsToShow.map((item:BudgetType) => (
                            <SelectItem key={item.id_budget} value={item.nom_budget}>
                                {item.nom_budget}
                            </SelectItem>    
                        ))}
                        
                    </SelectContent>
                </Select>
            )}
            
        </div>
    )
}

export default FilterTable;