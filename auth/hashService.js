const bcrypt = require("bcryptjs")

const hash = async data => {
    const salt = await bcrypt.genSalt()
    const hashedData = await bcrypt.hash(data, salt)
    return hashedData
}

const dataCompare = async (data, hashedData) => {
    bcrypt.compare(data, hashedData, (err, result) => {
        if (err) return null
        return result
    })
}

module.exports = { hash, dataCompare }