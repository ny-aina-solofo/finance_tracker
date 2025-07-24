const transactionsController = require("../controllers/transactions_controller");
const db = require("../models/models");
const httpMocks = require('node-mocks-http');
const pool = require('../config/db.config');

jest.mock('../config/db.config', () => ({
  query: jest.fn(),
}));

jest.mock("../models/models", () => ({
    budget: {
        findAll: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
        update: jest.fn()
    },
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
})