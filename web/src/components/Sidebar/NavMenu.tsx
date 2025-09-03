import React from "react"
import {
    Sidebar, SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { menuItems } from "@/lib/utils"
import { Link } from "react-router"
import { useLocation } from "react-router"

const NavMenu = () => {    
    const location = useLocation();
    const pathname = location.pathname;
    
    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton 
                                asChild size={`lg`} 
                                className={`${pathname === item.url.toLowerCase() ? 
                                    "bg-primary text-white" : ""}`
                                }
                            >
                                <Link to={item.url}>
                                    <item.icon className="!size-5" />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

export default NavMenu;
