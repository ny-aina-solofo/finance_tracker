const db = require('../models/models');
const Budget = db.budget;

const getBudget = async (req,res,next) => {
    try {
        const result = await Budget.findAll({});
        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(200).send([]);
        }
    } catch (error) {
        console.error("Error fetching budget data:", error);
        res.status(500).send({ message: "Error retrieving budget data.", error: error.message });
        next(error); // Optionally pass the error to the next middleware
    }
}

const addBudget = async (req,res,next) =>{
    try {
        const nom_budget = req.body.nom_budget;
        const montant = req.body.montant;
        const date_creation = req.body.date_creation;
        // console.log(date_creation);
        // await Budget.create({id_budget:44,nom_budget:nom_budget,montant:montant, date_creation:date_creation});
        await Budget.create({nom_budget:nom_budget,montant:montant, date_creation:date_creation});
        res.status(200).send({success:true});    
    } catch (error) {
        console.error("Error inserting budget data:", error);
        res.status(500).send({ message: "Error retrieving budget data.", error: error.message });
        next(error);
    }
}
const deleteBudget = async (req,res,next) =>{
    try {
        const id_budget = req.params.id_budget;
        await Budget.destroy({ where: { id_budget: id_budget } });
        res.status(200).send({success:true});
    } catch (error) {
        console.error("Error fetching budget data:", error);
        res.status(500).send({ message: "Error retrieving budget data.", error: error.message });
        next(error);
    }
}
const updateBudget = async (req,res,next) =>{
    try {
        const id_budget = req.params.id_budget;
        const nom_budget = req.body.nom_budget;
        const montant = req.body.montant;
        const date_creation = req.body.date_creation;
        await Budget.update(
            { 
                nom_budget:nom_budget,
                montant:montant, 
                date_creation:date_creation
            },
            { 
                where: { id_budget: id_budget } 
            }
        );
        res.status(200).send({success:true});    
    } catch (error) {
        console.error("Error inserting budget data:", error);
        res.status(500).send({ message: "Error retrieving budget data.", error: error.message });
        next(error);
    }
}

module.exports = {
    getBudget,
    addBudget,
    deleteBudget,
    updateBudget
}; 