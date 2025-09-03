"use client"

import React, { useState,useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis,YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"  
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TransactionsType } from "@/types";
import { Link } from "react-router";
import { IconCaretRightFilled } from "@tabler/icons-react";

export const description = "An interactive bar chart"

const chartConfig = {
    depense: {
        label: "Depense",
        color: "#2563eb",
    },
    revenu: {
        label: "Revenu",
        color: "#60a5fa",
    },
} satisfies ChartConfig

interface Props {
    transactions : any[];
}

export function TransactionChart({transactions}:Props) {
    const [timeRange, setTimeRange] = useState("7d");

    const sortedTransactions = [...transactions].sort((a, b) => {
        return new Date(a.date_creation).getTime() - new Date(b.date_creation).getTime();
    });
    // const lastDate = transactions[0].date_creation;
    // console.log(lastDate);
    let dateDescription = "7 derniers jours";
    const filteredData = sortedTransactions.filter((item:TransactionsType) => {
        const date = new Date(item.date_creation)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 7
        
        if (timeRange === "30d") {
            daysToSubtract = 30
            dateDescription = "30 derniers jours";
        } else if (timeRange === "90d") {
            daysToSubtract = 90
            dateDescription = "3 derniers mois"
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        // console.log("item date : "+date, "date de début :"+startDate);
        return date >= startDate
    })
    const chartData = React.useMemo(() => {
        const aggregatedData:any = {};
        // Agrégation des transactions par date
        filteredData.forEach((tr: TransactionsType) => {
            const date = new Date(tr.date_creation).toISOString().split('T')[0];
            if (!aggregatedData[date]) {
                aggregatedData[date] = { date_creation: date, depense: 0, revenu: 0 };
            }   
            if (tr.type_transaction === "depense") {
                aggregatedData[date].depense += tr.montant;
            } else if (tr.type_transaction === "revenu") {
                aggregatedData[date].revenu += tr.montant;
            }
        });
        // Conversion de l'objet en tableau pour Recharts
        const formattedData = Object.values(aggregatedData);
        // Tri par date pour un affichage chronologique
        formattedData.sort((a:any, b:any) => new Date(a.date_creation).getTime() - new Date(b.date_creation).getTime());
        return formattedData;
    }, [filteredData]);

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>
                    <span  className="text-preset-2 font-bold text-grey-900">Transactions</span>
                </CardTitle>
                <CardDescription className="">
                    <span>Transactions des {dateDescription}</span>
                </CardDescription>
                <CardAction>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className=""
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="7d" className="rounded-lg">
                                7 derniers jours
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                30 derniers jours
                            </SelectItem>
                            <SelectItem value="90d" className="rounded-lg">
                                3 derniers mois
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
                {/* <CardAction>
                    <Link
                        to='/dashboard/transactions'
                        className="inline-flex items-center gap-3  text-gray-500"
                    >
                        <span className="text-preset-4">voir details</span>
                        <IconCaretRightFilled />
                    </Link>
                </CardAction> */}
            </CardHeader>
            <CardContent className="">
                <ChartContainer
                    config={chartConfig}
                    className="mt-5 bg-white aspect-auto h-[250px] w-full"
                >
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date_creation"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("fr", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value:any) => `${value.toLocaleString("fr-FR")}`}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                labelFormatter={(value) => {
                                    return new Date(value).toLocaleDateString("fr", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })
                                }}
                                indicator="dot"
                                />
                            }
                        />
                        <Bar dataKey="depense" fill="var(--color-depense)" radius={4} />
                        <Bar dataKey="revenu" fill="var(--color-revenu)" radius={4} />
                    </BarChart>
                </ChartContainer>      
            </CardContent>
        </Card>
        
    )
}
