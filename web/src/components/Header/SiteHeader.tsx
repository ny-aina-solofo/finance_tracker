import React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useParams,useLocation } from "react-router"

export function SiteHeader() {
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
        <header className="bg-white flex h-12 shrink-0 items-center gap-2 border-b">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                {/* <SidebarTrigger className="-ml-1" /> */}
                <h1 className="text-base font-medium">{displayPage}</h1>
            </div>
        </header>
    )
}
