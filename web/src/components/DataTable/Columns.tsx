"use client"

import { ColumnDef } from "@tanstack/react-table"
import React,{useState} from "react"
import { TransactionsType } from "@/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from '@/components/ui/popover'
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import EditTransaction from "../Modals/Transactions/EditTransactions";
import DeleteTransactions from "../Modals/Transactions/DeleteTransactions";

export const columns: ColumnDef<TransactionsType>[] = [
    {
        accessorKey: "libelle",
        header: () => (
            <h6 className="text-preset-5 font-normal text-gray-500">
                Motif
            </h6>
        ),
        cell: ({ row }) => {
            const libelle = row.getValue("libelle") as string;     
            return (
              <div className="flex items-center">
                <p className="text-preset-4 ml-2 font-bold capitalize text-grey-900">
                  {libelle}
                </p>
              </div>
            );
        },
    },
    {
        accessorKey: "nom_budget",
        header: () => (
            <h6 className="text-preset-5 font-normal text-gray-500">Bugdet</h6>
          ),
        cell: ({ row }) => {
            const nom_budget = row.original.nom_budget as string ;
            return (
                <p className="text-preset-5 font-normal text-gray-500">{nom_budget}</p>
            );
        },
    },
    {
        accessorKey: "date_creation",
        header: () => (
            <h6 className="text-preset-5 font-normal text-gray-500">
              Transaction Date
            </h6>
        ),
        cell: ({ row }) => {
            const date_creation = new Date(row.original.date_creation);
            let formattedDate = date_creation ? format(date_creation, 'yyyy-MM-dd') : undefined;
            
            return (
                <p className="text-preset-5 font-normal text-gray-500">
                   {formattedDate}
                </p>
            );
        },
    },
    {
        accessorKey: "montant",
        header: () => (
            <h6 className="text-preset-5 text-right font-normal text-gray-500">
              Montant
            </h6>
        ),
        cell: ({ row }) => {
            const montant = row.getValue("montant") as number;
             // Access type_transaction directly from row.original
            const type_transaction = row.original.type_transaction as string;
            return (
            <div
                className={cn("text-preset-4 text-right font-bold text-grey-900", {
                    "text-destructive": type_transaction === "depense",
                    "text-green-500": type_transaction === "revenu",
                })}
            >
                { type_transaction === "revenu" ? "+" : "-"}
                {montant}
            </div>
            );
        },
    },
    {
        accessorKey: "type_transaction",
        header: "", // Empty header because we don't want to display it
        // You can leave cell out or return null if you don't want it rendered
        cell: () => null,
        enableHiding: true, // Allow hiding the column if it's visible by default
        enableSorting: false, // Not sortable by this column directly
        enableColumnFilter: true, // Explicitly enable filter on this column
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const [isPopoverOpen, setIsPopoverOpen] = useState(false);
            const transactions = row.original
            return (
                <div className="text-right">
                    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent asChild>
                            <div className="flex w-[114px] flex-col gap-1 px-5 py-3">
                                <EditTransaction
                                    selectedTransactions={transactions}       
                                    setIsPopoverOpen={setIsPopoverOpen}
                                />
                                <DeleteTransactions
                                    selectedTransactions={transactions}       
                                    setIsPopoverOpen={setIsPopoverOpen}
                                />                                
                            </div>
                        </PopoverContent>
                    </Popover>  
                </div>
            )
        },
    }
]