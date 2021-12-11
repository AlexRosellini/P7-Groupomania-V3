const Sequelize = require('sequelize');
const db = require ('../config/database')

const Post = db.define('post', {
    title: {
        type: Sequelize.STRING,
    },
    textContent: {
        type: Sequelize.STRING,
    },
    image: {
        type: Sequelize.STRING
    }
});

module.exports = Post;