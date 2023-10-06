import React, {useEffect, useState} from "react";
import style from "./time.module.scss";

export const Time = React.memo(() => {
    const [data, setData] = useState(new Date())

    useEffect(() => {
        setTimeout(() => {
            setData(new Date())
        }, 1000)
    }, [data])

    const finalDate = data.toLocaleDateString('ru-Ru')
    const finalTime = `${('0' + data.getHours()).slice(-2)}:${('0' + data.getMinutes()).slice(-2)}:${('0' + data.getSeconds()).slice(-2)}`


    return <>
        <span className={style.date}>{finalDate}</span>
        <span className={style.time}>{finalTime}</span>
    </>
})