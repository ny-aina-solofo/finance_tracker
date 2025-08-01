module.exports = (sequelize, Sequelize) =>{
    const user = sequelize.define('utilisateur', {
        id_user : {
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
        password_user : {
            type : Sequelize.STRING(20),
            unique: true,
            allowNull:false
        },
        email : {
            type : Sequelize.STRING(60),
            unique: true,
            allowNull:false
        }
    },{
        freezeTableName: true ,// Désactive la pluralisation automatique
        schema: 'users', // Spécifie le schéma
        timestamps : false // Désactive les colonnes createdAt et updatedAt
    });
    return user;
}