const getDogsAPI = require("../controllers/getDogs/getDogsAPI")
const getDogsDB = require("../controllers/getDogs/getDogsDB")

async function getDogsHandler(req, res) {
    try { 
        const apiDogs = await getDogsAPI()
        const dbDogs = await getDogsDB()

        return res.status(200).json({apiDogs, dbDogs})
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

module.exports = getDogsHandler