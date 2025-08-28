import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { IconArrowsTransferUpDown, IconChartPie, IconChartPie2Filled, IconHome, IconHomeFilled, IconMonkeybar, IconTransactionBitcoin, IconTransfer, IconTransferVertical } from "@tabler/icons-react"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Menu items.
export const menuItems = [
    {
        title: "Acceuil",
        url: "/dashboard",
        icon: IconHomeFilled,
    },
    {
        title: "Bugdet",
        url: "/dashboard/budget",
        icon: IconChartPie2Filled,
    },
    {
        title: "Transactions",
        url: "/dashboard/transactions",
        icon: IconArrowsTransferUpDown,
    }
]
