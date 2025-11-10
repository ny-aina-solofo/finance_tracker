import { useEffect,useState } from "react";
import { Outlet } from "react-router";
import { useDispatch,useSelector } from "react-redux";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { fetchBudgets } from "@/redux/fetchBudgets";
import transactionService from "@/services/transactions/transaction.service";
import { setErrorStatus, setLoadingStatus, setTransactions } from "@/redux/transactionsSlice";
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useParams,useLocation } from "react-router"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    IconDotsVertical,
} from "@tabler/icons-react"
import userService from "@/services/users/users.service";
import LogOutModal from "@/components/Modals/User/LogOutModal";

export default function DashboardLayout() {
    const dispatch = useDispatch();
    // const { isMobile } = useSidebar()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const users = userService.getCurrentUser()
    
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
    const userName = users.nom.split("") 
    
    return (
        <SidebarProvider >
            <AppSidebar />
            <SidebarInset >
                <div className="bg-muted relative h-full">
                    <header 
                        className="bg-white h-[70px] border-b border-input sticky top-0 z-50 flex items-center px-3"
                    >
                        <div className="flex gap-2 items-center">
                            <SidebarTrigger className="" />
                            <span className="text-2xl">{displayPage}</span>
                        </div>
                        <div className="ml-auto pr-2">
                            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen} modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button className="cursor-pointer">
                                        <Avatar className="h-10 w-10 rounded-lg">
                                            {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                            <AvatarFallback>{userName[0]}</AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-10 w-10 rounded-lg">
                                                {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                                <AvatarFallback>{userName[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">{users.nom}</span>
                                            
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {/* <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <IconUserCircle className="!size-5"  />
                                            Account
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator /> */}
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <LogOutModal setIsDropdownOpen={setIsDropdownOpen}/>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        
                    </header>
                    <main className="px-6 pt-6 py-6 overflow-y-auto ">
                        <Outlet/>
                    </main>
                </div>
            </SidebarInset>            
        </SidebarProvider>
    )
}