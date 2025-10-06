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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="hidden lg:flex">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-sidebar hover:text-sidebar-foreground">
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