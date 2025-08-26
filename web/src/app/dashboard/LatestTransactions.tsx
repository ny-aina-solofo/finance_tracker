import React, { useState,useEffect } from "react";
import { TransactionsType } from "@/types";
import { Link } from "react-router";
import { IconCaretRight } from "@tabler/icons-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Props {
    transactions : any[];
}

export default function LatestTransactions({ transactions }:Props) {
    let slicedTransactions = transactions.slice(0, 4)
    const getLocaleDate = (date:any) => new Date(date).toLocaleDateString("fr", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
    return (
        <div className="mt-5 min-h-[200px] break-inside-avoid rounded-lg bg-white px-5 py-6 md:p-8">
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <h5 className="text-preset-2 font-bold text-grey-900">
                        Dernières transactions
                    </h5>
                    <Link
                        to='/dashboard/transactions'
                        className="inline-flex items-center gap-3  text-gray-500"
                    >
                        <span className="text-preset-4">voir details</span>
                        {/* <IconCaretRight /> */}
                    </Link>
                </div>
                <div className="mt-5">
                    {transactions.length > 0 ? ( slicedTransactions.map((transaction:TransactionsType) => (
                        
                        <div
                            key={transaction.id_transaction}
                            className="p-2 flex justify-between border-b border-input"
                        >
                            <div className="flex">
                                <h4 className="">
                                    {transaction.libelle}
                                </h4>
                            </div>
                            <div className="flex flex-col text-right">
                                <p
                                    className={cn("text-preset-4 font-bold ", {
                                        "text-destructive": transaction.type_transaction === "depense",
                                        "text-green-500": transaction.type_transaction === "revenu",
                                    })}
                                    
                                >
                                    {transaction.type_transaction === "revenu" ? '+' : '-'}
                                    {transaction.montant}
                                </p>
                                <small className="">
                                    {getLocaleDate(transaction.date_creation)}
                                </small>
                            </div>
                        </div>
                        ))
                    ) : (
                        <p className="text-preset-4 text-grey-300">No Data Provided</p>
                    )}
                </div>
                
            </div>
        </div>
    )
}