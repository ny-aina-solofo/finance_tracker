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
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "../../../../components/ui/input"
import PaginationTable from "./PaginationTable";
import Filter from "./Filter";
import * as XLSX from 'xlsx';
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { IconDownload, IconSearch } from "@tabler/icons-react";
import { AddTransaction} from "@/components";
import { TransactionsType } from "@/types";
import { format } from "date-fns";
import { TransactionChart } from "../TransactionChart";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
    const { status, error } = useSelector((state: RootState) => state.transactions);
    let content;

    if (status === 'loading') {
        content = <p>Loading Transactions...</p>;
    } else if (status === 'received') {
        if (Array.isArray(data) && data.length > 0) {
            content = (
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
                                    Pas de résultats
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table> 
            );
        } else {
            content = (
                <p className="text-start text-sm text-muted-foreground">
                    Aucune Transactions à afficher. 
                    Cliquez sur <strong>+ Ajouter</strong> pour en ajouter une.
                </p>
            );
        }
    } else if (status === 'rejected') {
        content = <p>Error: {error}</p>;
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
                    <Button size="lg" variant="secondary" onClick={exportToExcel}><IconDownload/> Exporter</Button>    
                    <AddTransaction/>   
                </div>
            </div>
            <div className="rounded-xl bg-white px-7 py-2 lg:py-6">
                <div className="flex items-center mb-6">    
                    <div className="hidden gap-2 lg:flex lg:gap-5">
                        <Filter
                            setSorting={setSorting}
                            columnFilters={columnFilters}
                            setColumnFilters={setColumnFilters}
                        />
                    </div>   
                </div>
                {content}
                <PaginationTable table={table} />
            </div>  
            {/* <Accordion type="single" collapsible>
                <AccordionItem value="item-1" >
                    <AccordionTrigger className="bg-stone-200 text-primary shadow-xs hover:bg-stone-300 cursor-pointer mb-5">
                        <span className="ms-5 ">Voir la représentation graphique</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <TransactionChart transactions={data}/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>             */}
        </div>
    )
}