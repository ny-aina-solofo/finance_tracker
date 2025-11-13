const fs = require('node:fs');
const { app } = require('electron');
const Sequelize = require('sequelize');  
const path = require('node:path');

// const dbPath = path.resolve(__dirname, '../db/todolist.db');
// const userDataPath = app.getPath('userData');
// const dbPath = path.join(userDataPath, 'todolist.db');
const initialDbPath = path.join(__dirname, '../db/finance.db');
/*
if (!fs.existsSync(dbPath)) {
  // Le fichier n'existe pas dans le répertoire de données, copiez la version initiale
  try {
    fs.copyFileSync(initialDbPath, dbPath);
    console.log('Base de données initiale copiée.');
  } catch (err) {
    console.error('Erreur lors de la copie de la base de données initiale:', err);
  }
}
*/
const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  logging: console.log,
  storage: initialDbPath,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync()
  .then(() => {
    console.log('✅ Database synced.');
  })
  .catch(err => {
    console.error('❌ Database error:', err);
  });


const db = {} ; 
db.Sequelize = Sequelize ; 
db.sequelize = sequelize ; 

// db.budget = require('./budget_model')(sequelize,Sequelize);
// db.depense = require('./depense_model')(sequelize,Sequelize);
// db.revenu = require('./revenu_model')(sequelize,Sequelize);
db.transactions =  require('./transaction_model')(sequelize,Sequelize);
db.user = require('./user.model')(sequelize,Sequelize);

module.exports = {db,sequelize} ; 
    