import s from "./Home.module.css"
import { useSelector } from "react-redux"


import Nav from "../Nav/Nav"
import ApiCards from "../ApiCards/ApiCards"
import Ventana from "../VentanaEmergente/Ventana"
import MyDogs from "../MyDogs/MyDogs"


export default function Home(){

    const ventanaPopup = useSelector(state=>state.ventanaEmergente.popup)

    return (
        <div className={s.container}>
            { ventanaPopup && <Ventana/>}
            <Nav/>
            <section className={s.cards}>
                <MyDogs/>
                <ApiCards/>
            </section>
        </div>
    )
}