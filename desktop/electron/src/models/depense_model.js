const { Deferrable } = require("sequelize");

module.exports = (sequelize, Sequelize) =>{
    const depense = sequelize.define('depense', {
        id_depense : {
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
            type : Sequelize.STRING,
            allowNull:false
        },
        date_modification : {
            type : Sequelize.STRING,
            defaultValue: Sequelize.NOW,
            allowNull:false
        },
        id_budget : {
            type : Sequelize.INTEGER,
            allowNull:false,
            references: {
                model: {
                    tableName: 'budget',
                },
                key: 'id_budget',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        }
    },{
        sequelize,
        freezeTableName: true ,// Désactive la pluralisation automatique
        timestamps : false // Désactive les colonnes createdAt et updatedAt
    });
    return depense;
}