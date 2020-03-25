const bcrypt = require("bcryptjs")

const hash = async password => {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(salt)
    console.log(hashedPassword)
    return hashedPassword
}

module.exports = { hash }