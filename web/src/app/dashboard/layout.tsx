import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar/AppSidebar"
import { SiteHeader } from "@/components/Header/SiteHeader";

export default function DashboardLayout() {
    return (
        <SidebarProvider >
            <AppSidebar />
            <SidebarInset className="bg-Light-Mode-Background">
                <div>
                    {/* <SiteHeader/>                     */}
                    <main className="p-4">
                        <Outlet/>
                    </main>
                </div>
            </SidebarInset>            
        </SidebarProvider>
    )
}