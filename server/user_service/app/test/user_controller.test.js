const userController = require("../controllers/user_controller");
const db = require("../models/models");
const httpMocks = require('node-mocks-http');
const bcrypt = require('bcryptjs');

jest.mock("bcryptjs", () => ({
    hashSync: jest.fn(() => "hashed_password_mocked"),
    compareSync: jest.fn(() => "compare_mocked")
    
}));

jest.mock("../models/models", () => ({
    user: {
        findAll: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
        update: jest.fn()
    },
}));

describe('user controller',()=>{
    let req, res, next;
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();

    it("insert user with status 200",async()=>{
        req.body = {nom: 'Développeur', password_user: 'test123', email: 'test@finance.com'};
        const hash = "hashed_password_mocked"
        const data = [{nom: 'Développeur', password_user: hash, email: 'test@finance.com'}];

        db.user.create.mockResolvedValue(data);
        await userController.signUp(req,res,next);
        expect(db.user.create).toHaveBeenCalledWith({
            nom: 'Développeur', password_user: hash, email: 'test@finance.com'
        });
        expect(res.statusCode).toEqual(200);
    });
    
    // it("get user with status 200",async()=>{
    //     const data = [{
    //         id_user: 2, nom: 'Développeur', password_user: 'test123', 
    //         email: 'test@finance.com' 
    //     }]
    //     db.user.findAll.mockReturnValue(data); 
    //     await userController.getLogin(req,res,next); // Exécution du contrôleur 
    //     expect(res.statusCode).toEqual(200);
    //     expect(Array.isArray(data)).toBe(true);
    //     expect(res._getData()).toEqual(data);
    // });


    // it("delete user with status 200",async()=>{
    //     req.params = {id_user:44}
    //     db.user.destroy.mockResolvedValue({id_user:44});
    //     await userController.deleteuser(req,res,next);
    //     expect(db.user.destroy).toHaveBeenCalledWith({ 
    //         where: { id_user: 44 } 
    //     });
    //     expect(res.statusCode).toEqual(200);
    //     expect(res._getData()).toEqual({success:true});
    // });

    // it("update user with status 200",async()=>{
    //     req.params = {id_user:44}
    //     req.body = {nom: 'Développeur', password_user: 'test123', email: 'test@finance.com'};
    //     const data = [{id_user:44,nom: 'Développeur', password_user: 'test123', email: 'test@finance.com'}];
    //     db.user.update.mockResolvedValue(data);
    //     await userController.updateuser(req,res,next);
    //     expect(db.user.update).toHaveBeenCalledWith(
    //         { 
    //             nom: 'Développeur', password_user: 'test123', email: 'test@finance.com'
    //         },
    //         { 
    //             where: { id_user: 44 } 
    //         }
    //     );
    //     expect(res.statusCode).toEqual(200);
    //     expect(res._getData()).toEqual({success:true});
    // });
    
})


