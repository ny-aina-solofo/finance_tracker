const dbConfig  = require('../config/db.config'); 
const Sequelize = require('sequelize');  

const sequelize = new Sequelize(dbConfig.options.database,dbConfig.options.user,dbConfig.options.password , {
    host : dbConfig.options.host, 
    dialect : "postgres",
    logging: console.log, // Active les logs SQL
    // operatorsAliases :false, 
    pool : {
        max : dbConfig.options.max, 
        min : dbConfig.options.min, 
        acquire : 30000, 
        idle : 10000, 
    } 
}); 
// console.log(dbConfig.options.user,dbConfig.options.database, dbConfig.options.password );

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = {} ; 
db.Sequelize = Sequelize ; 
db.sequelize = sequelize ; 

db.budget = require('./budget_model')(sequelize,Sequelize);
db.depense = require('./depense_model')(sequelize,Sequelize);
db.revenu = require('./revenu_model')(sequelize,Sequelize);

module.exports = db ; 
