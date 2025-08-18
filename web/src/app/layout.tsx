import { Routes, Route, useNavigate,createBrowserRouter,RouterProvider } from "react-router";
import React from "react";
import DashboardLayout from "./dashboard/layout";
import Dashboard from "./dashboard/page";
import BudgetPage from "./dashboard/budget/page";
import TransactionPage from "./dashboard/transactions/page";
import LoginPage from "./login/loginPage";
import SignUpPage from "./login/signupPage";
import { Toaster } from "sonner";


const router = createBrowserRouter([
    {
        path:"/",
        element: <LoginPage />
    },
    {
        path:"/signup",
        element: <SignUpPage />
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index:true ,
                element: <Dashboard />,
            },
            {
                path: "budget", 
                element: <BudgetPage />,
            },
            {
                path: "transactions",
                element: <TransactionPage />,
            }
        ],
    },
]);

const RootLayout = () => {
    
    return (
        <>
            <RouterProvider router={router} />
            <Toaster richColors/>
        </>
    )
}

export default RootLayout;
