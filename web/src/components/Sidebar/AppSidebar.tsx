import React from "react"
import {
    Sidebar, SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarFooter
} from "@/components/ui/sidebar"
import NavMenu from "./NavMenu"
import { NavUser } from "./NavUser"
import { Link } from "react-router"

export const appName = "finance-tracker";

export function AppSidebar() {
    
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="">
                                <span className="text-base font-semibold cursor-pointer">{appName.toLocaleUpperCase()}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMenu/>                
            </SidebarContent>
            <SidebarFooter>
                <NavUser/>        
            </SidebarFooter>
        </Sidebar>
    )
}