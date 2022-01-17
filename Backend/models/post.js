/*********************************************************************************/
//On importe ce dont nous avons besoin.

const Sequelize = require('sequelize');
const db = require ('../config/database')

/*********************************************************************************/
//Notre modèle de post.

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