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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import EditTransaction from "../../../../components/Modals/Transactions/EditTransactions";
import DeleteTransactions from "../../../../components/Modals/Transactions/DeleteTransactions";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "../../../../components/ui/input"
import PaginationTable from "./PaginationTable";
import * as XLSX from 'xlsx';
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { IconDownload, IconSearch,IconDots } from "@tabler/icons-react";
import { AddTransaction} from "@/components";
import { TransactionsType } from "@/types";
import { format } from "date-fns";
import { TransactionChart } from "../TransactionChart";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Filter from "./Filter";

interface DataTableProps<TData extends TransactionsType, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData extends TransactionsType, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState({
        pageIndex: 0, // initial page index
        pageSize: 10, // initial page size
    });
    const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
   
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
    
    // valeur pratique : pageIndex courant
    const pageIndex = table.getState().pagination.pageIndex
    const pageSize = table.getState().pagination.pageSize

    // fermer popover si on change de page (utile UX)
    useEffect(() => {
        setOpenPopoverId(null)
    }, [pageIndex, pageSize])

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
                    <TableHeader className="bg-primary" >
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
        <div className="flex flex-col">
            <div className="flex flex-col gap-4 lg:flex-row md:flex-row lg:items-center md:items-center 
                lg:justify-between md:justify-between pb-12"
            >
                <InputGroup className="bg-white w-full sm:max-w-sm h-10">
                    <InputGroupInput 
                        className="ms-2"
                        placeholder="Cherchez une transaction"
                        value={(table.getColumn('libelle')?.getFilterValue() as string) ?? ''}
                        onChange={(event) =>
                            table.getColumn('libelle')?.setFilterValue(event.target.value)
                        }
                    />
                    <InputGroupAddon>
                        <IconSearch />
                    </InputGroupAddon>
                </InputGroup>
                <div className="flex gap-4">
                    <Button size="lg" variant="secondary" onClick={exportToExcel}>
                        <IconDownload/> Exporter
                    </Button>    
                    <AddTransaction/>   
                </div>
            </div>
            
            <div className="flex items-center pb-4">    
                <div className="grid gap-4 grid-cols-2 lg:flex md:flex  ">
                    <Filter
                        setSorting={setSorting}
                        columnFilters={columnFilters}
                        setColumnFilters={setColumnFilters}
                    />
                </div>
            </div>

            <div className="rounded-lg border border-input bg-white overflow-hidden ">
               
                {/* Desktop */}
                <div className="hidden lg:block">
                    {content}
                </div>

                {/* Mobile / Tablet List */}
                <div className="lg:hidden divide-y divide-input px-4 py-2">
                    {table.getPaginationRowModel().rows.map((row)=> {
                        const tr = row.original as TransactionsType;
                        const popoverKey = row.id; // unique et stable pour la ligne
            
                        return (
                            <div
                                key={popoverKey}
                                className="flex items-center justify-between py-3"
                            >
                                {/* Bloc gauche : libellé + budget */}
                                <div className="flex flex-col flex-1">
                                    <p className="font-bold text-sm">{tr.libelle}</p>
                                    <p className="text-xs text-muted-foreground">{tr.nom_budget}</p>
                                </div>

                                {/* Bloc montant + date */}
                                <div className="flex flex-col text-right mr-2 min-w-[90px]">
                                    <p
                                        className="text-sm font-bold"
                                        style={{
                                        color: tr.type_transaction === "depense" ? "#dc2626" : "#16a34a",
                                        }}
                                    >
                                        {tr.type_transaction === "revenu" ? "+" : "-"}
                                        {Math.abs(tr.montant).toFixed(2)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {format(new Date(tr.date_creation), "dd MMM yyyy")}
                                    </p>
                                </div>

                                {/* Actions Popover */}
                                <div className="flex-shrink-0">
                                    <Popover
                                        open={openPopoverId === popoverKey}
                                        onOpenChange={(isOpen) =>
                                            setOpenPopoverId(isOpen ? popoverKey : null)
                                        }
                                    >
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" >
                                                <IconDots className="size-5"/>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[120px] p-4 flex flex-col gap-2">
                                            <EditTransaction
                                                selectedTransactions={tr}
                                                setIsPopoverOpen={() => setOpenPopoverId(null)}
                                            />
                                            <DeleteTransactions
                                                selectedTransactions={tr}
                                                setIsPopoverOpen={() => setOpenPopoverId(null)}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>  
            <PaginationTable table={table} />
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