import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { BudgetType } from "@/types";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from '@/components/ui/popover'
import EditBudgetModal from '../Modals/Budget/EditBudgetModal';
import DeleteBudgetModal from '../Modals/Budget/DeleteBudgetModal';
import BudgetDashboard from "../Dashboard/BudgetDashboard";
import { Button } from "../ui/button";
import { IconEye,IconDots } from "@tabler/icons-react";
import { useNavigate } from "react-router";

interface BudgetProps {
    budgets: BudgetType;
}

const BudgetCard =({budgets}:BudgetProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    
    const viewTransactions = ()=>{
        navigate(`/dashboard/transactions?budget=${budgets.id_budget}`);
    }
    return (
        <div className="flex flex-col gap-8 rounded-[12px] bg-white px-5 py-6">
            <header className="flex items-center justify-between">
                <div className="flex items-center">
                {/* <span
                    className="mr-4 h-4 w-4 rounded-full"
                    style={{ backgroundColor: getColorHexCode(pot.theme) }}
                /> */}
                <h3 className="text-preset-2 text-gray-900">{budgets.nom_budget}</h3>
                </div>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger>
                        <IconDots className='h-5 w-5 cursor-pointer'/>
                    </PopoverTrigger>
                    <PopoverContent asChild>
                        <div className="flex w-full flex-col gap-1 px-5 py-3">
                            <EditBudgetModal 
                                id_budget={budgets.id_budget} 
                                setIsPopoverOpen={setIsPopoverOpen}
                            />
                            <hr />
                            <DeleteBudgetModal    
                                id_budget={budgets.id_budget} 
                                setIsPopoverOpen={setIsPopoverOpen}
                            />                            
                        </div>
                    </PopoverContent>
                </Popover>
            </header>
            <section className="flex h-full flex-col justify-center gap-4">
                <BudgetDashboard budgets={budgets}/>
            </section>
            <section className="">
                <Button size="lg" className="w-full" onClick={viewTransactions}><IconEye/> Voir Transactions</Button>
            </section>
        </div>
    )
}

export default BudgetCard;  