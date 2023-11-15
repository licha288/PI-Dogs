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
        <div className={openFilters ? s.containerOpen : s.containerClose}>
            <button className={s.button} onClick={() => setOpenFilters(!openFilters)}>
                ☰
            </button>
            {openFilters && 
                <div className={s.filterContainer}>
                    <button onClick={() => {
                        dispatch(aux === "api" ? loadApiRazas(originalApiDogs) : dispatch(loadDbRazas(originalDbDogs)))
                    }}>Restablecer</button>
                    <Temps aux={aux}/>
                    <Alfabetic aux={aux}/>
                </div>
            }
        </div>
    )
} 