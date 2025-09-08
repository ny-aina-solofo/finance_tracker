import { useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch,useSelector } from "react-redux";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { fetchBudgets } from "@/redux/fetchBudgets";
import transactionService from "@/services/transactions/transaction.service";
import { setErrorStatus, setLoadingStatus, setTransactions } from "@/redux/transactionsSlice";
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useParams,useLocation } from "react-router"

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
    
    const location = useLocation();
    const pathname = location.pathname;

    // Sépare le chemin en segments et prend le dernier
    // Ex: "/dashboard/transactions" -> ["", "dashboard", "transactions"] -> "transactions"
    // Si le chemin est "/dashboard", on prend "dashboard"
    const pathSegments = pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : 'Acceuil';
    let displayPage;
    if (lastSegment === "dashboard") {
        displayPage = "Acceuil";     
    } else {
        displayPage = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    }
    
    return (
        <SidebarProvider >
            <AppSidebar />
            <SidebarInset >
                <div className="bg-muted relative h-full">
                    <header className="bg-white h-[70px] fixed z-50 top-0 w-full flex items-center justify-between px-6">
                        <div className="flex gap-6 items-center">
                            <SidebarTrigger className="" />
                            <span className="text-2xl">{displayPage.toLocaleUpperCase()}</span>
                        </div>
                    </header>
                    <main className="px-6 pt-[70px] mt-6 overflow-y-auto py-6">
                        <Outlet/>
                    </main>
                </div>
            </SidebarInset>            
        </SidebarProvider>
    )
}