"use client"

import React,{ useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface SortingTableProps {
    setSorting:(data:any)=>void; 
    columnFilters:any;
    setColumnFilters:(data:any)=>void;
};

const SortingTable = ({setSorting,columnFilters,setColumnFilters}:SortingTableProps)=> {
            
    return (
        <div className="flex items-center gap-2">
            <label
                htmlFor="primary-sort-select"
                className="text-preset-5 font-normal text-grey-500"
            >
                triez par
            </label>
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
                        setSorting([])
                        setColumnFilters(currentFilters)
                    }
                }}
            >
                <SelectTrigger className="w-44">
                    <SelectValue placeholder="Toutes les transactions" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Toutes les transactions</SelectItem>
                    <SelectItem value="latest">Plus récent</SelectItem>
                    <SelectItem value="oldest">Plus ancien</SelectItem>
                    <SelectItem value="atoz">A à Z</SelectItem>
                    <SelectItem value="ztoa">Z à A</SelectItem>
                    <SelectItem value="revenu">Revenu</SelectItem>
                    <SelectItem value="depense">Depense</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SortingTable;