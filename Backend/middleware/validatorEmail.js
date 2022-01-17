module.exports = ( req, res, next) => { 
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)){ //On vérifie l'email via regex.
       next() //si tout va bien, next.
     } else {
     res.status(400).json({error : 'Votre Email est incorrect'}) //Sinon un message d'érreur'
       }
}