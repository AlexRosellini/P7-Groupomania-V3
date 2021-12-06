const Sequelize = require('sequelize');
const db = require ('../config/database')

const Comment = db.define('comment', {
    content: {
        type: Sequelize.STRING,
    },
});

module.exports = Comment;