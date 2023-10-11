import style from './errorPage.module.scss'
import {useSelector} from "react-redux";
import {AppStateType} from "@/state/state.ts";
import {Navigate, NavLink} from "react-router-dom";

export const ErrorPage = () => {
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    if(!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }
    return <div className={style.wrapper}>
    <NavLink  to={"/"} className={style.link}>Go to homepage</NavLink>
    </div>
}