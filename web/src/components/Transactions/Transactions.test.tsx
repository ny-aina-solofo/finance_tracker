import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi, describe, afterEach } from "vitest";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { TransactionsType } from "@/types";
import Transactions from "./Transactions";

const transactions= [
    {
        id_transaction:7,libelle:"Intérêts Bancaires",montant:10,date_creation:"2024-06-29T21:00:00.000Z"
        ,date_modification:"2024-06-30T06:00:00.000Z",id_budget:5,type_transaction:"revenu"
    },
    {
        id_transaction:12,libelle:"Livre",montant:20,date_creation:"2024-06-14T21:00:00.000Z",
        date_modification:"2024-06-15T11:00:00.000Z",id_budget:5,type_transaction:"depense"
    }
]

const MockTransactions = () => {
    return (
        <Provider store={store}>
            <Transactions/>
        </Provider>
    );
};

afterEach(cleanup);

describe("Transactions component tests", () => {
    it("display correct Transactions list manage state correctly ",async()=>{
        render(<MockTransactions/>)
        expect(transactions.map((item:TransactionsType) => item.libelle)).toEqual(['Intérêts Bancaires', 'Livre']);    
    });
});