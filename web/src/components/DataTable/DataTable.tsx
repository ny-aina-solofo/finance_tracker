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
import { Input } from "../ui/input"
import PaginationTable from "./PaginationTable";
import FilterTable from "./FilterTable";
import SortingTable from "./SortingTable";

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
                    <SortingTable
                        setSorting={setSorting}
                        columnFilters={columnFilters}
                        setColumnFilters={setColumnFilters}
                    />
                    <FilterTable
                        setColumnFilters={setColumnFilters}
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