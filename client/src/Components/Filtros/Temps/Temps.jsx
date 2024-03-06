import s from "./Temps.module.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getTemps, saveTemperaments } from "../../../Utils/api"
import { getTemperaments, loadApiRazas, loadDbRazas, saveFormTemps, loadTempsChoiced, daleteTempsChoiced } from "../../../redux/actions"


export default function Temps({ aux }){

    const [ filterOpen, setFilterOpen ] = useState(false)

    const temperaments = useSelector(state => state.temperaments)
    const tempsChoiced = useSelector(state => state.tempsChoiced)
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
            dispatch(loadTempsChoiced(temp))
        }
    }

    function deleteTemp(temp){
        if (tempsChoiced.includes(temp)) {
          dispatch(daleteTempsChoiced(temp))
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
        console.log(tempsChoiced)
    }

  return (
        <div className={s.container}>
            <div className={s.openFilter}
              onClick={() => {setFilterOpen(!filterOpen)}}>
              Temperaments
            </div>
            {tempsChoiced.length > 0 && filterOpen === false &&
                <ul className={s.showSelectedTemps}>
                    {tempsChoiced.map((temp, i) => (
                        <li  key={i} className={s.showTemps}>
                            {temp}
                        </li>
                    ))}
                </ul>}
            { (aux === "form" && !filterOpen) && 
                  <ul className={s.ul}>
                      {tempsChoiced.map((temp, i) => (
                          <li className={s.selectedTemp} key={i}>
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
                {
                  filterOpen &&
                  <div className={s.tituloButton}>
                    <h5 className={s.aviso}>Selecciona temperamentos para filtrar</h5>
                    <button className={s.Xbutton} 
                            onClick={() => {setFilterOpen(!filterOpen)}}>
                    x</button>
                  </div>
                }
              
                {(
                  tempsChoiced.length === 0 && filterOpen) && (
                      <div className={s.selectedTemps}>
                          <h1 className={s.h1}>Aqui se mostraran los temperamentos elegidos!</h1>
                      </div>
                )}

                {(tempsChoiced.length > 0 && filterOpen) && (
                  <div className={s.selectedTemps}>
                    <h2 className={s.subtitulo}>Seleccionados:</h2>
                    <ul className={s.ul}>
                      {tempsChoiced.map((temp) => (
                        <li className={s.selectedTemp} key={temp}>
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
                    <button className={s.filtrar} onClick={() => {
                                                              handleFilter(aux)
                                                              setFilterOpen(false)
                                                            }}>
                      {aux === "api" && "Filtrar"}
                      {aux === "form" && "Elegir"}
                    </button>
                  </div>
                )}
                {filterOpen && (
                  <div className={s.tempFilter}>
                    <h2 className={s.subtitulo}>Temperamentos:</h2>
                    {temperaments.map((temp, i) => (
                      <div
                        key={i}
                        className={s.normalTemp}
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