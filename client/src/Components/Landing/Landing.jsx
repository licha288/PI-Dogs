import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Landing.module.css"

export default function Landing() {
    return (
        <div className={s.fondo}>
            <div className={s.container}>
                <h1 className={s.titulo}>Bienvenido!</h1>
                <button className={s.button}><NavLink className={s.a} to="/home">Home</NavLink></button>
            </div>
        </div>
    )
}