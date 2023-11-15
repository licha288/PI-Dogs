import s from "./Temps.module.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getTemps, saveTemperaments } from "../../../Utils/api"
import { getTemperaments, loadApiRazas, loadDbRazas, saveFormTemps } from "../../../redux/actions"


export default function Temps({ aux }){

    const [ tempsChoiced, setTempsChoiced ] = useState([])
    const [filterOpen, setFilterOpen] = useState(false)

    const temperaments = useSelector(state => state.temperaments)
    const originalApiDogs = useSelector(state => state.originalApiDogs)
    const originalDbDogs = useSelector(state => state.originalDbDogs)
    const dispatch = useDispatch()

    useEffect(() => {
        async function axiosTemps(){

            const message = await saveTemperaments() 
            console.log("mensaje -->", message)
            const temps = await getTemps()
            dispatch(getTemperaments(temps))
            console.log("teemppss --->", temps)
        }

        temperaments.length === 0 && axiosTemps()
    }, [])

    function aggTemp(temp){
        if(!tempsChoiced.includes(temp)){
            setTempsChoiced([...tempsChoiced, temp])
        }
    }

    function deleteTemp(temp){
        if (tempsChoiced.includes(temp)) {
          setTempsChoiced(tempsChoiced.filter((tempChoiced) => tempChoiced !== temp));
        }
    }

    function handleFilter(aux){
        let origen = ""
        if (aux === "api"){
            origen = originalApiDogs
        }
        else if (aux === "db") {
            origen = originalDbDogs
        }
        if(aux === "form"){
            dispatch(saveFormTemps(tempsChoiced))
            setFilterOpen(!filterOpen)
        }
        else {
            const filteredDogs = origen.filter((dog) => {
                return tempsChoiced.some((chosenTemp) => dog.temperament && dog.temperament.includes(chosenTemp));
            })
            if (aux === "api"){
                dispatch(loadApiRazas(filteredDogs))
            }
            else if (aux === "db") {
                dispatch(loadDbRazas(filteredDogs))
            }
        }

    }

  return (
        <div className={s.container}>
            <div className={s.openFilter}
              onClick={() => {
                setFilterOpen(!filterOpen)
              }}
            >
              Temperaments
            </div>
            { (aux === "form" && !filterOpen) && 
                  <ul className={s.ul}>
                    {tempsChoiced.map((temp) => (
                      <li className={s.temp} key={temp}>
                        {temp}
                        <button
                          className={s.deleteTemp}
                          onClick={() => {
                            deleteTemp(temp)
                          }}>
                          x
                        </button>
                      </li>
                    ))}
                  </ul>
                  }   
            <div className={filterOpen && s.tempsContainer}>
              
            {filterOpen && <button className={s.button} onClick={() => {setFilterOpen(!filterOpen)}}>x</button>}
              {(tempsChoiced.length === 0 && filterOpen) && (
                <div className={s.selectedTemps}>
                  <h1 className={s.h1}>Aqui se mostraran los temperamentos elegidos!</h1>
                </div>
              ) }
              {(tempsChoiced.length > 0 && filterOpen) && (
                <div className={s.selectedTemps}>
                  <h2 className={s.subtitulo}>Seleccionados:</h2>
                  <ul className={s.ul}>
                    {tempsChoiced.map((temp) => (
                      <li className={s.temp} key={temp}>
                        {temp}
                        <button
                          className={s.deleteTemp}
                          onClick={() => {
                            deleteTemp(temp)
                          }}>
                          x
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button className={s.filtrar} onClick={() => handleFilter(aux)}>
                    {aux === "api" && "Filtrar"}
                    {aux === "form" && "Elegir"}
                  </button>
                </div>
              )}
              {filterOpen && (
                <div className={s.tempFilter}>
                  <h2 className={s.subtitulo}>Temperamentos:</h2>
                  {temperaments.map((temp) => (
                    <div
                      key={temp}
                      className={tempsChoiced.includes(temp) ? "selected" : ""}
                      onClick={() => {
                        !tempsChoiced.includes(temp) && aggTemp(temp)
                      }}>
                      
                      {temp}
                    
                    </div>
                  ))}
                </div>
              )}
            </div>
      </div>
    )
}