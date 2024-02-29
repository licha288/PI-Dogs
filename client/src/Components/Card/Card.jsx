import s from "./Card.module.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { openVentana } from "../../redux/actions"
import Pagination from "../Pagination/Pagination"

export default function Card({id, img, name, temperaments, height, weight, life_span, aux}){

    const [ currentPage, setCurrentPage] = useState(1)
    // const [ showTemps, setShowTemps] = useState(false)
    const dispatch = useDispatch()

    const handleVentana = (id) => {
        dispatch(openVentana(id))
    }
    function handlePageChange(newPage) {
        setCurrentPage(newPage)
    }

    return (
        <div>
            {aux === "Cards" ? (
                <div className={s.div}>
                    <img className={s.img} src={img} alt={name} onClick={() => {
                            handleVentana(id)
                        }}
                    />
                    <h1 
                        className={s.nombre} 
                        onClick={() => {
                            handleVentana(id)
                        }}>
                        {name} 
                    </h1>
                    <ul className={s.tempList}>
                        {temperaments.map((temp, i) => (
                            <li className={s.temp} key={i}>{temp}</li>    
                        ))}
                    </ul>
                    <div>
                        <h2 className={s.peso} onClick={() => {
                                handleVentana(id)
                            }}>
                            Peso: "{weight}"
                        </h2>
                    </div>
                    
                </div>
            ): (
                <div className={s.div}>
                    {currentPage === 1 ? (
                        <div>
                            <h1 className={s.nombre}>{name}</h1>
                            <h3 className={s.nombre}>{id}</h3>
                            <img className={s.img} src={img} alt={name} />
                        </div>
                    ): (
                        <div className={s.div}>
                            <select name="" id="">
                                <option value="">{temperaments}</option>
                            </select>
                            <h2 className={s.peso}>Peso: "{weight}"</h2>
                            <h2 className={s.peso}>Altura: "{height}"</h2>
                            <h2 className={s.peso}>Life Time: "{life_span}"</h2>
                        </div>
                    )}
                    <Pagination 
                        totalPages={2} 
                        currentPage={currentPage} 
                        handlePageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    )
}