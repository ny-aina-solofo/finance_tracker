// const axios = require('axios');
const {db,sequelize} = require('../models/index');
// const {validateUser} = require('./user_controller');
const Budget = db.budget;
const Depense = db.depense;
const Revenu = db.revenu;

const getBudget = async (id_user) => {
    try {
        const result = await Budget.findAll({
            where: { id_utilisateur: id_user.toString() },
            order: [['date_creation', 'DESC']]
        });
        return result.map((r) => r.toJSON());
    } catch (error) {
        console.error("Error fetching budget data:", error);
        return{ message: "Error retrieving budget data.", error: error.message };
    }
}

const addBudget = async (id_user,nom_budget,montant,date_creation,themes) =>{
    try {
        // Appel au service d'authentification pour valider l'utilisateur
        // await axios.get(`${process.env.VITE_API_BASE_URL_USER}/validate/${id_user}`);
        // await validateUser(id_user);
        await Budget.create({
            nom_budget:nom_budget,montant_initial:montant, 
            date_creation:date_creation,montant_actuel:montant,themes:themes,
            id_utilisateur:id_user.toString()
        });
        return{success:true};    
    } catch (error) {
        console.error("Error inserting budget data:", error);
        return{ message: "Error retrieving budget data.", error: error.message };
    }
}
const deleteBudget = async (id_user,id_budget) =>{
    try {
        await Depense.destroy({where: { id_budget: id_budget }});
        await Revenu.destroy({where: { id_budget: id_budget }});
        await Budget.destroy({where: { id_budget: id_budget , id_utilisateur:id_user.toString()}});
        return{success:true};
    } catch (error) {
        console.error("Error deleting budget data:", error);
        return{ message: "Error retrieving budget data.", error: error.message };
    }
}
const updateBudget = async (id_user,id_budget,nom_budget,date_creation,themes) =>{
    try {
        await Budget.update(
            { 
                nom_budget:nom_budget,
                date_creation:date_creation,
                themes:themes
            },
            { 
                where: { id_budget: id_budget, id_utilisateur:id_user.toString() } 
            }
        );
        return{success:true};    
    } catch (error) {
        console.error("Error updating budget data:", error);
        return{ message: "Error retrieving budget data.", error: error.message };
    }
}

module.exports = {
    getBudget,
    addBudget,
    deleteBudget,
    updateBudget
}; 