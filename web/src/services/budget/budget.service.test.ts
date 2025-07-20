import { beforeEach, describe, expect, it, vi } from "vitest";
import budgetService from './budget.service';
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

    it("get budget", async () => {
        const budget = [{
            id_budget: 2, nom_budget: 'Vacances', montant: 1500, 
            date_creation: '2024-03-15', date_modification: '2024-03-15 09:30:00.000' 
        }];
        mockedHttp.get.mockResolvedValue(budget);
        const data = await budgetService.getBudget();
        expect(mockedHttp.get).toHaveBeenCalledWith('/get-budget',{});
        expect(data).toEqual(budget);
    });

    it("insert budget", async () => {
        const budgetName:string = 'test';
        const montant:number = 333;
        const date_creation:string | undefined = '2024-03-15';
        mockedHttp.post.mockResolvedValue({ data: { success: true } });
        await budgetService.addBudget(budgetName,montant,date_creation);
        expect(mockedHttp.post).toHaveBeenCalledWith('/add-budget', { 
            budgetName:budgetName, montant:montant, date_creation:date_creation 
        });
    });

    // it("delete todo", async () => {
    //     const _id = '67a1beef2b664bd6f5338b15';
    //     mockedHttp.delete.mockResolvedValue({ data: { success: true } });
    //     await budgetService.deleteTodoList(_id);
    //     expect(mockedHttp.delete).toHaveBeenCalledWith(`/delete-todo/${_id}`);
    // });

    // it("update checkbox", async () => {
    //     const _id = '67a1beef2b664bd6f5338b15';
    //     const done = true;
    //     mockedHttp.put.mockResolvedValue({ data: { success: true } });
    //     await budgetService.updateCheckbox(_id,done);
    //     expect(mockedHttp.put).toHaveBeenCalledWith('/update-checkbox',{id : _id ,done : done});
    // });
    // it("update list order", async () => {
    //     const updatedList = [{
    //         _id: '67a1beef2b664bd6f5338b15',
    //         libelle: 'Sleep for 1 hour',
    //         done: false,
    //         rang: '1'            
    //     }];
    //     mockedHttp.put.mockResolvedValue({ data: { success: true } });
    //     await budgetService.updateTodoListOrder(updatedList);
    //     expect(mockedHttp.put).toHaveBeenCalledWith('/update-order',{updatedList : updatedList});
    // });
});