"use client"

import { ColumnDef } from "@tanstack/react-table"
import React from "react"
import { TransactionsType } from "@/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
]