import style from './snackbar.module.scss'
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {AppStateType, useAppCustomDispatch} from "@/state/state.ts";
import {appErrorAC, AppErrorType} from "@/state/reducers/app-reducer.ts";


export const Snackbar = () => {
    const error = useSelector<AppStateType, AppErrorType>(state => state.app.error)
    const dispatch = useAppCustomDispatch()

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(appErrorAC(null))
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const onClickHandler = () => {
        dispatch(appErrorAC(null))
    }

    return (
        error ?
        <div className={style.wrapper}>
            {error}
            <button onClick={onClickHandler}>x</button>
        </div>
            : <div style={{display: "none"}}></div>
    )
}
