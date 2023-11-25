import s from "./ApiDogs.module.css"
import { useDispatch, useSelector } from "react-redux" 
import { useEffect, useState } from "react";

import Card from "../../Card/Card";
import Pagination from "../../Pagination/Pagination";
import Filtros from "../../Filtros/Filtros";
import { getRazas } from "../../../Utils/api";
import { loadApiRazas, loadOriginalApiRazas } from "../../../redux/actions";


export default function ApiDogs(){
    const [ currentPage, setCurrentPage] =  useState(1)
    const apiDogs = useSelector(state=>state.apiDogs)
    const dispatch = useDispatch()

    useEffect(() => {
        async function axiosRazas(){
            const razas = await getRazas()
            const razasTempsArray = razas.apiDogs.map((raza) => {
              return {...raza, temperament: raza.temperament && raza.temperament.split(", ")}
            })

            dispatch(loadApiRazas(razasTempsArray));
            dispatch(loadOriginalApiRazas(razasTempsArray));
        }
        if (apiDogs.length === 0) axiosRazas();
      }, [apiDogs, dispatch]);

    function handlePageChange(newPage) {
        setCurrentPage(newPage)
    }

    const cardsPerPage = 15;
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const cardsToShow = apiDogs.slice(startIndex, endIndex);

    return (
        <div className={s.div}>
          <Filtros aux={"api"}/>
          { cardsToShow.length > 0 ? 
            (
              <>
                <div className={s.cardDiv}>
                  {cardsToShow.map(({id, image, name, temperament, weight})=> ( 
                    <Card  
                      key={id}
                      id={id}
                      img={image.url}
                      name={name}
                      temperaments={temperament}
                      weight={weight.metric}
                      aux="Cards"
                    />
                  ))}
                </div>
                {apiDogs.length > 15 && 
                  <Pagination 
                    totalPages={Math.ceil(apiDogs.length / cardsPerPage)}
                    currentPage={currentPage} 
                    handlePageChange={handlePageChange}
                  />}
              </>
            )
            : ( <h1 className={s.cargando}>Cargando...</h1> )
          }
        </div>
      )
}