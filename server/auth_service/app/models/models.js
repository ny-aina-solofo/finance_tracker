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

db.board = require('./board.model')(sequelize,Sequelize);
db.column = require('./column.model')(sequelize,Sequelize);
db.task = require('./task.model')(sequelize,Sequelize);
db.subtask = require('./subtask.model')(sequelize,Sequelize);

module.exports = db ; 
