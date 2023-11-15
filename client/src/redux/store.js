import {createStore, applyMiddleware, compose} from "redux"
import rootReducer from "./reducer"
import thunkMiddelware from "redux-thunk"

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunkMiddelware)))

export default store