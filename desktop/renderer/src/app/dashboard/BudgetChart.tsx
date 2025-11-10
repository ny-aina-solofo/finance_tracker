"use client"

import { TrendingUp } from "lucide-react"
import { Cell, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
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
    return (
        <Card className="flex flex-col">
            <CardHeader className="flex justify-between  pb-0">
                <div className="flex flex-col gap-2">
                    <CardTitle className="text-preset-2 font-">Budgets</CardTitle>
                    <CardDescription>Résumé des budgets avec leurs montants actuels</CardDescription>    
                </div>
                <Link
                    to='/dashboard/budget'
                    className="inline-flex items-center gap-3 text-muted-foreground"
                >
                    <span className="text-preset-4">voir détails</span>
                    <IconCaretRightFilled />
                </Link>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={budgets}
                            dataKey="montant_actuel"
                            nameKey="nom_budget"
                            stroke="0"
                        >
                            {budgets.map((budget: BudgetType) => (
                                <Cell key={`cell-${budget.id_budget}`} fill={budget.themes} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="mx-auto text-sm">
                <div className="flex gap-8">
                    {budgets.map((budget: BudgetType) => (
                        <div
                            key={budget.id_budget}
                            className="flex gap-2 items-center"
                        >
                            <span
                                className="h-2 w-2 shrink-0 rounded-[2px]"
                                style={{ backgroundColor: budget.themes }}
                            />
        
                            <h4 className="text-preset-4 truncate font-normal text-muted-foreground">
                                {budget.nom_budget}
                            </h4>
                        </div>
                    ))}
                </div>
            </CardFooter>
        </Card>
    )
}
