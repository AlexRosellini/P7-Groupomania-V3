/*********************************************************************************/
//On importe ce dont nous avons besoin.

const bcrypt = require("bcrypt"); //Bcrypt hash les passwords.
const User = require("../models/user"); //Modèle d'utilisateur.

/*********************************************************************************/
//On importe ce dont nous avons besoin.

const userSeeder = async () => { //créer des templates dans la DB sur initialisation.
  console.info("users seeding"); //Quand ça commence, on annonce que c'est bon.

  const users = [
    {
      userName: "john.doe",
      email: "john.doe@gmail.com",
      password: bcrypt.hashSync("password", 10),
      isAdmin: false,
      description: "Pas de Bio pour le moment!",
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    },
    {
      userName: "Admin",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("password", 10),
      isAdmin: true,
      description: "Pas de Bio pour le moment!",
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    },
  ];

  await User.bulkCreate(users); //On créer nos template utilisateurs.

  console.info("users seeded"); //Avant de confirmer que c'est terminé.
};

module.exports = userSeeder;
