const getDogNameApi  = require("../controllers/getDogsByName")

async function getDogNameHandler(req, res) {
    const { name } = req.params
    try {
        const response = await getDogNameApi(name)
        if(response.length === 0) {
            return res.status(404).send("No existe ese perro")
        }
        
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).send(error)
    }
}

module.exports = getDogNameHandler