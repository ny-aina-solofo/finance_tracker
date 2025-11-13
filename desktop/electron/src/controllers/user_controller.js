const jwt = require("jsonwebtoken");
const {db,sequelize} = require('../models/index');
const User = db.user;
const bcrypt = require('bcryptjs');
const secret_key = "finance";

const signUp = async (nom,password_user,email) =>{
    try {
        const hash = bcrypt.hashSync(password_user, 10); 
        const newUser = await User.create({nom: nom,passwords: hash,email: email})
        const token = jwt.sign(
            { id : newUser.id_utilisateur, email: newUser.email }, secret_key,
            { algorithm: 'HS256', expiresIn: 3600 }
        );
        return {id: newUser.id_utilisateur,token : token};
    } catch (error) {
        console.error("Error inserting user data:", error);
        return{ message: "Error retrieving user data.", error: error.message };
    }
}

const signIn = async (email,password_user) => {
    try {
        const existingUser = await User.findOne({where:{email : email}});        
        if (!existingUser) {
            return{ message: 'incorrect email'};
        }
        
        const isValid = bcrypt.compareSync(password_user, existingUser.passwords);
        if (!isValid) {
            return{ message: 'incorrect passwords' };
        }

        const token = jwt.sign(
            { id: existingUser.id_user },secret_key,
            { algorithm: 'HS256', expiresIn: 3600 }
        ) 
        const userData = {
            id: existingUser.id_utilisateur,
            nom: existingUser.nom ,
            token : token
        }
        return {userData};
    } catch (error) {
        console.error("Error fetching user data:", error);
        return{ message: "Error retrieving user data.", error: error.message };
    }
}
// const validateUser = async (id_user) => {
//     try {
//         const user = await User.findOne({ where: { id_user } });

//         if (!user) {
//             return{ message: 'Utilisateur non trouvé' };
//         }

//         return{ message: 'Utilisateur valide', user };
//     } catch (error) {
//         console.error("Erreur lors de la validation de l'utilisateur:", error);
//         return{ message: "Erreur lors de la validation.", error: error.message };
//     }
// };

// const deleteUser = async () =>{
//     try {
//         const id_user = req.params.id_user;
//         await user.destroy({ where: { id_user: id_user } });
//         return{success:true});
//     } catch (error) {
//         console.error("Error deleting user data:", error);
//         return{ message: "Error retrieving user data.", error: error.message };
        // next(error);
//     }
// }

// const updateUser = async () =>{
//     try {
//         const id_user = req.params.id_user;
//         const nom_user = req.body.nom_user;
//         const password_user = req.body.password_user;
//         const email = req.body.email;
//         await user.update(
//             { 
//                 nom_user:nom_user,
//                 password_user:password_user, 
//                 email:email
//             },
//             { 
//                 where: { id_user: id_user } 
//             }
//         );
//         return{success:true});    
//     } catch (error) {
//         console.error("Error updating user data:", error);
//         return{ message: "Error retrieving user data.", error: error.message };
//         // next(error);
//     }
// }

module.exports = {
    signUp,
    signIn,
    // validateUser
    // deleteUser,
    // updateUser
}; 