const { Deferrable } = require("sequelize");

module.exports = (sequelize, Sequelize) =>{
    const revenu = sequelize.define('revenu', {
        id_revenu : {
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
        date_creation : {
            type : Sequelize.DATE,
            allowNull:false
        },
        date_modification : {
            type : Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull:false
        },
        id_budget : {
            type : Sequelize.INTEGER,
            allowNull:false,
            references: {
                model: {
                    tableName: 'budget',
                    schema: 'finance' 
                },
                key: 'id_budget',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        }
    },{
        freezeTableName: true ,// Désactive la pluralisation automatique
        schema: 'finance', // Spécifie le schéma
        timestamps : false // Désactive les colonnes createdAt et updatedAt
    });
    return revenu;
}