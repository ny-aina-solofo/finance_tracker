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
import EditTransaction from "../../../../components/Modals/Transactions/EditTransactions";
import DeleteTransactions from "../../../../components/Modals/Transactions/DeleteTransactions";
import { IconDots } from "@tabler/icons-react";

export const columns: ColumnDef<TransactionsType>[] = [
    {
        accessorKey: "libelle",
        header: () => (
            <h6 className="text-preset-5 ml-2 font-normal text-muted-foreground">
                Motif
            </h6>
        ),
        cell: ({ row }) => {
            const libelle = row.getValue("libelle") as string;     
            return (
              <div className="flex items-center">
                <p className="text-preset-4 ml-2 font-bold capitalize">
                  {libelle}
                </p>
              </div>
            );
        },
    },
    {
        accessorKey: "nom_budget",
        header: () => (
            <h6 className="text-preset-5 font-normal text-muted-foreground">Bugdet</h6>
          ),
        cell: ({ row }) => {
            const nom_budget = row.original.nom_budget as string ;
            return (
                <p className="text-preset-5 font-normal text-muted-foreground">{nom_budget}</p>
            );
        },
    },
    {
        accessorKey: "date_creation",
        header: () => (
            <h6 className="text-preset-5 font-normal text-muted-foreground">
              Date
            </h6>
        ),
        cell: ({ row }) => {
            const date_creation = new Date(row.original.date_creation);
            let formattedDate = date_creation ? format(date_creation, 'yyyy-MM-dd') : undefined;
            
            return (
                <p className="text-preset-5 font-normal text-muted-foreground">
                   {formattedDate}
                </p>
            );
        },
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true;
          
            const date_creation = new Date(row.original.date_creation);
            const month = String(date_creation.getMonth() + 1).padStart(2, "0");
            const year = String(date_creation.getFullYear());
            
            if (filterValue.year && filterValue.year !== "all" && year !== filterValue.year) {
                return false;
            }

            if (filterValue.month && filterValue.month !== "all" && month !== filterValue.month) {
                return false;
            }
            
            return true;
        },
          
    },
    {
        accessorKey: "montant",
        header: () => (
            <h6 className="text-preset-5 text-right font-normal text-muted-foreground">
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
                    "text-green-600": type_transaction === "revenu",
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
                            <Button variant="ghost">
                                <IconDots className='size-5'/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent asChild>
                            <div className="flex w-[114px] flex-col gap-2 px-5 py-3">
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