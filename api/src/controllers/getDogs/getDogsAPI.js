require("dotenv").config()
const { API_KEY, URL_DOGS } = process.env
const axios = require("axios")

async function getDogsAPI() {
    try {
        const response = await axios(`${URL_DOGS}${API_KEY}`) 
        const { data } = response
        return data
    } catch (error) {
        return error
    }
}


module.exports = getDogsAPI