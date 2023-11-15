import s from "./Nav.module.css"
import SearchBar from "../SearchBar/SearchBar"


export default function Nav(){

    return (
        <div className={s.div}>
            <SearchBar />
        </div>
    )
}