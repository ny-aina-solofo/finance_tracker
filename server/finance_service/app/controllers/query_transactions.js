const sql_transactions = `
    SELECT
        d.id_depense AS id_transaction,d.libelle,d.montant,d.date_creation,
        d.date_modification,d.id_budget,
        b.nom_budget ,'depense' AS type_transaction 
    FROM finance.depense d LEFT JOIN finance.budget b 
    ON d.id_budget = b.id_budget 

    UNION ALL

    SELECT
        r.id_revenu AS id_transaction,r.libelle,r.montant,r.date_creation,
        r.date_modification,r.id_budget,
        b.nom_budget,'revenu' AS type_transaction 
    FROM finance.revenu r LEFT JOIN finance.budget b 
    ON r.id_budget = b.id_budget 
`
module.exports = sql_transactions;