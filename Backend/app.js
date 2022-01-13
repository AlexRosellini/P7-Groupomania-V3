require('dotenv').config(); //Dotenv nous permet de cacher certains elements dans un fichier gitignore (et ainsi ne pas donner nos mots de passes)

const express = require("express"); //Express pour créer notre app.
const cors = require('cors') //Simplifie l'utilisateur des CORS

let morgan = require('morgan'); //Log des données.

const db = require('./config/database'); //Notre DB.

const runSeeders = require('./seeders'); //On lance nos seeders

const path = require('path'); //Module node qui sert à cacher notre addresse  (marche avec dotenv)

const authRoutes = require('./routes/auth'); //Notre router auth
const userRoutes = require('./routes/user'); //Notre router user
const postRoutes = require('./routes/posts'); //Notre router post
const commentRoutes = require('./routes/comments') //Notre router commentaire

const {load} = require('./models/index') //On synchronize nos modèles et leur relations.

const helmet = require('helmet') //Element de sécurité pour le header des requêtes.
const xss = require('xss-clean'); //Element de sécurité. Aide contre les attaques XSS.
const rateLimit = require("express-rate-limit"); //Element de sécurité. contrôle le débit de requêttes.

/*********************************************************************************/
//On ce connecte sur notre database

db.authenticate()
    load()
    .then(() => { console.log('OK...')})
    .catch(err => console.log('error' + err))


db.sync({force: process.env.NODE_ENV === "dev"}).then(() => { //On synchronize notre DB.
  if(process.env.NODE_ENV === "dev") {
    runSeeders();
  }
})
  .catch(err => console.log('error' + err));



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
app.use(xss());
app.use(morgan('combined'))

app.use('/images', express.static(path.join(__dirname, 'images'))); //On indique le dossier pour multer

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);


app.use(function (err, req, res, next) {
  console.log('This is the invalid field ->', err.field)
  next(err)
})

module.exports = app