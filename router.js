const router = require("express").Router()
const homeController = require(`./src/controllers/homeController`)
const authController = require(`./src/controllers/authController`)
const houseController = require(`./src/controllers/houseController`)

router.get(`/`, homeController)
router.use(`/auth`, authController)
router.use(`/houses`, houseController)
router.get(`/404`, (req, res)=>{res.render(`404`)})



module.exports = router