const jwt = require(`jwt-promisify`)
const { jwtPrivateKey } = require(`../config/commonConst`)

exports.auth = async (req, res, next) => {

    const sessionCookie = req.cookies.session


    if (sessionCookie) {
        user = await jwt.verify(sessionCookie, jwtPrivateKey)

        if (user) {
            req.user = user
            res.locals.isUser = true

        } else {
            res.redirect(`/404`)
        }
    }

    next()

}

exports.isGuest = (req, res, next) => {
    if (req.user) {
        res.redirect(`/404`)
    }
    next()
}

exports.isUser = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.redirect(`/404`)
    }

}