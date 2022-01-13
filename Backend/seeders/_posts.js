/*********************************************************************************/
//On importe ce dont nous avons besoin.

const Post = require("../models/post"); //modèle post

/*********************************************************************************/
//Notre seeder post

const postSeeder = async () => { //créer des templates dans la DB sur initialisation.
  console.info("post Seeding"); //Quand ça commence, on annonce que c'est bon.

  const posts = [
    {
      title: "This would be dope if it worked!",
      textContent: "Yooo, this works maybe?",
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
      userId: 1
    },
    {
        title: "This would be PLUS ULTRA dope if it worked!",
        textContent: "Its allright! Cavalry's here!",
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        userId: 2
      },
  ];

  await Post.bulkCreate(posts); //Et on créer nos posts.

  console.info("posts seeded"); //Avant de confirmer que c'est terminé.
};

module.exports = postSeeder;
