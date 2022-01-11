/*********************************************************************************/
//imports

const Sequelize  = require('sequelize'); //Sequelize pour s'occuper de la DB.

module.exports = new Sequelize('Groupomania', 'postgres', process.env.DbPass, { //On créer notre database
    host: 'localhost',
    dialect: 'postgres', //On utilise Postgres au niveau du SQL.
    operatorAliases: false,
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});