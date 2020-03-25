const bcrypt = require("bcryptjs")

const hash = async password => {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

const passwordCompare = async (password, hashedPassword) => {
    bcrypt.compare(password, hashedPassword, (err, result) => {
        if (err) return null
        if (result) return true
        else return false
    })
}

module.exports = { hash, passwordCompare }