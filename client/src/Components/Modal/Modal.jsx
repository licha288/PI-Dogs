import s from "./Modal.module.css"
import { useDispatch } from "react-redux"
import { closeModal, openVentana } from "../../redux/actions"

export default function Modal({ array, aux }){
    
    const dispatch = useDispatch()
    const handleVentana = (id) => {
        dispatch(openVentana(id))
    }

    return (
        <div className={s.div}>
            <ul className={s.ul}>
                {array.length > 0 && array.map((e) => (
                    <li 
                        className={s.li} 
                        key={e.id} 
                        onClick={() => {
                            handleVentana(e.id)
                        }}
                        >{e.name}</li>
                ))}
            </ul>
        </div>
    )
}