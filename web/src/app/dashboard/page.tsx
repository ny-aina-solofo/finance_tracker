import React, { useState,useEffect } from "react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"  
import { LineChart, Line } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { TransactionsType } from "@/types";
import { BudgetChart } from "./BudgetChart";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router";
import { IconCaretRightFilled } from "@tabler/icons-react";

const chartConfig = {
    depense: {
        label: "Depense",
        color: "#0a0a0a",
        // color: "#dc2626",
    },
    revenu: {
        label: "Revenu",
        color: "#0a0a0a",
        // color: "#16a34a",
    },
} satisfies ChartConfig

  
const Dashboard = () => {
    const budgets = useSelector((state: RootState) => state.budgets.budgets);
    const transactions = useSelector((state: RootState) => state.transactions.transactions);
    const sortedTransactions = [...transactions].sort((a, b) => {
        return new Date(a.date_creation).getTime() - new Date(b.date_creation).getTime();
    });
    const slicedTransactions = transactions.slice(0, 4)
  
    const expenses = sortedTransactions.filter((tr:TransactionsType)=> tr.type_transaction === "depense")
    const income = sortedTransactions.filter((tr:TransactionsType)=> tr.type_transaction === "revenu")
    const incomeAmount = income.map(((tr:TransactionsType)=> tr.montant)) 
    const expenseAmount = expenses.map(((tr:TransactionsType)=> tr.montant)) 
    const tolalIncome = incomeAmount.reduce(
        (accumulator:number, currentValue:number) => accumulator + currentValue,0
    )
    const tolalExpenses = expenseAmount.reduce(
        (accumulator:number, currentValue:number) => accumulator + currentValue,0
    )
    const transactionsByMonth = transactions.reduce(
        (acc: Record<string, { income: number; expense: number }>, tr: TransactionsType) => {
            const date = new Date(tr.date_creation);
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`; // ex: "2024-06"
    
            if (!acc[key]) {
                acc[key] = { income: 0, expense: 0 };
            }
        
            if (tr.type_transaction === "revenu") {
                acc[key].income += tr.montant;
            } else if (tr.type_transaction === "depense") {
                acc[key].expense += tr.montant;
            }     
            return acc;
        },
        {}
    );
    
    // Transformer en tableau trié par date
    const monthlyTotalTransactions = Object.entries(transactionsByMonth)
        .map(([month, values]:any) => ({
          month,
          ...values,
        }))
        .sort((a, b) => a.month.localeCompare(b.month));
    // console.log(monthlyExpenses);

    // Ajouter la différence par rapport au mois précédent
    const monthlyWithDiff = monthlyTotalTransactions.map((item, index, arr) => {
        if (index === 0) {
            return {
                ...item,
                incomeDiff: 0,
                expenseDiff: 0,
                incomePct: 0,
                expensePct: 0,
            };
        }
    
        const prev = arr[index - 1];
        const incomeDiff = item.income - prev.income;
        const expenseDiff = item.expense - prev.expense;
    
        const incomePct = prev.income !== 0 ? (incomeDiff / prev.income) * 100 : 0;
        const expensePct = prev.expense !== 0 ? (expenseDiff / prev.expense) * 100 : 0;
    
        return {
            ...item,
            incomeDiff,
            expenseDiff,
            incomePct,
            expensePct,
        };
    });
    const navigate = useNavigate();

    return (
        <main className="flex flex-col gap-8">
            <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                <Card className="gap-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm text-muted-foreground font-normal">Depense Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl">{tolalExpenses}</div>
                        <p className="text-sm mt-2 text-muted-foreground">
                            {monthlyWithDiff[monthlyWithDiff.length - 1]?.expensePct > 0 ? "+" : ""}
                            {monthlyWithDiff[monthlyWithDiff.length - 1]?.expensePct.toFixed(2) || 0}% 
                            par rapport au mois dernier
                        </p>
                        <ChartContainer config={chartConfig} className="h-[80px] w-full mt-8">
                            <LineChart
                                data={monthlyTotalTransactions}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: 10,
                                    bottom: 10,
                                }}
                            >
                                <Line
                                    type="monotone"
                                    strokeWidth={2}
                                    dataKey="expense"
                                    stroke="var(--color-depense)"
                                    // dot={{fill: "var(--color-depense)",}}
                                    activeDot={{r: 6,}}
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="gap-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm text-muted-foreground font-normal">Revenu Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl">{tolalIncome}</div>
                        <p className="text-sm mt-2 text-muted-foreground">
                            {monthlyWithDiff[monthlyWithDiff.length - 1]?.incomePct > 0 ? "+" : ""}
                            {monthlyWithDiff[monthlyWithDiff.length - 1]?.incomePct.toFixed(2) || 0}% 
                            par rapport au mois dernier 
                        </p>
                        <ChartContainer config={chartConfig} className="h-[80px] w-full mt-8">
                            <LineChart
                                data={monthlyTotalTransactions}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: 10,
                                    bottom: 10,
                                }}
                            >
                            <Line
                                type="monotone"
                                strokeWidth={2}
                                dataKey="income"
                                stroke="var(--color-revenu)"
                                // dot={{fill: "var(--color-revenu)",}}
                                activeDot={{r: 6,}}
                            />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </section>

            {/* <BudgetChart budgets={budgets}/> */}
            
            <section className="min-h-[200px] rounded-xl bg-white px-5 py-6">
                <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-bold">
                            Transactions Récents
                        </div>
                        <Link to='/dashboard/transactions'>
                            <div className="flex gap-2 lg:gap-3 text-muted-foreground text-sm">
                                <span>voir détails</span>
                                <IconCaretRightFilled className="size-5"/>    
                            </div>
                        </Link>
                    </div>
                    <div>
                        {transactions.length > 0 ? (
                            slicedTransactions.map((transaction:TransactionsType) => (
                                <div
                                    key={transaction.libelle}
                                    className="py-4 flex justify-between border-b border-input"
                                >
                                    <div>
                                        <p className="font-bold text-sm">{transaction.libelle}</p>
                                        <p className="text-preset-5 text-muted-foreground">
                                            {transaction.nom_budget}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <p
                                            className="text-preset-4 font-bold"
                                            style={{
                                                color: transaction.type_transaction === "depense" ? '#dc2626' : '#16a34a',
                                            }}  
                                        >
                                            { transaction.type_transaction === "revenu" ? "+" : "-"}
                                            {Math.abs(transaction.montant).toFixed(2)}
                                        </p>
                                        <p className="text-preset-5 font-normal text-muted-foreground">
                                            {format(new Date(transaction.date_creation), 'dd MMM yyyy')}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-start inline-flex items-center gap-1 truncate font-normal text-sm text-muted-foreground">
                                Aucune Transactions à afficher. 
                                <span 
                                    className="cursor-pointer font-bold text-grey-900 underline"
                                    onClick={()=>navigate('/dashboard/transactions')}
                                >
                                    Cliquez ici    
                                </span> 
                                pour en ajouter une.
                            </p>
                        )}
                    </div>
                    
                </div>
            </section>
        </main>    
    )
}

export default Dashboard;

