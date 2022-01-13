/*********************************************************************************/
//On importe ce dont nous avons besoin.

const Post = require('./post'); //modèle post
const User = require('./user'); //modèle user
const Comment = require('./comment'); //modèle commentaire

/*********************************************************************************/
//On gêre les relations.

const load = async() => {
    Post.belongsTo(User, {onDelete: "CASCADE"}); //Un post appartient à un utilisateur
    Post.hasMany(Comment); //Chaque post à plusieurs commentaires.
    Comment.belongsTo(User, {onDelete:"CASCADE"}); //Les commentaires appartiennent à un utilisateur...
    Comment.belongsTo(Post, {onDelete:"CASCADE"}); //Ainsi qu'a un post.

    await Post.sync({alter:true}), //On attent ensuite la synchronization de la DB, et on ajuste les modèles si besoin.
    await User.sync({alter: true})
    await Comment.sync({alter:true})
}

module.exports = {Post, User, Comment, load}; //Ensuite on exporte.
