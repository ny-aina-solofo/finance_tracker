import http from '../http_common_user';

class UserService {
    signUp(nom:string,password_user:string,email:string){
        return http.post('/signup',{nom,password_user,email});
    }

    signIn(email:string,password_user:string){
        return http.post('/signin',{email,password_user}).then(response =>{
            if (response.data && response.data.token) {
                sessionStorage.setItem('utilisateur connecté', JSON.stringify(response.data));
                // Après la connexion, nous configurons l'instance Axios
                // pour envoyer le token dans l'en-tête de chaque requête.
                this.setAuthHeader(response.data.token);
                return response;
            }
        });
    }
    logout(){
        sessionStorage.removeItem('utilisateur connecté');
        this.removeAuthHeader();
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
    
    // méthode pour configurer l'en-tête d'autorisation
    setAuthHeader(token: string) {
        // Assume que 'http' est une instance Axios
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    //  méthode pour retirer l'en-tête
    removeAuthHeader() {
        delete http.defaults.headers.common['Authorization'];
    }

    // méthode pour initialiser l'en-tête d'autorisation au chargement de l'app
    // C'est important pour que l'utilisateur reste connecté après un rafraîchissement
    initializeAuth() {
        const user = this.getCurrentUser();
        if (user && user.token) {
            this.setAuthHeader(user.token);
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
