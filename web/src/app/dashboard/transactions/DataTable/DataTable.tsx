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
import { Input } from "../../../../components/ui/input"
import PaginationTable from "./PaginationTable";
import FilterTable from "./FilterTable";
import SortingTable from "./SortingTable";
import * as XLSX from 'xlsx';
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { IconDownload, IconSearch } from "@tabler/icons-react";
import { AddTransaction} from "@/components";
import { TransactionsType } from "@/types";
import { format } from "date-fns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState({
        pageIndex: 0, // initial page index
        pageSize: 10, // initial page size
    });

    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            columnFilters,
            pagination
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination
    })
    
    const exportToExcel = () => {
        try {
            const cleanedData = table.getRowModel().rows.map(row => {
                const originalRow = row.original as TransactionsType;
                return {
                    Motif: originalRow.libelle,
                    Budget: originalRow.nom_budget,
                    Date: format(originalRow.date_creation, 'yyyy-MM-dd'),
                    Montant: originalRow.montant,
                    Type: originalRow.type_transaction,
                };
            });            
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(cleanedData);
            const currentDate = new Date();
            const dateStr = currentDate.toISOString().slice(0, 10);
            const fileName = `transactions_${dateStr}.xlsx`;
            XLSX.utils.book_append_sheet(wb, ws, 'transactions');
            XLSX.writeFile(wb, fileName);
            toast.success('Le téléchargement a été lancé');
        } catch (error) {
            toast.error('Le téléchargement a échoué : '+error);
        }
    }  
    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Cherchez une transaction"
                    value={(table.getColumn('libelle')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn('libelle')?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm h-10 bg-white"
                />
                <div className="flex gap-4">
                    <Button size="lg" variant="outline" onClick={exportToExcel}><IconDownload/> Exporter</Button>    
                    <AddTransaction/>   
                </div>
            </div>
            <div className="rounded-xl bg-white px-5 py-2 md:p-8 lg:py-6">
                <div className="flex items-center mb-6">    
                    <div className="hidden gap-2 lg:flex lg:gap-5">
                        <SortingTable
                            setSorting={setSorting}
                            columnFilters={columnFilters}
                            setColumnFilters={setColumnFilters}
                        />
                        <FilterTable setColumnFilters={setColumnFilters}/>
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
                
                <PaginationTable table={table} />
            </div>    
        </div>
    )
}