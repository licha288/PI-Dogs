const getDogs = require("./getDogs/getDogsAPI")

async function getId(id) {
    try {
        const response = await getDogs()
        let razaEncontrada = response.find(e => e.id === id)
        return razaEncontrada
    } catch (error) {
        return error
    }
}

module.exports = getId