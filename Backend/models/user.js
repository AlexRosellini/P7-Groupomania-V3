const Sequelize = require('sequelize');
const db = require ('../config/database')

const User = db.define('user', {
    userName: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
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
         
    }
});

module.exports = User;