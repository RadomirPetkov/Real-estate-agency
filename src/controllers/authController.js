const authController = require(`express`).Router()
const authService = require(`../services/authService`)
const { isUser, isGuest } = require(`../middlewares/authMiddleware`)


authController.get(`/register`, isGuest, (req, res) => {

    res.render("auth/register")
})

authController.post(`/register`, async (req, res) => {
    const { name, username, password, repeatPassword } = req.body
    const [firstname, lastname] = name.split(` `)
    if (!firstname || !lastname) {
        return res.render(`auth/register`, { error:"Your full name is incorect"})
    }

    if (password !== repeatPassword) {
        return res.render(`auth/register`, { error: "Password doesnt match" })
    }
    try {
        const user = await authService.register(name, username, password)
        res.render(`home`)
    } catch (error) {
        res.render(`auth/register`, { error })
    }


})

authController.get(`/login`, isGuest, (req, res) => {

    res.render("auth/login")
})

authController.post(`/login`, isGuest, async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        if (user) {
            res.cookie(`session`, user)
            res.redirect(`/`)
        }
    } catch (error) {
        res.render(`auth/login`, { error })
    }

})

authController.get(`/logout`, isUser, (req, res) => {
    res.clearCookie(`session`)
    res.redirect(`/`)
})


module.exports = authController

