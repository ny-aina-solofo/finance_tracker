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

export const themes = [
    { label:"neutral", color:"#525252"}, 
    { label:"stone", color:"#57534e"}, 
    { label:"zinc", color:"#52525b"}, 
    { label:"slate", color:"#475569"}, 
    { label:"gray", color:"#4b5563"}, 
    { label:"red", color:"#dc2626"}, 
    { label:"orange", color:"#ea580c"}, 
    { label:"amber", color:"#d97706"}, 
    { label:"yellow", color:"#facc15"}, 
    { label:"lime", color:"#65a30d"}, 
    { label:"green", color:"#16a34a"}, 
    { label:"emerald", color:"#059669"}, 
    { label:"teal", color:"#0d9488"}, 
    { label:"cyan", color:"#0891b2"}, 
    { label:"sky", color:"#0284c7"}, 
    { label:"blue", color:"#2563eb"}, 
    { label:"indigo", color:"#4f46e5"}, 
    { label:"violet", color:"#7c3aed"}, 
    { label:"purple", color:"#9333ea"}, 
    { label:"fuchsia", color:"#c026d3"}, 
    { label:"pink", color:"#db2777"}, 
    { label:"rose", color:"#e11d48"}, 
]

export const months = [
    { numero: "01", mois: "Janvier" }, 
    { numero: "02", mois: "Février" }, 
    { numero: "03", mois: "Mars" }, 
    { numero: "04", mois: "Avril" }, 
    { numero: "05", mois: "Mai" }, 
    { numero: "06", mois: "Juin" }, 
    { numero: "07", mois: "Juillet" }, 
    { numero: "08", mois: "Août" }, 
    { numero: "09", mois: "Septembre" }, 
    { numero: "10", mois: "Octobre" }, 
    { numero: "11", mois: "Novembre" }, 
    { numero: "12", mois: "Décembre" }
];

  