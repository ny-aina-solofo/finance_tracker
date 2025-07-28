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

    it("insert transaction", async () => {
        const libelle:string = 'test';
        const montant:number = 333;
        const date_creation:string | undefined = '2024-03-15';
        const id_budget:number = 2;
        const type_transaction:string = 'revenu'
        mockedHttp.post.mockResolvedValue({ data: { success: true } });
        await transactionService.addTransaction(libelle,montant,date_creation,id_budget,type_transaction);
        expect(mockedHttp.post).toHaveBeenCalledWith('/add-transaction', { 
            libelle:libelle, montant:montant, date_creation:date_creation, id_budget:id_budget,
            type_transaction:type_transaction 
        });
    });

    it("delete transaction", async () => {
        const id_transaction:number = 44;
        const type_transaction:string = 'revenu';
        mockedHttp.delete.mockResolvedValue({ data: { success: true } });
        await transactionService.deleteTransaction(id_transaction,type_transaction);
        expect(mockedHttp.delete).toHaveBeenCalledWith(`/delete-transaction/${id_transaction}`,{
            params: {
                type_transaction: type_transaction
            }
        });
    });

    it("update transaction", async () => {
        const id_transaction:number = 44
        const libelle:string = 'test';
        const montant:number = 333;
        const date_creation:string | undefined = '2024-03-15';
        const id_budget:number = 2;
        const type_transaction:string = 'revenu'
        mockedHttp.put.mockResolvedValue({ data: { success: true } });
        await transactionService.updateTransaction(
            id_transaction,libelle,montant,date_creation,
            id_budget,type_transaction
        );
        expect(mockedHttp.put).toHaveBeenCalledWith(`/update-transaction/${id_transaction}`,{
            libelle:libelle, montant:montant, date_creation:date_creation,    
            id_budget:id_budget,type_transaction:type_transaction 
        });
    });
});