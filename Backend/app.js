require('dotenv').config(); //Dotenv nous permet de cacher certains elements dans un fichier gitignore (et ainsi ne pas donner nos mots de passes)

const express = require("express");
const cors = require('cors')
const helmet = require('helmet')
let morgan = require('morgan');
const db = require('./config/database');
const runSeeders = require('./seeders');
const path = require('path'); //Module node qui sert à cacher notre addresse Mongo (marche avec dotenv)
const authRoutes = require('./routes/auth'); //Notre router auth
const userRoutes = require('./routes/user'); //Notre router user
const postRoutes = require('./routes/post');

/*********************************************************************************/
//On ce connect sur notre database

db.authenticate()
    .then(() => { console.log('OK...')})
    .catch(err => console.log('error' + err))
    
//db.sync({force: process.env.NODE_ENV === "dev"}).then(() => {
//  if(process.env.NODE_ENV) {
//    runSeeders();
//  }
//})
//  .catch(err => console.log('error' + err));
//


/*********************************************************************************/
//On créer notre application

const app = express();

/*********************************************************************************/
//Vu que l'on a deux origines, on ajoute un middleware pour éviter les érreurs CORS
const corsOptions = {
  origin:'http://localhost:3001',
  credentials:true,
  optionSuccessStatus:'200'
}
app.use(cors(corsOptions))


/****************************************************************/
//Nos middlewares principaux.


app.use(express.json()); //Equivalent de bodyparser qui n'est plus utiliser.
app.use(express.urlencoded({
  extended: true
}));

app.use(helmet()); 

app.use(morgan('combined'))

app.use('/images', express.static(path.join(__dirname, 'images'))); //On indique le dossier pour multer

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

app.use(function (err, req, res, next) {
  console.log('This is the invalid field ->', err.field)
  next(err)
})

module.exports = app