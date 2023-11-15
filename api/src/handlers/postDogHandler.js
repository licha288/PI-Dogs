const postDog = require("../controllers/postDog")

async function postDogHandler(req, res){
        const data = req.body
    try {
        const response = await postDog(data)
        return res.status(201).json(response)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = postDogHandler