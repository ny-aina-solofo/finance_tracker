import { beforeEach, describe, expect, it, vi } from "vitest";
import userService from './users.service';
import http from '../http_common_user';
import { Mocked } from 'vitest'; // Importez Mocked

vi.mock('../http_common_user', () => {
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

    it("insert user", async () => {
        const nom:string = 'Développeur';
        const password_user:string = 'test123';
        const email:string = 'test@finance.com';
        mockedHttp.post.mockResolvedValue({ data: { success: true } });
        await userService.signUp(nom,password_user,email);
        expect(mockedHttp.post).toHaveBeenCalledWith('/signup', { 
            nom:nom, password_user:password_user, email:email });
    });

    // it("get user", async () => {
    //     const users= [
    //         {
    //             id_user:7,nom:"Intérêts Bancaires",password_user:10,email:"2024-06-29T21:00:00.000Z"
    //             ,date_modification:"2024-06-30T06:00:00.000Z",id_budget:5,type_user:"revenu"
    //         },
    //         {
    //             id_user:12,nom:"Livre",password_user:20,email:"2024-06-14T21:00:00.000Z",
    //             date_modification:"2024-06-15T11:00:00.000Z",id_budget:5,type_user:"depense"
    //         }
    //     ]        
    //     mockedHttp.get.mockResolvedValue(users);
    //     const data = await userService.getuser();
    //     expect(mockedHttp.get).toHaveBeenCalledWith('/get-user',{});
    //     expect(data).toEqual(users);
    // });



    // it("delete user", async () => {
    //     const id_user:number = 44;
    //     const type_user:string = 'revenu';
    //     mockedHttp.delete.mockResolvedValue({ data: { success: true } });
    //     await userService.deleteuser(id_user,type_user);
    //     expect(mockedHttp.delete).toHaveBeenCalledWith(`/delete-user/${id_user}`,{
    //         params: {
    //             type_user: type_user
    //         }
    //     });
    // });

    // it("update user", async () => {
    //     const id_user:number = 44
    //     const nom:string = 'test';
    //     const password_user:number = 333;
    //     const email:string | undefined = '2024-03-15';
    //     const id_budget:number = 2;
    //     const type_user:string = 'revenu'
    //     mockedHttp.put.mockResolvedValue({ data: { success: true } });
    //     await userService.updateuser(
    //         id_user,nom,password_user,email,
    //         id_budget,type_user
    //     );
    //     expect(mockedHttp.put).toHaveBeenCalledWith(`/update-user/${id_user}`,{
    //         nom:nom, password_user:password_user, email:email,    
    //         id_budget:id_budget,type_user:type_user 
    //     });
    // });
});