import style from './header.module.scss'
import {useEffect, useState} from "react";

export const Header = () => {
    const [data, setData] = useState(new Date())

    useEffect(() => {
        setTimeout(() => {
            setData(new Date())
        }, 1000)
    }, [data])

    const finalTime = `${('0' + data.getHours()).slice(-2)}:${('0' + data.getMinutes()).slice(-2)}:${('0' + data.getSeconds()).slice(-2)}`
    const finalDate = data.toLocaleDateString('ru-Ru')
    return (
        <header className={style.wrapper}>
            <span className={style.date}>{finalDate}</span>
            <span className={style.time}>{finalTime}</span>
            <span className={style.emptyBox}></span>
            <span className={style.logout}>Log out</span>
        </header>
    );
};