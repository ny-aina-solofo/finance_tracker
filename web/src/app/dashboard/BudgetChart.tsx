"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Link } from "react-router"
import { IconCaretRightFilled } from "@tabler/icons-react"
import { BudgetType } from "@/types"

export const description = "A donut chart with text"

const chartConfig = {
    montant_initial: {
        label: "montant_initial",
    }
} satisfies ChartConfig

interface Props {
    budgets : any[];
}


export function BudgetChart({budgets}:Props) {
    // let slicedBudgets = budgets.slice(0, 4)
    const budgetAmount = budgets.map(((budget:BudgetType)=> budget.montant_initial))
    const totalAmount = budgetAmount.reduce(
        (accumulator:number, currentValue:number) => accumulator + currentValue,0
    )
    const limitAmount = 500000;
    return (
        <div className="min-h-[358px] w-full rounded-lg bg-white px-5 py-6 md:p-8">
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <h5 className="text-preset-2 font-bold text-grey-900">
                        Budgets
                    </h5>
                    <Link
                        to='/dashboard/budget'
                        className="inline-flex items-center gap-3  text-gray-500"
                    >
                        <span className="text-preset-4">voir details</span>
                        <IconCaretRightFilled />
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row">
                    {budgets.length > 0 ? (
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[250px]"
                        >
                            <PieChart>
                                <Pie
                                    data={budgets}
                                    dataKey="montant_initial"
                                    nameKey="nom_budget"
                                    innerRadius={60}
                                    strokeWidth={5}
                                >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalAmount.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    sur {limitAmount.toLocaleString()} 
                                                </tspan>
                                            </text>
                                            )
                                        }
                                    }}
                                />
                                </Pie>
                            </PieChart>
                         </ChartContainer>
                    ) : (
                        <p className="text-preset-4 text-grey-300">No Data Provided.</p>
                    )}
                    <div className="flex flex-col gap-8 lg:w-[98px]">
                        {budgets.map((budget: BudgetType) => (
                            <div
                                key={budget.id_budget}
                                className={`relative flex flex-col items-start pl-4`}
                            >
                            {/* <span
                                className="absolute bottom-0 left-0 top-0 h-full w-1 rounded-full"
                                style={{ backgroundColor: item.fill }}
                            /> */}
            
                                <h4 className="text-preset-4 truncate font-normal text-gray-500">
                                    {budget.nom_budget}
                                </h4>
                                <p className="text-preset-5 font-bold text-gray-900">
                                    {Math.abs(budget.montant_initial)?.toFixed(2) ?? 'N/A'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
