const budgetController = require("../controllers/budget_controller");
const db = require("../models/models");
const httpMocks = require('node-mocks-http');
const axios = require('axios');

jest.mock('axios');
jest.mock("../models/models", () => ({
    budget: {
        findAll: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
        update: jest.fn()
    },
    depense: {
        destroy: jest.fn(),
    },
    revenu: {
        destroy: jest.fn(),
    }
}));

describe('Budget controller',()=>{
    let req, res, next;
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    
    it("get budget with status 200",async()=>{
        req.id_user = 2;
        const data = [{
            id_budget: 2, nom_budget: 'Vacances', montant_initial: 1500, 
            date_creation: '2024-03-15', date_modification: '2024-03-15 09:30:00.000',
            id_utilisateur: '3', montant_initial: 300
        }]
        db.budget.findAll.mockReturnValue(data); 
        await budgetController.getBudget(req,res,next); // Exécution du contrôleur 
        expect(db.budget.findAll).toHaveBeenCalledWith({where: { id_utilisateur: 2 } });
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(data)).toBe(true);
        expect(res._getData()).toEqual(data);
    });

    it("insert budget with status 200",async()=>{
        req.id_user = 2;
        req.body = {nom_budget: 'Vacances', montant: 1500, date_creation: '2024-03-15'};
        const data = [{nom_budget: 'Vacances', montant: 1500, date_creation: '2024-03-15'}];
        axios.get.mockResolvedValue({ status: 200 });
        db.budget.create.mockResolvedValue(data);
        await budgetController.addBudget(req,res,next);
        
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('user-service-api/validate/2'));
        expect(db.budget.create).toHaveBeenCalledWith({
            nom_budget: 'Vacances', montant_initial: 1500, date_creation: '2024-03-15',montant_actuel:1500
        });
        expect(res.statusCode).toEqual(200);
    });

    it("delete budget with status 200",async()=>{
        req.params = {id_budget:44}
        req.id_user = 2;

        db.depense.destroy.mockResolvedValue({id_budget:44});
        db.revenu.destroy.mockResolvedValue({id_budget:44});
        db.budget.destroy.mockResolvedValue({id_budget:44});
        await budgetController.deleteBudget(req,res,next);
        expect(db.depense.destroy).toHaveBeenCalledWith({ 
            where: { id_budget: 44 } 
        });
        expect(db.revenu.destroy).toHaveBeenCalledWith({ 
            where: { id_budget: 44 } 
        });
        expect(db.budget.destroy).toHaveBeenCalledWith({ 
            where: { id_budget: 44,id_utilisateur:2 } 
        });
        expect(res.statusCode).toEqual(200);
        expect(res._getData()).toEqual({success:true});
    });

    it("update budget with status 200",async()=>{
        req.params = {id_budget:44}
        req.id_user = 2;
        req.body = {nom_budget: 'Vacances', montant: 1500, date_creation: '2024-03-15'};
        const data = [{id_budget:44,nom_budget: 'Vacances', montant: 1500, date_creation: '2024-03-15'}];
        db.budget.update.mockResolvedValue(data);
        await budgetController.updateBudget(req,res,next);
        expect(db.budget.update).toHaveBeenCalledWith(
            { 
                nom_budget: 'Vacances', date_creation: '2024-03-15'
            },
            { 
                where: { id_budget: 44 , id_utilisateur:2 } 
            }
        );
        expect(res.statusCode).toEqual(200);
        expect(res._getData()).toEqual({success:true});
    });
    
})


