const budgetController = require("../controllers/budget_controller");
const db = require("../models/models");
const httpMocks = require('node-mocks-http');

jest.mock("../models/models", () => ({
    budget: {
        findAll: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
        update: jest.fn()
    },
}));

describe('Budget controller',()=>{
    let req, res, next;
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    
    it("get budget with status 200",async()=>{
        const data = [{
            id_budget: 2, nom_budget: 'Vacances', montant: 1500, 
            date_creation: '2024-03-15', date_modification: '2024-03-15 09:30:00.000' 
        }]
        db.budget.findAll.mockReturnValue(data); 
        await budgetController.getBudget(req,res,next); // Exécution du contrôleur 
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(data)).toBe(true);
        expect(res._getData()).toEqual(data);
    });

    // it("insert budget with status 200",async()=>{
    //     req.body = {libelle: 'Sleep for 1 hour'};
    //     db.budget.aggregate.mockResolvedValue([{ max : 5 }]);
    //     const newTodo = [{
    //         libelle: 'Sleep for 1 hour',done: false,rang: '5'
    //     }]
    //     db.budget.create.mockResolvedValue(newTodo);
    //     await budgetController.insertTodoList(req,res,next);
    //     expect(db.todolist.create).toHaveBeenCalledWith({
    //         libelle: 'Sleep for 1 hour',done: false,rang: '5'
    //     });
    //     expect(res.statusCode).toEqual(200);
    //     expect(res._getData()).toEqual({success:true});
    // });
    // it("delete todolist with status 200",async()=>{
    //     req.params = {id: '67a1beef2b664bd6f5338b15'};
    //     db.todolist.deleteOne.mockResolvedValue({_id: '67a1beef2b664bd6f5338b15'});
    //     await budgetController.deleteTodoList(req,res,next);
    //     expect(db.todolist.deleteOne).toHaveBeenCalledWith({_id: '67a1beef2b664bd6f5338b15'});
    //     expect(res.statusCode).toEqual(200);
    //     expect(res._getData()).toEqual({success:true});
    // });
    // it("update checbox with status 200",async()=>{
    //     req.body = {id: '67a1beef2b664bd6f5338b15',done: true};
    //     db.todolist.updateOne.mockResolvedValue(    
    //         { _id : '67a1beef2b664bd6f5338b15',done: true  }
    //     );
    //     await budgetController.updateCheckbox(req,res,next);
    //     expect(db.todolist.updateOne).toHaveBeenCalledWith(
    //         { _id : '67a1beef2b664bd6f5338b15' },
    //         {  $set: { done: true }}
    //     );
    //     expect(res.statusCode).toEqual(200);
    //     expect(res._getData()).toEqual({success:true});
    // });
    // it("update list order with status 200",async()=>{
    //     req.body = {
    //         updatedList: [
    //             { _id: '67a1beef2b664bd6f5338b15', rang: '5' }
    //         ]
    //     };
    //     db.todolist.updateOne.mockResolvedValue(    
    //         { _id : '67a1beef2b664bd6f5338b15',rang : '5'  }
    //     );
    //     await budgetController.updateTodoListOrder(req,res,next);
    //     expect(db.todolist.updateOne).toHaveBeenCalledWith(
    //         { _id : '67a1beef2b664bd6f5338b15' },
    //         {  $set: { rang : '5' }}
    //     );
    //     expect(res.statusCode).toEqual(200);
    //     expect(res._getData()).toEqual({success:true});
    // });
})


