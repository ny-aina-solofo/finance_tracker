const { where } = require("sequelize");
const pool = require("../config/db.config");
const db = require('../models/models');
const Depense = db.depense;
const Revenu = db.revenu;
const query_transactions = require('./query_transactions')

const getTransaction = async (req,res,next) => {
    try {
        const sql_select = query_transactions;
        const result = await pool.query(sql_select,[]);  
        if (Object.keys(result).length > 0) res.status(200).send(result.rows);
        else res.status(200).send();
    } catch (error) {
        console.error("Error fetching transactions data:", error);
        res.status(500).send({ message: "Error retrieving transactions data.", error: error.message });
        next(error);
    }
}
const addTransaction = async (req,res,next) =>{
    try {
        const libelle = req.body.libelle;
        const montant = req.body.montant;
        const date_creation = req.body.date_creation;
        const id_budget = req.body.id_budget;
        const type_transaction = req.body.type_transaction;
        
        if (type_transaction === 'depense') {
            await Depense.create({libelle:libelle,montant:montant, date_creation:date_creation, 
                id_budget:id_budget
            });
            // await Depense.create({id_depense:44,libelle:libelle,montant:montant, date_creation:date_creation, 
            //     id_budget:id_budget
            // });
            res.status(200).send({success:true});
        } else {
            await Revenu.create({libelle:libelle,montant:montant, date_creation:date_creation, 
                id_budget:id_budget
            });
            // await Revenu.create({id_revenu:45,libelle:libelle,montant:montant, date_creation:date_creation, 
            //     id_budget:id_budget
            // });
            res.status(200).send({success:true});
        }
   
    } catch (error) {
        console.error("Error inserting transactions data:", error);
        res.status(500).send({ message: "Error retrieving transactions data.", error: error.message });
        next(error);
    }
}
const updateTransaction = async (req,res,next) =>{
    try {
        const id_transaction = req.params.id_transaction;
        const libelle = req.body.libelle;
        const montant = req.body.montant;
        const date_creation = req.body.date_creation;
        const id_budget = req.body.id_budget;
        const type_transaction = req.body.type_transaction;
        
        if (type_transaction === 'depense') {
            await Depense.update(
                {libelle:libelle,montant:montant, date_creation:date_creation,id_budget:id_budget},
                {where: {id_depense : id_transaction}}
                
            );
            res.status(200).send({success:true});
        } else {
            await Revenu.update(
                {libelle:libelle,montant:montant, date_creation:date_creation,id_budget:id_budget},
                {where: {id_revenu : id_transaction}}
                
            );
            res.status(200).send({success:true});
        }
    } catch (error) {
        console.error("Error updating transactions data:", error);
        res.status(500).send({ message: "Error retrieving transactions data.", error: error.message });
        next(error);
    }
}
const deleteTransaction = async (req,res,next) =>{
    try {
        const id_transaction = req.params.id_transaction;
        const type_transaction = req.query.type_transaction;
        if (type_transaction === 'depense') {
            await Depense.destroy({where: {id_depense : id_transaction}});
            res.status(200).send({success:true});
        } else {
            await Revenu.destroy({where: {id_revenu : id_transaction}});
            res.status(200).send({success:true});
        }   
    } catch (error) {
        console.error("Error deleting budget data:", error);
        res.status(500).send({ message: "Error retrieving budget data.", error: error.message });
        next(error);
    }
}

module.exports = {
    getTransaction,
    addTransaction,
    updateTransaction,
    deleteTransaction
}; 
