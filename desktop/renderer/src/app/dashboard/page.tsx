import React, { useState,useEffect } from "react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"  
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { TransactionsType } from "@/types";
import { BudgetChart } from "./BudgetChart";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router";
import { IconCaretRightFilled, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge"
  
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

    const getVariationMessage = (percent: number, type: "revenu" | "depense") => {
        if (percent > 0) {
            return {
                message: `augmentation par rapport au mois dernier`,
                icon: <IconTrendingUp className="size-4" />,
                advice : type === "depense" ? "Surveillez vos dépenses" : "Bonne nouvelle, vos revenus progressent !"
            };
        } else if (percent < 0) {
            return {
                message: `baisse par rapport au mois dernier`,
                icon: <IconTrendingDown className="size-4" />,
                advice : type === "depense" ? "Bonne nouvelle ! Vos dépenses sont en baisse" : "Surveillez vos dépenses"
            };
        } else {
            return {
                message: `aucun changement`,
                icon: null,
                advice : `Rien à signaler`
            };
        }
    };
    const lastMonthData = monthlyWithDiff[monthlyWithDiff.length - 1];
    const expenseMsg = getVariationMessage(lastMonthData?.expensePct || 0, "depense");
    const incomeMsg = getVariationMessage(lastMonthData?.incomePct || 0, "revenu");

    return (
        <main className="flex flex-col gap-8">
            <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Total des dépenses</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {tolalExpenses.toFixed(2)}
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline">
                                {expenseMsg.icon}
                                {monthlyWithDiff[monthlyWithDiff.length - 1]?.expensePct > 0 ? "+" : ""}
                                {monthlyWithDiff[monthlyWithDiff.length - 1]?.expensePct.toFixed(2) || 0}% 
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            {expenseMsg.message} {expenseMsg.icon}
                        </div>
                        <div className="text-muted-foreground">
                            {expenseMsg.advice}
                        </div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Total des revenus</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {tolalIncome.toFixed(2)}
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline">
                                {incomeMsg.icon}
                                {monthlyWithDiff[monthlyWithDiff.length - 1]?.incomePct > 0 ? "+" : ""}
                                {monthlyWithDiff[monthlyWithDiff.length - 1]?.incomePct.toFixed(2) || 0}% 
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            {incomeMsg.message} {incomeMsg.icon}
                        </div>
                        <div className="text-muted-foreground">
                            {incomeMsg.advice}
                        </div>
                    </CardFooter>
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

