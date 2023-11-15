import s from "./Form.module.css"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createDog } from "../../Utils/api";
import { loadDbRazas, closeVentana } from "../../redux/actions";

import Temps from "../Filtros/Temps/Temps"

export default function Form(){

    const formTemps = useSelector(state=>state.formTemps)

    const [errors, setErrors] = useState({
        name: "",
        img: "",
        height: "",
        temperaments: "",
        weight: "",
        life_span: "",
    })
    const [dogData, setDogData] = useState({
      name: "",
      img: "",
      height: "",
      temperaments: [],
      weight: "",
      life_span: "",
    })

    const dispatch = useDispatch()

    function handleSubmit(e) {
        e.preventDefault()

        const data = {
            name: dogData.name.toLowerCase(),
            image: dogData.img,
            height: dogData.height,
            weight: dogData.weight,
            life_span: dogData.life_span,
            temperaments: formTemps
        }

        loadDbRazas(createDog(data))
        dispatch(closeVentana())
    }

    function handleChange(e){
        const { name, value } = e.target 
        setDogData({...dogData, [name]: value,})
        validate({ ...dogData, [name]: value })
    }

    const validate = (dogData) => {

        // name validations
        if ( dogData.name === "" ) setErrors((prevErrors) => ({ ...prevErrors, name: "No debe estar vacio" }))
        if( dogData.name.length < 2 ) setErrors((prevErrors) => ({ ...prevErrors, name: "Debe ser mayor a 2 caracteres" }))
        else setErrors((prevErrors) => ({ ...prevErrors, name: "✔" }));

        // image validation
        if ( dogData.img === "" ) setErrors((prevErrors) => ({ ...prevErrors, img: "No debe estar vacio" }))
        else setErrors((prevErrors) => ({ ...prevErrors, img: "✔" }));

        // height validation
        if ( typeof dogData.height !== "number" ) setErrors((prevErrors) => ({ ...prevErrors, height: "Debe ser un número" }))
        if ( dogData.height <= 0 ) setErrors((prevErrors) => ({ ...prevErrors, height: "Debe ser mayor a 0" }))
        else setErrors((prevErrors) => ({ ...prevErrors, height: "✔" }));

        // weight validation
        if ( typeof dogData.weight !== "number" ) setErrors((prevErrors) => ({ ...prevErrors, weight: "Debe ser un número" }))
        if ( dogData.weight <= 0 ) setErrors((prevErrors) => ({ ...prevErrors, weight: "Debe ser mayor a 0" }))
        else setErrors((prevErrors) => ({ ...prevErrors, weight: "✔" }));

        // life_span validation
        if ( typeof dogData.life_span !== "number" ) setErrors((prevErrors) => ({ ...prevErrors, life_span: "Debe ser un número" }))
        if ( dogData.life_span <= 0 && dogData.life_span < 80 ) setErrors((prevErrors) => ({ ...prevErrors, life_span: "Debe ser mayor a 0 y menor de 80" }))
        else setErrors((prevErrors) => ({ ...prevErrors, life_span: "✔" }));
    
        // temperaments validation
        if ( dogData.temperaments.length === 0 ) setErrors((prevErrors) => ({ ...prevErrors, temperaments: "Incluir al menos 1 temperamento" }))
        else setErrors((prevErrors) => ({ ...prevErrors, temperaments: "✔" }));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className={s.label}>Nombre</label>
                <input className={s.input}
                    type="text" 
                    name="name" 
                    value={dogData.name}
                    onChange={handleChange}
                />
                <p className={errors.name === "✔" ? s.confirm : s.error}>{errors.name}</p>
            </div>
            <div>
                <label className={s.label}>Imagen</label>
                <input className={s.input}
                    type="text" 
                    name="img"
                    value={dogData.img}
                    onChange={handleChange}
                />
                <p className={s.p}>{errors.img}</p>
            </div>
            <div>
                <label className={s.label}>Altura promedio</label>
                <input className={s.input}
                    type="number" 
                    name="height" 
                    value={dogData.height}
                    onChange={handleChange}
                />
                <label className={s.label}>Cm</label>
                <p className={s.p}>{errors.height}</p>
            </div>
            <div>
                <label className={s.label}>Peso promedio</label>
                <input className={s.input}
                    type="number" 
                    name="weight" 
                    value={dogData.weight}
                    onChange={handleChange}
                />
                <label className={s.label}>Kg</label>
                <p className={s.p}>{errors.weight}</p>
            </div>
            <div>
                <label className={s.label}>Promedio de vida:</label>
                <input className={s.input}
                    type="number" 
                    name="life_span" 
                    value={dogData.life_span}
                    onChange={handleChange}
                />
                <label className={s.label}>Años</label>
                <p className={s.p}>{errors.life_span}</p>
            </div>
            <Temps aux={"form"}/>
            <button type="submit">Crear</button>
        </form>
    )
}