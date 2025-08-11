import { Routes, Route, useNavigate } from "react-router";
import { Toaster } from "sonner";
import LoginPage from "./login/loginPage";
import SignUpPage from "./login/signupPage";
import { Budget, Transactions } from "@/components";

import React from "react";


const RootLayout = () => {
    
    return (
        <>
            <Routes>
                <Route path="/" element= {<LoginPage/>}/>
                <Route path="/signup" element= {<SignUpPage/>}/>
                <Route path="/dashboard" element= {<Transactions/>}/>
            </Routes>
            <Toaster position="bottom-center" richColors/>
        </>
    )
}

export default RootLayout;
