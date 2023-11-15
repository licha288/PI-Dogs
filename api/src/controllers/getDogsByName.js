require("dotenv").config()
const { API_KEY, URL_RAZA } = process.env
const axios = require("axios")

async function getDogNameApi(name) {
    try {

        const response = await axios(`${URL_RAZA}${name}&${API_KEY}`)
        const { data } = response

        
        if(data.length >= 10){
            const dogs = data.slice(0,10)
            return dogs
        }
        
        return data
    } catch (error) {
        return error
    }
}

module.exports = getDogNameApi
