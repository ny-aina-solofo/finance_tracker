const {db,sequelize} = require('../models/index');
const Transactions = db.transactions
// const Budget = db.budget;
// const Depense = db.depense;
// const Revenu = db.revenu;

const getTransaction = async () => {
    try {
        const result = await Transactions.findAll({
            // where: { id_utilisateur: id_user.toString() },
            order: [['date_creation', 'DESC']]
        });  
        return result.map((r) => r.toJSON())
    } catch (error) {
        console.error("Error fetching transactions data:", error);
        return{ message: "Error retrieving transactions data.", error: error.message };
    }
}
// const addTransaction = async (libelle,montant,date_creation,id_budget,type_transaction) =>{
//     try {
//         const budget = await Budget.findOne({where : {id_budget: id_budget}});
//         if (!budget) {
//             return { message: "Budget associé non trouvé." };
//         }
//         const oldAmount = budget.montant_actuel;
        
//         if (type_transaction === 'depense') {
//             // await Depense.create({id_depense:44,libelle:libelle,montant:montant, date_creation:date_creation, 
//             //     id_budget:id_budget
//             // });
//             await Depense.create({libelle:libelle,montant:montant, date_creation:date_creation, 
//                 id_budget:id_budget
//             });
//             const newAmount = oldAmount - montant;
//             await Budget.update({ montant_actuel: newAmount},{ where: { id_budget: id_budget }});
//             return{success:true};
//         } else {
//             // await Revenu.create({id_revenu:44,libelle:libelle,montant:montant, date_creation:date_creation, 
//             //     id_budget:id_budget
//             // });
//             await Revenu.create({libelle:libelle,montant:montant, date_creation:date_creation, 
//                 id_budget:id_budget
//             });
//             const newAmount = oldAmount + montant
//             await Budget.update({ montant_actuel: newAmount},{ where: { id_budget: id_budget }});
//             return{success:true};
//         }
   
//     } catch (error) {
//         console.error("Error inserting transactions data:", error);
//         return{ message: "Error retrieving transactions data.", error: error.message };
//     }
// }
// const updateTransaction = async (id_transaction,libelle,date_creation,type_transaction) =>{
//     try {
//         if (type_transaction === 'depense') {
//             await Depense.update(
//                 {libelle:libelle, date_creation:date_creation},
//                 {where: {id_depense : id_transaction}}
                
//             );
//             return{success:true};
//         } else {
//             await Revenu.update(
//                 {libelle:libelle, date_creation:date_creation},
//                 {where: {id_revenu : id_transaction}}
                
//             );
//             return{success:true};
//         }
//     } catch (error) {
//         console.error("Error updating transactions data:", error);
//         return{ message: "Error retrieving transactions data.", error: error.message };
//     }
// }
// const deleteTransaction = async (id_transaction,type_transaction) =>{
//     try {
//         if (type_transaction === 'depense') {    
//             const transactionsToDelete = await Depense.findOne({where: {id_depense : id_transaction}});
//             if (!transactionsToDelete) {
//                 return { message: "Transaction non trouvée ou accès refusé." };
//             }
//             const budget = await Budget.findOne({where: {id_budget: transactionsToDelete.id_budget}});
//             if (!budget) {
//                 return { message: "Budget associé non trouvé." };
//             }
//             const oldAmount = budget.montant_actuel;
//             const newAmount = oldAmount + transactionsToDelete.montant;
//             await Budget.update({ montant_actuel: newAmount},{ where: { id_budget: budget.id_budget }});
//             await Depense.destroy({where: {id_depense : id_transaction}});
//             return{success:true};
//         } else {
//             const transactionsToDelete = await Revenu.findOne({where: {id_revenu : id_transaction}});
//             if (!transactionsToDelete) {
//                 return { message: "Transaction non trouvée ou accès refusé." };
//             }
//             const budget = await Budget.findOne({where: {id_budget: transactionsToDelete.id_budget}});
//             if (!budget) {
//                 return { message: "Budget associé non trouvé." };
//             }
//             const oldAmount = budget.montant_actuel;
//             const newAmount = oldAmount - transactionsToDelete.montant;
//             await Budget.update({ montant_actuel: newAmount},{ where: { id_budget: budget.id_budget }});
//             await Revenu.destroy({where: {id_revenu : id_transaction}});
//             return{success:true};
//         }   
//     } catch (error) {
//         console.error("Error deleting transactions data:", error);
//         return{ message: "Error retrieving transactions data.", error: error.message };
//     }
// }

module.exports = {
    getTransaction,
    // addTransaction,
    // updateTransaction,
    // deleteTransaction
}; 
