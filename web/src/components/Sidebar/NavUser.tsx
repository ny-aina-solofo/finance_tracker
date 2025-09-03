import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {
    IconCreditCard,
    IconDotsVertical,
    IconLogout,
    IconNotification,
    IconUserCircle,
} from "@tabler/icons-react"

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
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import userService from "@/services/users/users.service";
import LogOutModal from "../Modals/User/LogOutModal";

export function NavUser() {
    const { isMobile } = useSidebar()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const users = userService.getCurrentUser()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="flex items-center justify-between w-full gap-4 cursor-pointer p-2
                            rounded-md hover:bg-[var(--color-bg-hover)] hover:text-primary 
                            group-data-[collapsible=icon]:p-0!
                            data-[state=open]:bg-[var(--color-bg-hover)] data-[state=open]:text-primary 
                            "
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                {/* <AvatarFallback>CN</AvatarFallback> */}
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{users.nom}</span>
                            </div>
                            <IconDotsVertical className="ml-auto size-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
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
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
