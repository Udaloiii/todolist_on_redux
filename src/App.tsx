import './App.css'
import {Header} from "@/components/header/Header.tsx";
import {useSelector} from "react-redux";
import {AppStateType, useAppCustomDispatch} from "@/state/state.ts";
import {useEffect} from "react";
import {TaskFromBack, TodolistsFromBack} from "@/api/mainApi.ts";
import {AppStatusType} from "@/state/reducers/app-reducer.ts";
import {NewLoader} from "@/components/newLoader/NewLoader.tsx";
import {Snackbar} from "@/components/snackbar/Snackbar.tsx";
import {Login} from "@/components/login/Login.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistsBox} from "@/components/todolistsBox/TodolistsBox.tsx";
import {authMeTC} from "@/state/reducers/auth-reducer.ts";
import {ErrorPage} from "@/components/errorPage/ErrorPage.tsx";

export type FiltersType = "all" | "active" | "completed"
export type TodolistsType = TodolistsFromBack & {
    filter: FiltersType
    todolistStatus: AppStatusType
}
export type TasksForTodolists = {
    [key: string]: Array<TaskFromBack & { statusTask: AppStatusType }>
}

function App() {
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const isAppInitialized = useSelector<AppStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useAppCustomDispatch()


    useEffect(() => {
        dispatch(authMeTC())
    }, []);

    if (!isAppInitialized) {
    return <div className="wrapperForLoader" style={{margin: "0"}}><NewLoader/></div>
    }
    return (
        <div>

            {isLoggedIn && <Header/>}
            <Snackbar/>
            <Routes>
                <Route path="/" element={<TodolistsBox/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/404" element={<ErrorPage/>}/>
                <Route path={"*"} element={<Navigate to={"/404"}/>}/>
            </Routes>
        </div>
    )
}

export default App
