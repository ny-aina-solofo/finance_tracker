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

module.exports = {
    getTransaction
}; 
