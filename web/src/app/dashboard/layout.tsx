import { useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch,useSelector } from "react-redux";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { SiteHeader } from "@/app/dashboard/SiteHeader";
import { fetchBudgets } from "@/redux/fetchBudgets";
import transactionService from "@/services/transactions/transaction.service";
import { setErrorStatus, setLoadingStatus, setTransactions } from "@/redux/transactionsSlice";

export default function DashboardLayout() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchBudgets() as any);
        
        transactionService.getTransaction().then(response => {
            dispatch(setLoadingStatus({}));
            const data = response?.data || [];
            dispatch(setTransactions({data:data}));
        }).catch(error => {
            dispatch(setErrorStatus({error}))
        });    
    }, [dispatch]); 

    return (
        <SidebarProvider >
            <AppSidebar />
            <SidebarInset className="bg-Light-Mode-Background">
                <div>
                    <SiteHeader/>                    
                    <main className="p-4">
                        <Outlet/>
                    </main>
                </div>
            </SidebarInset>            
        </SidebarProvider>
    )
}