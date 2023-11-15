const getDogsAPI = require("../controllers/getDogs/getDogsAPI")
const { Temperament } = require("../db")

async function saveTemperaments() {
    try {
        const razas = await getDogsAPI()
        const temperamentos = razas.map( raza => raza.temperament )
                                .filter( t => t !== null)
                                .join(", ").split(", ")
        const noRepeatTemp = [ ...new Set(temperamentos)]
        
        for (const nombre of noRepeatTemp) {
            await Temperament.findOrCreate({
                where: { name: nombre },
                defaults: { name: nombre }
            });
        }
        return "Temperamentos guardados con éxito"
        
    } catch (error) {
        return error
    }
}


async function getTemperaments() {
    const allTemperaments = await Temperament.findAll()
    const temps = allTemperaments.map(temp => temp.name)
    return temps;
}

module.exports = {
    saveTemperaments,
    getTemperaments
}