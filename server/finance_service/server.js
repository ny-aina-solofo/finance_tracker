const express = require("express");
const cors = require("cors");
const routes = require("../server/app/routes/routes"); 
const app = express(); 
const dotenv = require('dotenv');

dotenv.config();
const urlAPI = process.env.URL_API; 
const portAPI = process.env.PORT; 
const corsOptions = {origin : urlAPI};

app.use(cors(corsOptions)); // cors provides Express middleware to enable CORS with various options
app.use(express.json()); 
app.use(process.env.BASE_URL,routes);
app.listen(portAPI, ()=>{
    console.log(`app run on port ${portAPI}`);
})

const db = require('./app/models/models');
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  }); 
// db.sequelize.sync({force : true}).then(()=>{console.log("Drop and re-sync db.");})

