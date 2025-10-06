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
import { BudgetType, TransactionsType } from "@/types";
import { months } from "@/lib/utils";

interface FilterProps {
    setSorting:(data:any)=>void; 
    columnFilters:any;
    setColumnFilters:(data:any)=>void;
};

const FilterMobile = ({setSorting,columnFilters,setColumnFilters}:FilterProps)=> {
    const budgets = useSelector((state: RootState) => state.budgets.budgets);
    const transactions = useSelector((state: RootState) => state.transactions.transactions);

    const years = Array.from(
        new Set(transactions.map((tr: TransactionsType) => new Date(tr.date_creation).getFullYear()))
    ).sort((a:any, b:any) => b - a); // tri décroissant (2025, 2024, 2023…)
      

    return (
        <>
            <Select
                    name="primary-sort-select"
                    onValueChange={(value) => {
                        let desc = false
                        const currentFilters = columnFilters.filter((f:any) => f.id !== 'type_transaction');
                        if (value === 'latest') {
                            setSorting([{ id: 'date_creation', desc: true }]);
                            setColumnFilters(currentFilters);
                        } else if (value === 'oldest') {
                            setSorting([{ id: 'date_creation', desc: false }]);
                            setColumnFilters(currentFilters);
                        } else if (value === 'atoz') {
                            setSorting([{ id: 'libelle', desc: false }]);
                            setColumnFilters(currentFilters);
                        } else if (value === 'ztoa') {
                            setSorting([{ id: 'libelle', desc: true }]);
                            setColumnFilters(currentFilters);
                        } else if (value === 'revenu') {
                            setSorting([]);
                            // Set a filter for 'type_transaction' to 'revenu'
                            setColumnFilters([...currentFilters, { id: 'type_transaction', value: 'revenu' }]); 
                        } else if (value === 'depense') {
                            setSorting([]);
                            setColumnFilters([...currentFilters, { id: 'type_transaction', value: 'depense' }]);
                        } else {
                            setSorting([{ id: 'date_creation', desc: true }]);
                            setColumnFilters(currentFilters)
                        }
                    }}
                >
                    <SelectTrigger className="w-35">
                        <SelectValue placeholder="Tri" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="latest">Plus récent</SelectItem>
                        <SelectItem value="oldest">Plus ancien</SelectItem>
                        <SelectItem value="atoz">A à Z</SelectItem>
                        <SelectItem value="ztoa">Z à A</SelectItem>
                        <SelectItem value="revenu">Revenu</SelectItem>
                        <SelectItem value="depense">Depense</SelectItem>
                    </SelectContent>
                </Select>
            
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
                    <SelectTrigger className="w-35">
                        <SelectValue placeholder="Budget" />
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

                <Select
                    onValueChange={(value) => {
                        setColumnFilters((filters: any) => {
                            const existing = filters.find((f: any) => f.id === "date_creation")?.value || {};
                            return [
                                ...filters.filter((f: any) => f.id !== "date_creation"),
                                { id: "date_creation", value: { ...existing, month: value } },
                            ];
                        });
                    }}
                    name="month-sort-select"
                >
                    <SelectTrigger className="w-35">
                        <SelectValue placeholder="Mois" />
                    </SelectTrigger>
                    <SelectContent>    
                        <SelectItem value="all">Toutes les transactions</SelectItem>
                        {months.map((month)=>(
                            <SelectItem key={month.numero} value={month.numero}>{month.mois}</SelectItem>    
                        ))}
                    </SelectContent>
                </Select>
                
                <Select
                    onValueChange={(value) => {
                        setColumnFilters((filters: any) => {
                            const existing = filters.find((f: any) => f.id === "date_creation")?.value || {};
                            return [
                                ...filters.filter((f: any) => f.id !== "date_creation"),
                                { id: "date_creation", value: { ...existing, year: value } },
                            ];
                        });
                    }}
                    name="month-sort-select"
                >
                    <SelectTrigger className="w-35">
                        <SelectValue placeholder="Année" />
                    </SelectTrigger>
                    <SelectContent>    
                        <SelectItem value="all">Toutes les transactions</SelectItem>
                        {years.map((year:any)=>(
                            <SelectItem key={year} value={String(year)}>{year}</SelectItem>    
                        ))}
                    </SelectContent>
                </Select>
        </>
    )
}

export default FilterMobile;