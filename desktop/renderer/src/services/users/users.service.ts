class UserService {
    async signUp(nom:string,password_user:string,email:string){
        const response = await window.electronAPI.signUp(nom, password_user, email);
        return response
    }

    async signIn(email:string,password_user:string){
        const response = await window.electronAPI.signIn(email, password_user);
        // console.log("SIGNIN RESPONSE:", response);
        if (response && response.userData && response.userData.token) {
            sessionStorage.setItem('utilisateur connecté', JSON.stringify(response.userData));
            return response.userData;
        } else {
            throw new Error("Erreur de connexion : réponse invalide du serveur");
        }        
    }
    logout(){
        sessionStorage.removeItem('utilisateur connecté');
    }
    isAuthenticated(){
        return sessionStorage.getItem('utilisateur connecté') !== null;
    }
    getCurrentUser() {
        const userStr = sessionStorage.getItem("utilisateur connecté");
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    };

    // méthode pour initialiser l'en-tête d'autorisation au chargement de l'app
    // C'est important pour que l'utilisateur reste connecté après un rafraîchissement
    initializeAuth() {
        const user = this.getCurrentUser();
        if (user && user.token) {
            return user
        }
    }
    
    
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

const userService = new UserService();
userService.initializeAuth();

export default userService;
