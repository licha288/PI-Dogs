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
        <>
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
                    <h4 className={s.h4}>Temperamentos:</h4>
                    <ul className={s.tempList}>
                        {temperaments.map((temp, i) => (
                            <li className={s.temp} key={i}>{temp}</li>    
                        ))}
                    </ul>
                    <h2 className={s.peso} onClick={() => {
                            handleVentana(id)
                        }}>
                        Peso: "{weight}"
                    </h2>
                    
                </div>
            ): (
                <>
                    {currentPage === 1 ? (
                        <>
                            <img className={s.img} src={img} alt={name} />
                            <h1 className={s.nombre}>{name}</h1>
                            <h3 className={s.id}>{id}</h3>
                            <h4 className={s.h4}>Temperamentos:</h4>
                            <ul className={s.tempList}>
                                {temperaments.map((temp, i) => (
                                    <li className={s.temp} key={i}>{temp}</li>    
                                ))}
                            </ul>
                        </>
                    ): (
                        <>
                            <h3 className={s.info}>Peso (kg): "{weight}"</h3>
                            <h3 className={s.info}>Altura (cm): "{height}"</h3>
                            <h3 className={s.info}>Life Time: "{life_span}"</h3>
                        </>
                    )}
                    <div className={s.pagination}>
                        <Pagination 
                            totalPages={2} 
                            currentPage={currentPage} 
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </>
            )}
        </>
    )
}