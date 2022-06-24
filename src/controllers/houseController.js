const houseController = require(`express`).Router()
const { createHouse, getAll } = require(`../services/houseService`)

houseController.get(`/`, async (req, res) => {
    const houses = await getAll().lean()
    res.render(`house/aprt-for-recent`, {houses})
})

houseController.get(`/create`, (req, res) => {
    res.render(`house/create`)
})

houseController.post(`/create`, async (req, res) => {
    try {
        await createHouse(req.body)
        res.redirect(`/houses`)
    } catch (error) {
        res.render(`house/create`, { error })
    }
})

module.exports = houseController