const userSeeder = require('./_user');
const postSeeder = require('./_posts')

const runSeeders = async () => {
    console.info("run seeders...");
    await userSeeder();
    await postSeeder()
    console.info("...end seeders");
}

module.exports = runSeeders;