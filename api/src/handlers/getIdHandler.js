const getId = require("../controllers/getId")

async function getIdHandler(req, res) {
    try {
        const { id } = req.params
        const data = await getId(parseInt(id))
        return res.status(200).json(data)
    } catch (error) {   
        return res.status(404).send("No existe personaje con ese ID")
    }
}

module.exports = getIdHandler