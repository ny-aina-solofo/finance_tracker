module.exports = (sequelize, Sequelize) =>{
    const transactions = sequelize.define('transactions', {
        id_transaction  : {
            type : Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        libelle : {
            type : Sequelize.STRING,
            allowNull:false
        },
        montant : {
            type : Sequelize.INTEGER,
            allowNull:false
        },
        type_transaction : {
            type : Sequelize.STRING,
            allowNull:false
        },
        date_creation : {
            type : Sequelize.STRING,
            allowNull:false
        },
        date_modification : {
            type : Sequelize.STRING,
            defaultValue: Sequelize.NOW,
            allowNull:false
        },
        id_utilisateur : {
            type : Sequelize.STRING,
            allowNull:false
        }
    },{
        freezeTableName: true ,// Désactive la pluralisation automatique
        timestamps : false // Désactive les colonnes createdAt et updatedAt
    });
    return transactions;
}
