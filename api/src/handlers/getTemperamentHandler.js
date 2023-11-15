const { saveTemperaments, getTemperaments } = require("../controllers/getTemperament")

const saveTemperamentsHandler = async (req, res)  => {
    try{
        const message = await saveTemperaments()
        res.status(200).send(message)
    }
    catch (error) {
        res.status(400).json(error)
    }
    }
    
    const getTemperamentsHandler = async (req,res) =>{
        try {
            const response = await getTemperaments()
            res.status(200).json(response)
        } catch (error) {
            res.status(400).json({error:error.message})
            
        }
    }

module.exports = { 
    saveTemperamentsHandler,
    getTemperamentsHandler
}