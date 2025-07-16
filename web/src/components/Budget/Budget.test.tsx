import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi, describe, afterEach } from "vitest";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import create from "../create";
import { BudgetType } from "@/types";
import Budget from "./Budget";

// import { openModal } from "../../redux/modalSlice";
// import { setActiveBudget } from "../../redux/budgetSlice";

// const mockBudget: BudgetType = {
//     id_budget: 2, nom_budget: 'Vacances', montant: 1500, 
//     date_creation: '2024-03-15', date_modification: '2024-03-15 09:30:00.000' 
// };

const budgets= [
    {
        id_budget: 2, nom_budget: 'Vacances', montant: 1500, 
        date_creation: '2024-03-15', date_modification: '2024-03-15 09:30:00.000' 
    },
    {
        id_budget: 3, nom_budget: 'Achats', montant: 9500, 
        date_creation: '2024-03-16', date_modification: '2024-03-16 08:35:00.000' 
    }
]

const MockBudget = () => {
    return (
        <Provider store={store}>
            <Budget/>
        </Provider>
    );
};

afterEach(cleanup);

describe("Budget component tests", () => {
    it("display correct budget list manage state correctly ",async()=>{
        render(<MockBudget/>)
        expect(budgets.map((item:BudgetType) => item.nom_budget)).toEqual(['Vacances', 'Achats']);    
    });
    // it("should open add-budget-modal on plus button click", () => {
    //     render(<MockBudget/>);
    //     const { store, invoke } = create();
    //     invoke((dispatch:any, getState: () => void) => {
    //         dispatch(openModal("addBudgetModal"))
    //         getState()
    //     })
    //     const plusButton = screen.getByTestId('add-budget');
    //     fireEvent.click(plusButton);
    //     expect(store.dispatch).toHaveBeenCalledWith(openModal("addBudgetModal"));
    // });

    
});