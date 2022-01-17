/*********************************************************************************/
//On importe ce dont nous avons besoin.

const userSeeder = require('./_user'); //Seeder post
const postSeeder = require('./_posts') //Seeder user

/*********************************************************************************/
//On importe ce dont nous avons besoin.

const runSeeders = async () => {
    console.info("run seeders..."); //On commence 
    await userSeeder(); //On seed les posts
    await postSeeder() //Et les utilisateurs
    console.info("...end seeders"); //On termine
}

module.exports = runSeeders;