import http from '../http_common_user';

class UserService {
    signUp(nom:string,password_user:string,email:string){
        return http.post('/signup',{nom,password_user,email});
    }

    // getUser(){
    //     return http.get('/get-User',{});
    // }

    // deleteUser(id_User:number,type_User:string){
    //     return http.delete(`/delete-User/${id_User}`, {
    //         params: {
    //             type_User: type_User
    //         }
    //     });
    // }
    // updateUser(
    //     id_User:number,libelle:string,montant:number, date_creation:string | undefined,
    //     id_budget:number,type_User:string
    // ){
    //     return http.put(`/update-User/${id_User}`,{
    //         libelle,montant,date_creation,
    //         id_budget,type_User
    //     });
    // }
}

export default new UserService();
