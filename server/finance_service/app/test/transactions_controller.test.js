const transactionsController = require("../controllers/transactions_controller");
const db = require("../models/models");
const httpMocks = require('node-mocks-http');
const pool = require('../config/db.config');

jest.mock('../config/db.config', () => ({
  query: jest.fn(),
}));

jest.mock("../models/models", () => ({
    budget: {
        findOne: jest.fn(),
        update: jest.fn()
    },
    depense: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
        update: jest.fn()
    },
    revenu: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
        update: jest.fn()
    }
}));


describe('transactions controller',()=>{
    let req, res, next;
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();

    it("get transactions with status 200",async()=>{
        const data = [
            { id_transaction: 1, libelle: 'Loyer', montant: 500, type_transaction: 'depense' },
            { id_transaction: 2, libelle: 'Salaire', montant: 2000, type_transaction: 'revenu' },      
        ]
        pool.query.mockReturnValue({rows:data}); 
        await transactionsController.getTransaction(req,res,next); 
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(data)).toBe(true);
        expect(res._getData()).toEqual(data);
    });

    it("insert transactions with status 200",async()=>{
        req.body = {
            libelle: 'Vacances', montant: 1500, date_creation: '2024-03-15',
            id_budget: 2, type_transaction: 'depense'
        };
        
        const budget = {
            id_budget: 2, 
            nom_budget: 'Vacances', 
            montant_initial: 2200, // Ajusté pour que la mise à jour donne 700
            montant_actuel: 2200, // Montant actuel, pour éviter l'erreur NaN
            date_creation: '2024-03-15', 
            date_modification: '2024-03-15 09:30:00.000',
            id_utilisateur: '3'
        };
        const newTransactionData = { id_depense: 44, libelle: 'Vacances', montant: 1500 };
        
        db.budget.findOne.mockReturnValue(budget); 
        db.depense.create.mockResolvedValue(newTransactionData);
        db.revenu.create.mockResolvedValue(newTransactionData);
        db.budget.update.mockResolvedValue(budget);

        await transactionsController.addTransaction(req,res,next);
        
        expect(db.budget.findOne).toHaveBeenCalledWith({ 
            where: { id_budget: 2 } 
        });

        if (req.body.type_transaction === 'depense') {
            expect(db.depense.create).toHaveBeenCalledWith({
                libelle: 'Vacances', montant: 1500, date_creation: '2024-03-15',id_budget:2
            });        
            expect(db.budget.update).toHaveBeenCalledWith({ montant_actuel: 700},{ where: { id_budget: 2 }});    
            expect(res.statusCode).toEqual(200);
        } else {
            expect(db.revenu.create).toHaveBeenCalledWith({
                libelle: 'Vacances', montant: 1500, date_creation: '2024-03-15',id_budget:2
            });
            expect(db.budget.update).toHaveBeenCalledWith({ montant_actuel: 3700},{ where: { id_budget: 2 }});
            expect(res.statusCode).toEqual(200);
        }
        
    });
    it("update transactions with status 200",async()=>{
        req.params = {id_transaction:44}
        req.body = {
            libelle: 'Vacances', date_creation: '2024-03-15',type_transaction:'depense'
        };
        const data = [{libelle: 'Vacances', date_creation: '2024-03-15'}];
        
        if (req.body.type_transaction === 'depense') {
            db.depense.update.mockResolvedValue(data);        
            await transactionsController.updateTransaction(req,res,next);
            expect(db.depense.update).toHaveBeenCalledWith(
                {libelle: 'Vacances', date_creation: '2024-03-15'},
                {where: { id_depense: 44 }}
            );
            expect(res.statusCode).toEqual(200);
        } else {
            db.revenu.update.mockResolvedValue(data);
            await transactionsController.updateTransaction(req,res,next);
            expect(db.revenu.update).toHaveBeenCalledWith(
                {libelle: 'Vacances', date_creation: '2024-03-15'},
                {where: { id_revenu: 44 }}
            );
            expect(res.statusCode).toEqual(200);
        }
    });
    it("delete transaction with status 200",async()=>{
        req.params = {id_transaction:44};
        req.query = {type_transaction:'depense'};
        
        const transactionToDelete = { id_depense: 44, montant: 1500, id_budget: 2 };
        const initialBudget = {
            id_budget: 2, 
            montant_actuel: 2200, // Montant de départ ajusté
        };
        db.depense.findOne.mockResolvedValue(transactionToDelete);
        db.revenu.findOne.mockResolvedValue(transactionToDelete);
        db.budget.findOne.mockResolvedValue(initialBudget);
        db.depense.destroy.mockResolvedValue({id_transaction:44});
        db.revenu.destroy.mockResolvedValue({id_transaction:44});
        db.budget.update.mockResolvedValue(initialBudget);
        
        await transactionsController.deleteTransaction(req,res,next);
            
        if (req.query.type_transaction === 'depense') {
            expect(db.depense.findOne).toHaveBeenCalledWith({where: { id_depense: 44 }});
            expect(db.budget.findOne).toHaveBeenCalledWith({where: { id_budget: 2 }});
            expect(db.budget.update).toHaveBeenCalledWith({ montant_actuel: 3700},{ where: { id_budget: 2 }});
            
            expect(db.depense.destroy).toHaveBeenCalledWith({where: { id_depense: 44 }});
            expect(res.statusCode).toEqual(200);
            expect(res._getData()).toEqual({success:true});
        } else {
            expect(db.revenu.findOne).toHaveBeenCalledWith({where: { id_revenu: 44 }});
            expect(db.budget.findOne).toHaveBeenCalledWith({where: { id_budget: 2 }});
            expect(db.budget.update).toHaveBeenCalledWith({ montant_actuel: 700},{ where: { id_budget: 2 }});
            expect(db.transaction.destroy).toHaveBeenCalledWith({where: { id_revenu: 44 }});
            expect(res.statusCode).toEqual(200);
            expect(res._getData()).toEqual({success:true});
        }
        
    });
    
})