import { beforeEach, describe, expect, it, vi } from "vitest";
import budgetService from './budget.service';
import http from '../http_common_budget';
import { Mocked } from 'vitest'; // Importez Mocked

vi.mock('../http_common_budget', () => {
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
        const nom_budget:string = 'test';
        const montant:number = 333;
        const date_creation:string | undefined = '2024-03-15';
        mockedHttp.post.mockResolvedValue({ data: { success: true } });
        await budgetService.addBudget(nom_budget,montant,date_creation);
        expect(mockedHttp.post).toHaveBeenCalledWith('/add-budget', { 
            nom_budget:nom_budget, montant:montant, date_creation:date_creation 
        });
    });

    it("delete budget", async () => {
        const id_budget:number = 44
        mockedHttp.delete.mockResolvedValue({ data: { success: true } });
        await budgetService.deleteBudget(id_budget);
        expect(mockedHttp.delete).toHaveBeenCalledWith(`/delete-budget/${id_budget}`);
    });

    it("update budget", async () => {
        const id_budget:number = 44
        const nom_budget:string = 'test';
        const montant:number = 333;
        const date_creation:string | undefined = '2024-03-15';
        mockedHttp.put.mockResolvedValue({ data: { success: true } });
        await budgetService.updateBudget(id_budget,nom_budget,montant,date_creation);
        expect(mockedHttp.put).toHaveBeenCalledWith(`/update-budget/${id_budget}`,{
            nom_budget:nom_budget, montant:montant, date_creation:date_creation     
        });
    });
});