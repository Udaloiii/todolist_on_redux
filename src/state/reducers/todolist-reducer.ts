import {FiltersType, TodolistsType} from "@/App.tsx";
import {todolistApi, TodolistsFromBack} from "@/api/mainApi.ts";
import {Dispatch} from "redux";
import {appStatusAC, AppStatusType} from "@/state/reducers/app-reducer.ts";
import {handleAppError} from "@/utils/handleAppError.ts";
import {handleServerError} from "@/utils/handleServerError.ts";

const initialState: TodolistsType[] = []

// types for actions type
type AddTodolistType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistsFromBack
}
type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST'
    todoId: string
}
type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoId: string
    newTitle: string
}
type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todoId: string
    newValue: FiltersType
}

export type SetTodolistsType = {
    type: 'SET-TODOLISTS'
    todolists: TodolistsFromBack[]
}


type ActionsType =
    AddTodolistType
    | RemoveTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType
    | SetTodolistsType
    | ReturnType<typeof changeTodolistStatusAC>
export const todolistReducer = (state = initialState, action: ActionsType): TodolistsType[] => {
    switch (action.type) {

        case "SET-TODOLISTS":
            let copyState = action.todolists
            return copyState.map(el => ({...el, filter: "all", todolistStatus: "idle"}))

        case "ADD-TODOLIST":
            let newTodolist: TodolistsType = {...action.todolist, filter: "all", todolistStatus: "idle"}
            return [newTodolist, ...state]

        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.todoId)

        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.todoId ? {...el, title: action.newTitle} : el)

        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.todoId ? {...el, filter: action.newValue} : el)

        case "CHANGE-TODOLIST-STATUS":
            return state.map(el => el.id === action.todoId ? {...el, todolistStatus: action.status} : el)

        default:
            return state
    }
}

// Action Creators
export const setTodolistsAC = (todolists: TodolistsFromBack[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}
export const addTodolistAC = (todolist: TodolistsFromBack) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const removeTodolistAC = (todoId: string) => {
    return {type: 'REMOVE-TODOLIST', todoId} as const
}
export const changeTodolistTitleAC = (todoId: string, newTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoId, newTitle} as const
}
export const changeTodolistFilterAC = (todoId: string, newValue: FiltersType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todoId, newValue} as const
}

export const changeTodolistStatusAC = (todoId: string, status: AppStatusType) => {
    return {type: 'CHANGE-TODOLIST-STATUS', todoId, status} as const
}


// Thunks

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(appStatusAC("loading"))
    todolistApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(appStatusAC("idle"))
        })
        .catch(err => {
            handleServerError(err, dispatch)
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(appStatusAC("loading"))
    todolistApi.addTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(appStatusAC("idle"))
                dispatch(addTodolistAC(res.data.data.item))
            } else {
                handleAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerError(err, dispatch)
        })
}
export const removeTodolistTC = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(appStatusAC("loading"))
    dispatch(changeTodolistStatusAC(todoId, "loading"))
    todolistApi.removeTodolist(todoId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(appStatusAC("succeeded"))
                dispatch(removeTodolistAC(todoId))
            } else {
                handleAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            dispatch(changeTodolistStatusAC(todoId, "failed"))
            handleServerError(err, dispatch)
        })
}
export const changeTodolistTitleTC = (todoId: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(appStatusAC("loading"))
    todolistApi.changeTodolistTitle(todoId, newTitle)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(appStatusAC("idle"))
                dispatch(changeTodolistTitleAC(todoId, newTitle))
            } else {
                handleAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerError(err, dispatch)
        })
}