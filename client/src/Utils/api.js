import axios from "axios"

export async function getRazas(){
    try {
        const response = await axios("http://localhost:3001/dogs")
        const { data } = response 
        return data
    } catch (error) {
        return error
    }
}

export async function getRazaByName(name){
    try {
        const response = await axios(`http://localhost:3001/dogs/name/${name}`)
        const { data } = response 
        return data
    } catch (error) {
        return error.response.data
    }
}

export async function getRazaById(id){
    try {
        const response = await axios(`http://localhost:3001/dogs/id/${id}`)
        const { data } = response 
        return data
    } catch (error) {
        return error
    }
}

export async function saveTemperaments(){
    try {
        const response = await axios(`http://localhost:3001/temperament/save`)
        const { data } = response
        return data
    } catch (error) {
        return error
    }
}

export async function getTemps(){
    try {
        const response = await axios(`http://localhost:3001/temperament/get`)
        const { data } = response 
        return data
    } catch (error) {
        return error
    }
}

export async function createDog(info){
    try {
        const response = await axios.post("http://localhost:3001/dogs/create", info)
        const { data } = response
        return data
    } catch (error) {
        return error.message
    }
}
