/*********************************************************************************/
//On importe ce dont nous avons besoin.

const Sequelize = require('sequelize'); //Sequelize pour gêrer la DB.
const db = require ('../config/database') //La dite database.

/*********************************************************************************/
//Notre modèle commentaire

const Comment = db.define('comment', { //Notre modèle de commentaire
    content: {
        type: Sequelize.STRING,
    },
});

module.exports = Comment;