/*
================================
If you're having issues with this part, make sure you have the correct ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET values in your .env file.
================================
*/

let refreshTokens = []

const jwt = require("jsonwebtoken")

const generateToken = user => {
    const token = jwt.sign(
        {
            name: user.name,
            password: user.password
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
    )
    return token
}

const refreshToken = user => {
    return jwt.sign(
        {
            name: user.name,
            password: user.password
        },
        process.env.REFRESH_TOKEN_SECRET
        )
}

const verifyToken = token => {
    const verifiedUser = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) => {
            if (err) return null
            else return user
        }
    )
    return verifiedUser
}

const verifyRefreshToken = refreshToken => {
    const newToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
            if (err) return null
            else {
                const u = {name: user.name, password: user.password}
                return generateToken(u)
            }
        }
    )
    return newToken
}

const deleteRefreshToken = refreshToken => {
    refreshTokens = refreshTokens.filter(token => token !== refreshToken)
}

module.exports = { generateToken, verifyToken, verifyRefreshToken, refreshToken, refreshTokens, deleteRefreshToken }