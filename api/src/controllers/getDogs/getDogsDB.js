const { Dog, Temperament } = require("../../db")

async function getDogsDB() {
    try {
        const dbDogs = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });
        console.log("asdfasdgas --->", dbDogs)
        if(dbDogs.length === 0) return "No hay dogs en la db"
        return dbDogs
    } catch (error) {
        return error
    }
}

module.exports = getDogsDB