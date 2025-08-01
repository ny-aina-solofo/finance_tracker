const db = require('../models/models');
const User = db.user;
const bcrypt = require('bcryptjs');

const signUp = async (req,res,next) =>{
    try {
        const nom = req.body.nom;
        const password_user = req.body.password_user;
        const email = req.body.email;
        const hash = bcrypt.hashSync(password_user, 10); 

        await User.create({nom: nom,password_user: hash,email: email})
        res.status(200).send({success:true});
    } catch (error) {
        console.error("Error inserting user data:", error);
        res.status(500).send({ message: "Error retrieving user data.", error: error.message });
        next(error);
    }
}

// const getuser = async (req,res,next) => {
//     try {
//         const result = await user.findAll({});
//         if (result.length > 0) {
//             res.status(200).send(result);
//         } else {
//             res.status(200).send([]);
//         }
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//         res.status(500).send({ message: "Error retrieving user data.", error: error.message });
//         next(error); // Optionally pass the error to the next middleware
//     }
// }


// const deleteuser = async (req,res,next) =>{
//     try {
//         const id_user = req.params.id_user;
//         await user.destroy({ where: { id_user: id_user } });
//         res.status(200).send({success:true});
//     } catch (error) {
//         console.error("Error deleting user data:", error);
//         res.status(500).send({ message: "Error retrieving user data.", error: error.message });
//         next(error);
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
//         next(error);
//     }
// }

module.exports = {
    // getuser,
    signUp,
    // deleteuser,
    // updateuser
}; 