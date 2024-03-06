import s from "./Filtros.module.css"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadApiRazas, loadDbRazas } from "../../redux/actions"

import Temps from "./Temps/Temps";
import Alfabetic from "./Alfabetic/Alfabetic";


export default function Filtros({ aux }) {

    const [ openFilters, setOpenFilters ] = useState(false)
    const originalApiDogs = useSelector(state => state.originalApiDogs)
    const originalDbDogs = useSelector(state => state.originalDbDogs)
    const dispatch = useDispatch()

    return (
        <div className={openFilters && s.fondo}>
            <div className={openFilters ? s.containerOpen : s.containerClose}>
                <button className={openFilters ? s.buttonOpen : s.buttonClose} onClick={() => setOpenFilters(!openFilters)}>
                    { openFilters ? ("X") : ("☰")}
                </button>
                {openFilters && <><h2 className={s.titulo}>Filtros</h2><hr /></>}
                
                {openFilters && 
                    <div className={s.filterContainer}>
                        <button 
                            className={s.reset}
                            onClick={() => {
                                dispatch(aux === "api" ? loadApiRazas(originalApiDogs) : dispatch(loadDbRazas(originalDbDogs)))
                            }}> 
                            Restablecer
                        </button>
                        <Temps aux={aux}/>
                        <Alfabetic aux={aux}/>
                    </div>
                }
            </div>
        </div>
    )
} 