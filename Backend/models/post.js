const Sequelize = require('sequelize');
const db = require ('../config/database')

const User = db.define('post', {
    title: {
        type: Sequelize.STRING,
    },
    textContent: {
        type: Sequelize.STRING,
    },
    mediaContent: {
        type: Sequelize.STRING,
    },
    likes: {
        type: Sequelize.INTEGER,
        default: 0,    
    },
    dislikes: {
        type: Sequelize.INTEGER,
        default: 0,
    },
    user: {
        type: Sequelize.STRING,
        default: 'admin',
    }
});

module.exports = Post;