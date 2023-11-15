// import s from "./Plantilla.module.css"
import Card from "../Card/Card"
import { getRazaById } from "../../Utils/api"
import { useEffect, useState } from "react"


export default function Detail({ id }){
    const [ raza, setRaza ] = useState(null)

    useEffect(() => {
        async function getRaza(id){
            const info = await getRazaById(id)
            setRaza(info)
        }
        id && getRaza(id)
    }, [id])

    return (
        <div>
            {raza && 
                <Card   
                    id={raza.id}
                    img={raza.image.url}
                    name={raza.name}
                    temperaments={raza.temperament.split(", ")}
                    weight={raza.weight.metric}
                    height={raza.height.metric}
                    life_span={raza.life_span}
                    aux="hola"
                />}
        </div>
    )
}