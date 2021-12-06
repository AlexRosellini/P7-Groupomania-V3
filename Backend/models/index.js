const Post = require('./post');
const User = require('./user');
const Comment = require('./comment');

/**/
const load = async() => {
    Post.belongsTo(User, {onDelete: "CASCADE"});
    Post.hasMany(Comment);
    Comment.belongsTo(User, {onDelete:"cascade"});
    Comment.belongsTo(Post, {onDelete:"cascade"});


    await Post.sync({alter:true}),
    await User.sync({alter: true})
    await Comment.sync({alter:true})
}

module.exports = {Post, User, load};
