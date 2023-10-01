import {v1} from "uuid";
import {FiltersType, TodolistsType} from "@/App.tsx";

const initialState: TodolistsType[] = []

// types for actions type
type AddTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
    todoId: string
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


type ActionsType = AddTodolistType | RemoveTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType
export const todolistReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {

        case "ADD-TODOLIST":
            let newTodolist: TodolistsType = {id: v1(), title: action.title, filter: "all"}
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
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todoId: v1()} as const
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