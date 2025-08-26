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
import { IconDownload } from "@tabler/icons-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  id_budget:number | null;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    id_budget
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
        const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Créez un classeur
  
        // Créez une feuille Excel à partir de votre table HTML²
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('table-principale'));
      
        // Obtenez la date actuelle
        const currentDate = new Date();
      
        // Générez une chaîne de date au format "AAAA-MM-JJ" (par exemple, "2023-10-12")
        const dateStr = currentDate.toISOString().slice(0, 10);
      
        // Créez le nom du fichier en incluant la date
        const fileName = `transactions_${id_budget}_${dateStr}.xlsx`;
      
        // Ajoutez la feuille au classeur avec le nom que vous avez généré
        XLSX.utils.book_append_sheet(wb, ws, 'transactions');
      
        // Enregistrez le fichier Excel avec le nom généré
        try {
            XLSX.writeFile(wb, fileName);
            toast.success('Le téléchargement a été lancé');
        } catch (error) {
            toast.error('Le téléchargement a échoué');
        }
    }  
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
                        {/* <SortingTable
                            setSorting={setSorting}
                            columnFilters={columnFilters}
                            setColumnFilters={setColumnFilters}
                        /> */}
                        <Button size="lg" variant="secondary" onClick={exportToExcel}><IconDownload/> Exporter</Button>
                        <FilterTable
                            setColumnFilters={setColumnFilters}
                            id_budget={id_budget}
                        />
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