export const OPEN_MODAL = "OPEN_MODAL"
export const CLOSE_MODAL = "CLOSE_MODAL"
export const LOAD_API_RAZAS = "LOAD_API_RAZAS"
export const LOAD_ORIGINAL_API_RAZAS = "LOAD_ORIGINAL_API_RAZAS"
export const LOAD_DB_RAZAS = "LOAD_DB_RAZAS"
export const OPEN_VENTANA = "OPEN_VENTANA"
export const CLOSE_VENTANA = "CLOSE_VENTANA"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const LOAD_TEMPS_CHOICED = "LOAD_TEMPS_CHOICED"
export const DELETE_TEMPS_CHOICED = "DELETE_TEMPS_CHOICED"
export const ORDER_API_DOGS = "ORDER_API_DOGS"
export const ORDER_DB_DOGS = "ORDER_DB_DOGS"
export const SAVE_FORM_TEMPS = "SAVE_FORM_TEMPS"


export function openModal(data){
    return { type: "OPEN_MODAL", payload: data }
}

export function closeModal(){
    return { type: "CLOSE_MODAL" }
}

export function loadApiRazas(data){
    return { type: "LOAD_API_RAZAS", payload: data }
}

export function loadOriginalApiRazas(data){
    return { type: "LOAD_ORIGINAL_API_RAZAS", payload: data }
}

export function loadDbRazas(data){
    return { type: "LOAD_DB_RAZAS", payload: data }
}

export function openVentana(id){
    return { type: "OPEN_VENTANA", payload: {popup: true, id: id} }
}

export function closeVentana(){
    return { type: "CLOSE_VENTANA", payload: {popup: false, id: undefined} }
}

export function getTemperaments(data){
    return { type: "GET_TEMPERAMENTS", payload: data}
}

export function loadTempsChoiced(data){
    return { type: "LOAD_TEMPS_CHOICED", payload: data}
}

export function daleteTempsChoiced(data){
    return { type: "DELETE_TEMPS_CHOICED", payload: data}
}

export function orderApiDogs(data){
    return { type: ORDER_API_DOGS, payload: data }
}

export function orderDbDogs(data){
    return { type: ORDER_DB_DOGS, payload: data }
}

export function saveFormTemps(data){
    return { type: SAVE_FORM_TEMPS, payload: data }
}
