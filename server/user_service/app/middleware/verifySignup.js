const db = require('../models/models');
const User = db.user;

const checkDuplicate = async (req, res, next) => {
    try {
        const nomUser = await User.findOne({
            where: { nom: req.body.nom }
        });
        if (nomUser) {
            return res.status(400).send({
                message: "Failed! Username is already in use!"
            });
        }
        
        // Vérification du mot de passe
        const passwordUser = await User.findOne({
            where: { password_user: req.body.password_user }
        });
        if (passwordUser) {
            return res.status(400).send({
                message: "Failed! password_user is already in use!"
            });
        }
        
        // Vérification de l'email
        const emailUser = await User.findOne({
            where: { email: req.body.email }
        });
        if (emailUser) {
            return res.status(400).send({
                message: "Failed! Email is already in use!"
            });
        }

        // Si toutes les vérifications passent, on appelle next() une seule fois
        next();

    } catch (error) {
        console.error("Error checking for duplicates:", error);
        res.status(500).send({ message: "Error while checking for duplicates.", error: error.message });
    }
};

module.exports = {
    checkDuplicate
};
