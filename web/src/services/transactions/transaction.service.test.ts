import { beforeEach, describe, expect, it, vi } from "vitest";
import transactionService from './transaction.service';
import http from '../http_common';
import { Mocked } from 'vitest'; // Importez Mocked

vi.mock('../http_common', () => {
    return {
        default: {
            get: vi.fn(),
            post: vi.fn(),
            delete: vi.fn(),
            put: vi.fn()
        },
    };
});
  
const mockedHttp = http as Mocked<typeof http>;

describe("http service test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("get transaction", async () => {
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
        mockedHttp.get.mockResolvedValue(transactions);
        const data = await transactionService.getTransaction();
        expect(mockedHttp.get).toHaveBeenCalledWith('/get-transaction',{});
        expect(data).toEqual(transactions);
    });

    // it("insert transaction", async () => {
    //     const nom_transaction:string = 'test';
    //     const montant:number = 333;
    //     const date_creation:string | undefined = '2024-03-15';
    //     mockedHttp.post.mockResolvedValue({ data: { success: true } });
    //     await transactionService.addtransaction(nom_transaction,montant,date_creation);
    //     expect(mockedHttp.post).toHaveBeenCalledWith('/add-transaction', { 
    //         nom_transaction:nom_transaction, montant:montant, date_creation:date_creation 
    //     });
    // });

    // it("delete transaction", async () => {
    //     const id_transaction:number = 44
    //     mockedHttp.delete.mockResolvedValue({ data: { success: true } });
    //     await transactionService.deletetransaction(id_transaction);
    //     expect(mockedHttp.delete).toHaveBeenCalledWith(`/delete-transaction/${id_transaction}`);
    // });

    // it("update transaction", async () => {
    //     const id_transaction:number = 44
    //     const nom_transaction:string = 'test';
    //     const montant:number = 333;
    //     const date_creation:string | undefined = '2024-03-15';
    //     mockedHttp.put.mockResolvedValue({ data: { success: true } });
    //     await transactionService.updatetransaction(id_transaction,nom_transaction,montant,date_creation);
    //     expect(mockedHttp.put).toHaveBeenCalledWith(`/update-transaction/${id_transaction}`,{
    //         nom_transaction:nom_transaction, montant:montant, date_creation:date_creation     
    //     });
    // });
});