
import { useDispatch, useSelector } from "react-redux"
import s from "./Ventana.module.css"

import { closeVentana } from "../../redux/actions"
import Detail from "../Detail/Detail"
import Form from "../Form/Form"

export default function Ventana() {
    
    const dispatch = useDispatch()
    const ventanaEmergente = useSelector(state=>state.ventanaEmergente)

    const handleClosePopup = () => {
        dispatch(closeVentana())
    }

    return (
        <div className={s.fondo}>
            <div className={s.div}>
                <button className={s.button} onClick={handleClosePopup}>x</button>
                {(ventanaEmergente.popup && 
                    ventanaEmergente.id === undefined) 
                    ? <Form/> 
                    : <Detail id={ventanaEmergente.id}/> 
                }
            </div>
        </div>
    )
}