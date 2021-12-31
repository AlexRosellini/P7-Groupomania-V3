const Post = require("../models/post");

const postSeeder = async () => {
  console.info("postSeeded");

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

  await Post.bulkCreate(posts);

  console.info("posts seeded");
};

module.exports = postSeeder;
