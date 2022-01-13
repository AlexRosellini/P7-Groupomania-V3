/*********************************************************************************/
//On importe ce dont nous avons besoin.

const Sequelize = require('sequelize');
const db = require ('../config/database')

/*********************************************************************************/
//Notre modèle d'utilisateur

const User = db.define('user', {
    userName: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        isUnique: true,
    },
    password: {
        type: Sequelize.STRING,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        default: false,
    },
    description: {
        type: Sequelize.STRING,
        default: 'No description availiable yet',
    },
    image: {
        type: Sequelize.STRING,
        default: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    }
}, {
    
});

module.exports = User;