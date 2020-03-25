/*
================================
If you're having issues with this part, make sure you have the correct ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET values in your .env file.
================================
*/

const jwt = require("jsonwebtoken")

const generateToken = user => {
    const token = jwt.sign(
        {
            name: user.name,
            password: user.password
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
    )
    return token
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

module.exports = { generateToken, verifyToken }