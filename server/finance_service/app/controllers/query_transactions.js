const sql_transactions = `
    SELECT
        id_depense AS id_transaction,libelle,montant,date_creation,
        date_modification,id_budget,'depense' AS type_transaction 
    FROM
        finance.depense
    
    UNION ALL
    
    SELECT
        id_revenu AS id_transaction,libelle,montant,date_creation,
        date_modification,id_budget,'revenu' AS type_transaction 
    FROM
        finance.revenu
    
    ORDER BY
        date_creation DESC;
`
module.exports = sql_transactions;