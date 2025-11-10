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

    it("get login", async () => {
        const email:string = 'test@finance.com';
        const password_user:string = 'test123';
        const auth = [{id:2,token:"token"}]        
        mockedHttp.post.mockResolvedValue(auth);
        await userService.signIn(email,password_user);
        expect(mockedHttp.post).toHaveBeenCalledWith('/signin',{email:email,password_user:password_user});
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