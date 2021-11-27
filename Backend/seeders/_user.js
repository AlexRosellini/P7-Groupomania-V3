const bcrypt = require("bcrypt");
const User = require("../models/user");

const userSeeder = async () => {
  console.info("users seeded");

  const users = [
    {
      userName: "john.doe",
      email: "john.doe@gmail.com",
      password: bcrypt.hashSync("password", 10),
      isAdmin: false,
      description: "Pas de Bio pour le moment!",
    },
    {
      userName: "Admin",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("password", 10),
      isAdmin: true,
      description: "Pas de Bio pour le moment!",
    },
  ];

  await User.bulkCreate(users);

  console.info("users seeded");
};

module.exports = userSeeder;
