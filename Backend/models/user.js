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
    isAdmin: false
});

module.exports = User;