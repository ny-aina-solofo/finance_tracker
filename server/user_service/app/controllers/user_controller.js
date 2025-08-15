const jwt = require("jsonwebtoken");
const db = require('../models/models');
const User = db.user;
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const signUp = async (req,res,next) =>{
    try {
        const nom = req.body.nom;
        const password_user = req.body.password_user;
        const email = req.body.email;
        
        const hash = bcrypt.hashSync(password_user, 10); 
        const newUser = await User.create({nom: nom,password_user: hash,email: email})
        // Generate JWT
        const token = jwt.sign(
            { id_user: newUser.id_user, email: newUser.email }, process.env.SECRET_KEY,
            { algorithm: 'HS256', expiresIn: 3600 }
        );
        res.status(200).send({id: newUser.id_user,token : token});
    } catch (error) {
        console.error("Error inserting user data:", error);
        res.status(500).send({ message: "Error retrieving user data.", error: error.message });
        // next(error);
    }
}

const signIn = async (req,res,next) => {
    try {
        const email = req.body.email;
        const password_user = req.body.password_user;

        const existingUser = await User.findOne({where:{email : email}});        
        if (!existingUser) {
            return res.status(401).json({ message: 'incorrect email'});
        }

        const isValid = bcrypt.compareSync(password_user, existingUser.password_user);
        if (!isValid) {
            return res.status(401).json({ message: 'incorrect passwords' });
        }

        const token = jwt.sign(
            { id: existingUser.id_user },process.env.SECRET_KEY,
            { algorithm: 'HS256', expiresIn: 3600 }
        ) 
        res.status(200).send({id: existingUser.id_user,token : token});
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send({ message: "Error retrieving user data.", error: error.message });
        // next(error); // Optionally pass the error to the next middleware
    }
}
const validateUser = async (req, res, next) => {
    try {
        const { id_user } = req.params;
        const user = await User.findOne({ where: { id_user } });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ message: 'Utilisateur valide', user });
    } catch (error) {
        console.error("Erreur lors de la validation de l'utilisateur:", error);
        res.status(500).send({ message: "Erreur lors de la validation.", error: error.message });
        // next(error);
    }
};

// const deleteuser = async (req,res,next) =>{
//     try {
//         const id_user = req.params.id_user;
//         await user.destroy({ where: { id_user: id_user } });
//         res.status(200).send({success:true});
//     } catch (error) {
//         console.error("Error deleting user data:", error);
//         res.status(500).send({ message: "Error retrieving user data.", error: error.message });
        // next(error);
//     }
// }

// const updateuser = async (req,res,next) =>{
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
//         res.status(200).send({success:true});    
//     } catch (error) {
//         console.error("Error updating user data:", error);
//         res.status(500).send({ message: "Error retrieving user data.", error: error.message });
//         // next(error);
//     }
// }

module.exports = {
    signUp,
    signIn,
    validateUser
    // deleteuser,
    // updateuser
}; 