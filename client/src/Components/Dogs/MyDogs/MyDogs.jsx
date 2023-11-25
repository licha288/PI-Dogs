import s from "./MyDogs.module.css"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";

import Card from "../../Card/Card";
import Pagination from "../../Pagination/Pagination";
import { loadDbRazas, openVentana } from "../../../redux/actions"
import { getRazas } from "../../../Utils/api";

export default function MyDogs(){

    const [ currentPage, setCurrentPage] =  useState(1)
    const dbDogs = useSelector(state=>state.dbDogs)
    const dispatch = useDispatch()

    useEffect(() => {
        async function axiosRazas(){
            const razas = await getRazas();
            const dbDogs = razas.dbDogs
            if (Array.isArray(dbDogs)) {
                dispatch(loadDbRazas(dbDogs));
            }
        }    
        axiosRazas();
    }, []);

    function handleCreateButton(){
        dispatch(openVentana(undefined))
    }

    function handlePageChange(newPage) {
        setCurrentPage(newPage)
    }

    const cardsPerPage = 3;
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const cardsToShow = dbDogs.slice(startIndex, endIndex);

    console.log("a ver -->", cardsToShow[0])
    return (
        <div className={s.div}>
            { 
            dbDogs.length > 0 ? 
            (
              <>
                <button onClick={() => {
                    handleCreateButton()
                }}>+</button>
                {cardsToShow.map(({id, image, name, Temperaments, weight})=> ( 
                    <Card  
                      key={id}
                      id={id}
                      img={image ? image.url || image : (<img src="../../perro.jpg"/>)}
                      name={name}
                      temperaments={Temperaments}
                      weight={weight}
                      aux="Cards"
                    />
                ))}
                <Pagination 
                    totalPages={Math.ceil(dbDogs.length / cardsPerPage)}
                    currentPage={currentPage} 
                    handlePageChange={handlePageChange}
                />
              </>
            ) : (
                <>
                    <h1 className={s.message}>No tienes ninguna raza creada!</h1>
                    <button onClick={() => {
                        handleCreateButton()
                    }}>+ Crear raza</button>
                </>
            )
            }
        </div>
    )
}