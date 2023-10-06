import style from './header.module.scss'
import React from "react";
import {Time} from "@/components/header/time/Time.tsx";

export const Header = React.memo(() => {
    return (
        <header className={style.wrapper}>
            <Time/>
            <span className={style.emptyBox}></span>
            <span className={style.logout}>Log out</span>
        </header>
    )
})

