import s from "./SearchBar.module.css"
import  React  from "react"
import { useDispatch, useSelector } from "react-redux" 
import Modal from "../Modal/Modal"

import { getRazaByName } from "../../Utils/api"
import { closeModal, openModal } from "../../redux/actions"


export default function SearchBar(){
    const [inputValue, setInputValue] = React.useState("")
    const dataModal = useSelector(state=>state.modal.data)
    const popup = useSelector(state=>state.modal.popup)
    const dispatch = useDispatch()

    async function handleChange(e){
        setInputValue(e.target.value)
        try {
            const razas = await getRazaByName(inputValue)
            razas ? dispatch(openModal(razas)) : dispatch(closeModal)
        } catch (error) {
            dispatch(openModal(error))
        }
    }

    // const handleSearch = async () => {
    //     try {
    //         const razas = await getRazaByName(inputValue)
    //         dispatch(openModal(razas))
    //     } catch (error) {
    //         dispatch(openModal(error))
    //     }
    // }
    
    function handleValue() {
        setInputValue("")
        dispatch(closeModal())
    }

    return (
        <div className={s.div}>

            <h1 className={s.h1}>Bienvenido!</h1>

            <section className={s.section}>

                <input className={s.searchBar} type="text" onChange={handleChange} value={inputValue} placeholder={"Buscar raza..."}/>
                { inputValue && <button className={s.clearInput} onClick={handleValue}>x</button>}
                {/* <div className={s.placeholder}>Buscar raza...</div> */}

            </section>
            
            {/* <button className={s.button} onClick={handleSearch}>Buscar</button> */}
            {  !inputValue ? <></> : popup && typeof dataModal === "string" ?
                (<h3 className={s.h3}>No se encontró "{inputValue}"</h3>)
                : (<Modal array={dataModal} aux={"search"}/>) 
            }

        </div>
    )
}