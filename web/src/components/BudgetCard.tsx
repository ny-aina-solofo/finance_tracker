import React from 'react'
import { useDispatch } from 'react-redux';
import { BudgetType } from "@/types";
import { Progress } from "@/components/ui/progress"

const BudgetCard =({ id_budget,nom_budget,montant,date_creation,date_modification}:BudgetType) => {
    return (
        <div className="flex flex-col gap-8 rounded-[12px] bg-white px-5 py-6">
            <header className="flex items-center justify-between">
                <div className="flex items-center">
                {/* <span
                    className="mr-4 h-4 w-4 rounded-full"
                    style={{ backgroundColor: getColorHexCode(pot.theme) }}
                /> */}
                <h3 className="text-preset-2 text-gray-900">{nom_budget}</h3>
                </div>
                    {/* <Popover>
                    </Popover> */}
            </header>
            <section className="flex h-[114px] flex-col justify-center gap-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-preset-4 text-gray-500">Montant Total</h4>
                    <p className="text-preset-1">{montant}</p>
                </div>
                <div className="flex flex-col gap-3">
                    <Progress value={33} />
                    {/* <Progress
                        className="h-2"
                        maxValue={pot.target}
                        value={pot.total}
                        indicatorColor={getColorHexCode(pot.theme)}
                    /> */}
                    <div className="flex items-center">
                        <div className="relative flex flex-1 flex-col justify-between pl-5">
                            <p className="text-preset-5 text-grey-500">Depense</p>
                            <p className="text-preset-4 font-bold text-grey-900">
                                {montant}
                            </p>
                        </div>
                        <div className="relative flex flex-1 flex-col justify-between pl-5">
                            <p className="text-preset-5 text-grey-500">Revenu</p>
                            <p className="text-preset-4 font-bold text-grey-900">
                                {montant}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mb-[14px] flex gap-4">
                {/* <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary" className="flex-1">
                    + Add Money
                    </Button>
                </DialogTrigger>
                <AddMoneyModal pot={pot} />
                </Dialog>

                <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary" className="flex-1">
                    Withdraw
                    </Button>
                </DialogTrigger>
                <WithdrawMoney pot={pot} />
                </Dialog> */}
            </section>
        </div>
    )
}

export default BudgetCard;  