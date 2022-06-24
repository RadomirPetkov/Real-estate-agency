const { getLastThree } = require("../services/houseService")

const homeController = async (req, res) => {
const lastThreeHouses = await getLastThree()

res.render("./home", {lastThreeHouses})
}
module.exports = homeController

