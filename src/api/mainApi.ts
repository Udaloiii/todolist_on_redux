import axios from "axios";
import {FormikValuesType} from "@/components/login/Login.tsx";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'bfb2a9e7-51b4-4737-9da8-c82e19cdd77e'
    }
})

// types from backend

export type TodolistsFromBack = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type MainResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

export type TaskFromBack = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TasksResponse = {
    items: TaskFromBack[]
    totalCount: number
    error: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export type UpdateTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: any
    startDate?: string
    deadline?: string
}


export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistsFromBack[]>('todo-lists')
    },

    addTodolist(title: string) {
        const body = {
            title: title
        }
        return instance.post<MainResponseType<{ item: TodolistsFromBack }>>('todo-lists', body)
    },

    removeTodolist(todolistId: string) {
        return instance.delete<MainResponseType>(`todo-lists/${todolistId}`)
    },

    changeTodolistTitle(todolistId: string, newTitle: string) {
        const body = {
            title: newTitle
        }
        return instance.put<MainResponseType>(`todo-lists/${todolistId}`, body)
    }
}

export const taskApi = {
    getTasks(todolistId: string) {
        return instance.get<TasksResponse>(`todo-lists/${todolistId}/tasks`)
    },

    addTask(todolistId: string, title: string) {
        const body = {
            title: title
        }
        return instance.post<MainResponseType<{ item: TaskFromBack }>>(`todo-lists/${todolistId}/tasks`, body)
    },

    removeTask(todolistId: string, taskId: string) {
        return instance.delete<MainResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    // changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
    //     const body = {
    //         title: newTitle
    //     }
    //     return instance.put<MainResponseType<{ item: TaskFromBack }>>(`todo-lists/${todolistId}/tasks/${taskId}`, body)
    // }
    // ,
    updateTask(taskId: string, domainModel: UpdateTaskType, todolistId: string) {
        return instance.put<MainResponseType<{
            item: TaskFromBack
        }>>(`todo-lists/${todolistId}/tasks/${taskId}`, domainModel)
    }
}

export const authApi = {
    authMe() {
        return instance.get('auth/me')
    },
    logIn(authData: FormikValuesType) {
        return instance.post<MainResponseType<{ userId: number }>>('auth/login', authData)
    },
    logOut() {
        return instance.delete<MainResponseType>('auth/login')
    }
}