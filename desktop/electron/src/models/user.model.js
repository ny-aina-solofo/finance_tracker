module.exports = (sequelize, Sequelize) =>{
    const user = sequelize.define('utilisateur', {
        id_utilisateur : {
            type : Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        nom : {
            type : Sequelize.STRING,
            unique: true,
            allowNull:false
        },
        passwords : {
            type : Sequelize.STRING,
            unique: true,
            allowNull:false
        },
        email : {
            type : Sequelize.STRING,
            unique: true,
            allowNull:false
        }
    },{
        sequelize,
        freezeTableName: true ,// Désactive la pluralisation automatique
        timestamps : false // Désactive les colonnes createdAt et updatedAt
    });
    return user;
}