import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {Label, Cell, Pie, PieChart } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import EditBudgetModal from '@/components/Modals/Budget/EditBudgetModal';
import DeleteBudgetModal from '@/components/Modals/Budget/DeleteBudgetModal';
import { Button } from "@/components/ui/button";
import { IconDots } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { TransactionsType,BudgetType } from "@/types";
import { RootState } from "@/redux/store";

interface BudgetProps {
    budgets: BudgetType;
}
export const description = "A donut chart with text"

const chartConfig = {
    total: {
        label: "total",
    },
    depense: {
        label: "depense",
    },
    revenu: {
        label: "revenu",
    }
} satisfies ChartConfig

const BudgetCard =({budgets}:BudgetProps) => {
    const navigate = useNavigate();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    
    const transactions = useSelector((state: RootState) => state.transactions.transactions);
    const budgetTransactions = transactions.filter((tr:TransactionsType)=> tr.id_budget === budgets.id_budget);
    const expenses = budgetTransactions.filter((tr:TransactionsType)=> tr.type_transaction === "depense")
    const income = budgetTransactions.filter((tr:TransactionsType)=> tr.type_transaction === "revenu")
    const incomeAmount = income.map(((tr:TransactionsType)=> tr.montant)) 
    const expenseAmount = expenses.map(((tr:TransactionsType)=> tr.montant)) 
    const tolalExpenses = expenseAmount.reduce(
        (accumulator:number, currentValue:number) => accumulator + currentValue,0
    )
    const tolalIncome = incomeAmount.reduce(
        (accumulator:number, currentValue:number) => accumulator + currentValue,0
    )

    const chartData = [
        { budget: "depense", total: tolalExpenses, fill: `${budgets.themes}` },
        { budget: "revenu", total: tolalIncome, fill: "#e5e5e5" },
    ]
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center">
                    <span
                        className="mr-4 h-4 w-4 rounded-full"
                        style={{ backgroundColor: `${budgets.themes}` }}
                    />
                    <CardTitle>{budgets.nom_budget}</CardTitle>
                </div>
                <CardDescription></CardDescription>
                <CardAction>
                    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                        <PopoverTrigger>
                            <IconDots className='h-5 w-5 size-8 cursor-pointer'/>
                        </PopoverTrigger>
                        <PopoverContent asChild>
                            <div className="w-[140px] p-4 flex flex-col gap-4">
                                <EditBudgetModal 
                                    id_budget={budgets.id_budget} 
                                    setIsPopoverOpen={setIsPopoverOpen}
                                />
                                <DeleteBudgetModal    
                                    id_budget={budgets.id_budget} 
                                    setIsPopoverOpen={setIsPopoverOpen}
                                />                            
                            </div>
                        </PopoverContent>
                    </Popover>
                </CardAction>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="total"
                            nameKey="budget"
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
                                            y={(viewBox.cy || 0) - 30}
                                            className="text-sm fill-muted-foreground "
                                        >
                                            reste : 
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold"
                                        >
                                            {budgets.montant_actuel.toLocaleString()}
                                        </tspan>
                                        
                                    </text>
                                    )
                                }
                                }}
                            />
                        </Pie>
                        
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="text-sm">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                        <span
                            className="h-2 w-2 shrink-0 rounded-[2px]"
                            style={{ backgroundColor: budgets.themes }}
                        />
    
                        <p className="text-preset-5">Dépenses : </p>
                        <p className="text-preset-4 font-bold">
                            {tolalExpenses.toFixed(2)}
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span
                            className="h-2 w-2 shrink-0 rounded-[2px] bg-neutral-300"
                        />
    
                        <p className="text-preset-5">Revenu : </p>
                        <p className="text-preset-4 font-bold">
                            {tolalIncome.toFixed(2)}
                        </p>
                    </div>
                    
                </div>
            </CardFooter>
        </Card>
    )
}

export default BudgetCard;  