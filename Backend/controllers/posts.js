/*********************************************************************************/
//On importe ce dont nous avons besoin.

const { Post, User, Comment } = require('../models/Index');

exports.getAllPosts = (req, res, next) => {
  try {
    Post.findAll({
      include: [{
          model: User,
      }],
      order: [['createdAt', 'DESC']]
  }) 
      .then((post) => res.status(200).json(post))
  }
  catch(error) {
    res.status(400).json({message: 'error :' + error})
  }
}

exports.getOnePost = (req, res, next) => {
    try {
    Post.findOne({where: { id: req.params.id }}, 
      {include: 
        [{
          model: User,
        }], 
        order: [['createdAt', 'DESC']]
      })
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((error) => {
        res.status(404).json({
          message: error,
        });
      })
    }
      catch (error) {
          console.log(error)
      }
};

exports.modifyPost = async (req, res, next) => {
  try {
    let id = req.params.id
    let image;
    console.log(req.file)
    console.log(req.body)
    if (req.file) {
      image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  
    }
    if (image) {
      Post.image = image
    }
    const post = await Post.update({...req.body, image: image}, {where: {id: id}})
    res.status(200).json(post)  
  }
  catch(error) {
    res.status(500).send(error)
  }
}

exports.createPost = (req, res) => {
    let image
    if (req.body.title === null || !req.body.title) {
        res.status(400).json({message: 'Votre post doit avoir un titre!'})
    }
    if (req.body.textContent === null || !req.body.textContent) {
        res.status(400).json({message: 'Votre post ne doit pas être vide!'})
    }
    else {
        if (req.file) {
            image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  
        }
        const post = new Post({
            title: req.body.title,
            textContent: req.body.textContent,
            author: req.body.author,
            image: image,
            userId: req.token.userId
        })
        post.save()
        .then(() => {res.status(200).json({message: 'success'})})     
        .catch(error => res.status(400).json({ message : 'something went wrong ... ' + error})) //Sinon un message d'érreur (si même email)
    }
}

exports.deletePost = (req, res) => {
  Post.findOne({where: {id: req.params.id}})
    .then((post) => {
      post.destroy({where: {id: req.params.id}})
    })
    .then(() => res.status(200).json({message: 'Post deleted'}))
    .catch((error) => res.status(400).json({error: error}))
}