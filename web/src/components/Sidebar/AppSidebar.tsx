import React from "react"
import {
    Sidebar, SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarFooter
} from "@/components/ui/sidebar"
import NavMenu from "../Nav/NavMenu"
import { NavUser } from "../Nav/NavUser"


export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="bg-neutral-950 text-white">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-neutral-950 hover:text-white">
                            <a href="#">
                                <span className="text-base font-semibold">FINANCE</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="bg-neutral-950 text-white">
                <NavMenu/>                
            </SidebarContent>
            <SidebarFooter className="bg-neutral-950 text-white">
                <NavUser/>        
            </SidebarFooter>
        </Sidebar>
    )
}