import {TasksForTodolists} from "@/App.tsx";
import {addTodolistAC, removeTodolistAC} from "@/state/reducers/todolist-reducer.ts";
import {TasksType} from "@/components/todolist/Todolist.tsx";
import {v1} from "uuid";

const initialState: TasksForTodolists = {}

// types for action
type AddTaskType = {
    type: 'ADD-TASK'
    todoId: string
    title: string
}

type RemoveTaskType = {
    type: 'REMOVE-TASK'
    todoId: string
    taskId: string
}

type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    todoId: string
    taskId: string
    newTitle: string
}

type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    todoId: string
    taskId: string
    newValue: boolean
}

type ActionsType =
    AddTaskType
    | RemoveTaskType
    | ChangeTaskTitleType
    | ChangeTaskStatusType
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
export const taskReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'ADD-TASK':
            let newTask: TasksType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todoId]: [newTask, ...state[action.todoId]]}

        case 'REMOVE-TASK':
            return {...state, [action.todoId]: state[action.todoId].filter(el => el.id !== action.taskId)}

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.newTitle
                } : el)
            }

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(el => el.id === action.taskId ? {
                    ...el,
                    isDone: action.newValue
                } : el)
            }

        case 'ADD-TODOLIST':
            return {...state, [action.todoId]: []}

        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.todoId]
            return copyState

        default:
            return state
    }
}


// action creators
export const addTaskAC = (todoId: string, title: string) => {
    return {type: 'ADD-TASK', todoId, title} as const
}

export const removeTaskAC = (todoId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todoId, taskId} as const
}

export const changeTaskTitleAC = (todoId: string, taskId: string, newTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE', todoId, taskId, newTitle} as const
}

export const changeTaskStatusAC = (todoId: string, taskId: string, newValue: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', todoId, taskId, newValue} as const
}