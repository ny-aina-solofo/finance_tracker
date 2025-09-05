module.exports = (sequelize, Sequelize) =>{
    const budget = sequelize.define('budget', {
        id_budget : {
            type : Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        nom_budget : {
            type : Sequelize.STRING,
            allowNull:false
        },
        montant_initial : {
            type : Sequelize.INTEGER,
            allowNull:false
        },
        date_creation : {
            type : Sequelize.DATE,
            allowNull:false
        },
        date_modification : {
            type : Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull:false
        },
        id_utilisateur : {
            type : Sequelize.STRING,
            allowNull:false    
        },
        montant_actuel : {
            type : Sequelize.INTEGER,
            allowNull:false    
        },
        themes : {
            type : Sequelize.STRING,
            allowNull:false    
        },
    },{
        freezeTableName: true ,// Désactive la pluralisation automatique
        schema: 'finance', // Spécifie le schéma
        timestamps : false // Désactive les colonnes createdAt et updatedAt
    });
    return budget;
}