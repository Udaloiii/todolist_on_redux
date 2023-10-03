import {FiltersType, TodolistsType} from "@/App.tsx";
import {todolistApi, TodolistsFromBack} from "@/api/mainApi.ts";
import {Dispatch} from "redux";

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
export const todolistReducer = (state = initialState, action: ActionsType):TodolistsType[] => {
    switch (action.type) {

        case "SET-TODOLISTS":
            let copyState = action.todolists
            return copyState.map(el => ({...el, filter: "all"}))

        case "ADD-TODOLIST":
            let newTodolist: TodolistsType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state]

        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.todoId)

        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.todoId ? {...el, title: action.newTitle} : el)

        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.todoId ? {...el, filter: action.newValue} : el)

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


// Thunks

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistApi.addTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const removeTodolistTC = (todoId: string) => (dispatch: Dispatch) => {
    todolistApi.removeTodolist(todoId)
        .then(() => {
            dispatch(removeTodolistAC(todoId))
        })
}
export const changeTodolistTitleTC = (todoId: string, newTitle: string) => (dispatch: Dispatch) => {
    todolistApi.changeTodolistTitle(todoId, newTitle)
        .then(() => {
            dispatch(changeTodolistTitleAC(todoId, newTitle))
        })
}