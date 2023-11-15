const { Dog, Temperament } = require("../db")
const { v4: uuidV4 } = require("uuid")

async function postDog({ pedigree, name, image, temperaments, height, weight, life_span }){

  if ( pedigree, name, image, temperaments, height, weight, life_span){
    const existingDog = await Dog.findOne({
        where: { name }
      });
    
    if (existingDog) {
      return ('Este perro ya fue creado anteriormente!');
    }

    const temperamentIds = await Promise.all(
      temperaments.map(async (temperament) => {
        const [existingTemperament] = await Temperament.findOrCreate({
          where: { name: temperament },
        });
        return existingTemperament.id;
      })
    );

    const newDog = await Dog.create({ 
      id: uuidV4(), 
      pedigree,
      name, 
      image, 
      height, 
      weight, 
      life_span 
    })

    await newDog.addTemperaments(temperamentIds)

    return newDog
  }
  return "No llegó la informacion suficiente"
}

module.exports = postDog