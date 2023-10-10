import style from './header.module.scss'
import React from "react";
import {Time} from "@/components/header/time/Time.tsx";
import {useAppCustomDispatch} from "@/state/state.ts";
import {logOutTC} from "@/state/reducers/auth-reducer.ts";

export const Header = React.memo(() => {
    const dispatch = useAppCustomDispatch()
    const logautHandler = () => dispatch(logOutTC())
    return (
        <header className={style.wrapper}>
            <Time/>
            <span className={style.emptyBox}></span>
            <span className={style.logout} onClick={logautHandler}>Log out</span>
        </header>
    )
})

