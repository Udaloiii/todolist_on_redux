import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
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
    status: number
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

    changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        const body = {
            title: newTitle
        }
        return instance.put<MainResponseType<{ item: TaskFromBack }>>(`todo-lists/${todolistId}/tasks/${taskId}`, body)
    }
    ,
    changeTaskStatus(todolistId: string, taskId: string, newValue: boolean) {
        const body = {
            isDone: newValue
        }
        return instance.put<MainResponseType<{ item: TaskFromBack }>>(`todo-lists/${todolistId}/tasks/${taskId}`, body)
    }
}