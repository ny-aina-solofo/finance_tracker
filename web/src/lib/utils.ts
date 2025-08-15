import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { IconHome, IconMonkeybar, IconTransactionBitcoin, IconTransfer } from "@tabler/icons-react"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Menu items.
export const menuItems = [
    {
        title: "Acceuil",
        url: "/dashboard",
        icon: IconHome,
    },
    {
        title: "Bugdet",
        url: "/dashboard/budget",
        icon: IconTransactionBitcoin,
    },
    {
        title: "Transactions",
        url: "/dashboard/transactions",
        icon: IconTransfer,
    }
]
