"use client"
import React, { useState,useEffect } from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
import { Input } from "../ui/input"
import { BudgetType } from "@/types";
import budgetService from "@/services/budget/budget.service";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [budgets, setBudgets] = useState<BudgetType[]>([]);
    
    useEffect(() => {
        budgetService.getBudget().then(response => {
            const data = response?.data || [];
            setBudgets(data);
        }).catch(error => {
            console.error("Erreur lors de la récupération des budgets :", error);
        });
    }, []);
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
          sorting,
          columnFilters,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
    })
    
  return (
    <div className="mb-10 h-full w-full">
        <div className="rounded-xl bg-white px-5 py-2 md:p-8 lg:py-6">
            <div className="flex items-center py-6">
                <Input
                    placeholder="Cherchez une transaction"
                    value={(table.getColumn('libelle')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn('libelle')?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                 <div className="ml-auto hidden gap-2 lg:flex lg:gap-5">
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
                                const currentFilters = columnFilters.filter(f => f.id !== 'type_transaction');
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
                </div>   
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>    
        </div>
        
    </div>
  )
}