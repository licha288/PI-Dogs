import { CLOSE_MODAL, OPEN_MODAL, LOAD_API_RAZAS, LOAD_ORIGINAL_API_RAZAS, LOAD_DB_RAZAS, 
    OPEN_VENTANA, CLOSE_VENTANA, GET_TEMPERAMENTS, ORDER_API_DOGS, ORDER_DB_DOGS, SAVE_FORM_TEMPS} from "./actions"


const initialState = {
    apiDogs: [],
    originalApiDogs: [],
    dbDogs: [],
    originalDbDogs: [],
    formTemps: [],
    temperaments: [],
    modal:{
        data: [],
        popup: false
    },
    ventanaEmergente: {
        popup: false,
        id: undefined
    }
}

const rootReducer = ( state = initialState, { type, payload }) => {
    switch(type){
        case OPEN_MODAL:
            return {...state, modal: { data: payload, popup: true }}
        case CLOSE_MODAL:
            return {...state, modal: { data: [], popup: false }}
        case LOAD_API_RAZAS:
            return {...state, apiDogs: payload}
        case LOAD_ORIGINAL_API_RAZAS:
            return {...state, originalApiDogs: payload}
        case LOAD_DB_RAZAS:
            return {...state, dbDogs: payload}
        case OPEN_VENTANA:
            return {...state, ventanaEmergente: payload}
        case CLOSE_VENTANA:
            return {...state, ventanaEmergente: payload}
        case GET_TEMPERAMENTS:
            return {...state, temperaments: payload}
        case ORDER_API_DOGS:
            return {...state, apiDogs: payload}
        case ORDER_DB_DOGS:
            return {...state, dbDogs: payload}
        case SAVE_FORM_TEMPS:
            return {...state, formTemps: payload}
        default:
            return state
    }
}

export default rootReducer