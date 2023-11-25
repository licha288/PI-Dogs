import s from "./Home.module.css"
import { useSelector } from "react-redux"


import Nav from "../Nav/Nav"
import Ventana from "../VentanaEmergente/Ventana"
import ApiDogs from "../Dogs/ApiDogs/ApiDogs"
import MyDogs from "../Dogs/MyDogs/MyDogs"


export default function Home(){

    const ventanaPopup = useSelector(state=>state.ventanaEmergente.popup)

    return (
        <div className={s.container}>
            { ventanaPopup && <Ventana/>}
            <Nav/>
            <section className={s.cards}>
                <MyDogs className={s.flexItem1}/>
                <ApiDogs className={s.flexItem2}/>
            </section>
        </div>
    )
}