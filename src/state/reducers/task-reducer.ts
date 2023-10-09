import {TasksForTodolists} from "@/App.tsx";
import {addTodolistAC, removeTodolistAC, SetTodolistsType} from "@/state/reducers/todolist-reducer.ts";
import {taskApi, TaskFromBack, UpdateTaskType} from "@/api/mainApi.ts";
import {Dispatch} from "redux";
import {AppStateType} from "@/state/state.ts";
import {appErrorAC, appStatusAC, AppStatusType} from "@/state/reducers/app-reducer.ts";
import {handleAppError} from "@/utils/handleAppError.ts";
import {handleServerError} from "@/utils/handleServerError.ts";

const initialState: TasksForTodolists = {}

// types for action
type SetTasksType = {
    type: 'SET-TASKS'
    tasks: TaskFromBack[]
    todoId: string
}
type AddTaskType = {
    type: 'ADD-TASK'
    task: TaskFromBack
}

type RemoveTaskType = {
    type: 'REMOVE-TASK'
    todoId: string
    taskId: string
}
//
// type ChangeTaskTitleType = {
//     type: 'CHANGE-TASK-TITLE'
//     todoId: string
//     taskId: string
//     newTitle: string
// }
//
// type ChangeTaskStatusType = {
//     type: 'CHANGE-TASK-STATUS'
//     todoId: string
//     taskId: string
//     newValue: boolean
// }

type ActionsType =
    AddTaskType
    | RemoveTaskType
    // | ChangeTaskTitleType
    // | ChangeTaskStatusType
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | SetTodolistsType
    | SetTasksType
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof updateTaskStatusAC>
export const taskReducer = (state = initialState, action: ActionsType): TasksForTodolists => {
    switch (action.type) {
        case "SET-TODOLISTS":
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState

        case "SET-TASKS":
            return {...state, [action.todoId]: action.tasks.map(el => ({...el, statusTask: "idle"}))}

        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, statusTask: "idle"}, ...state[action.task.todoListId]]
            }

        case 'REMOVE-TASK':
            return {...state, [action.todoId]: state[action.todoId].filter(el => el.id !== action.taskId)}

        // case 'CHANGE-TASK-TITLE':
        //     return {
        //         ...state,
        //         [action.todoId]: state[action.todoId].map(el => el.id === action.taskId ? {
        //             ...el,
        //             title: action.newTitle
        //         } : el)
        //     }
        //
        // case 'CHANGE-TASK-STATUS':
        //     return {
        //         ...state,
        //         [action.todoId]: state[action.todoId].map(el => el.id === action.taskId ? {
        //             ...el,
        //             isDone: action.newValue
        //         } : el)
        //     }

        case 'UPDATE-TASK':
            console.log('update-task')
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }

        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}

        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.todoId]
            return copyState
        }
        case "UPDATE-TASK-STATUS":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, statusTask: action.status} : t)
            }

        default:
            return state
    }
}


// action creators

export const setTasksAC = (todoId: string, tasks: TaskFromBack[]) => {
    return {type: 'SET-TASKS', tasks, todoId} as const
}

export const addTaskAC = (task: TaskFromBack) => {
    return {type: 'ADD-TASK', task} as const
}

export const removeTaskAC = (todoId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todoId, taskId} as const
}

// export const changeTaskTitleAC = (todoId: string, taskId: string, newTitle: string) => {
//     return {type: 'CHANGE-TASK-TITLE', todoId, taskId, newTitle} as const
// }
//
// export const changeTaskStatusAC = (todoId: string, taskId: string, newValue: boolean) => {
//     return {type: 'CHANGE-TASK-STATUS', todoId, taskId, newValue} as const
// }

export const updateTaskAC = (taskId: string, model: UpdateTaskType, todolistId: string) => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId} as const
}

export const updateTaskStatusAC = (todolistId: string, taskId: string, status: AppStatusType) => {
    return {type: 'UPDATE-TASK-STATUS', todolistId, taskId, status} as const
}

// Thunks

export const getTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(appStatusAC("loading"))
    taskApi.getTasks(todoId)
        .then(res => {
            dispatch(appStatusAC("idle"))
            dispatch(setTasksAC(todoId, res.data.items))
        })
        .catch(err => {
            handleServerError(err, dispatch)
        })
}

export const addTasksTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(appStatusAC("loading"))
    taskApi.addTask(todoId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(appStatusAC("idle"))
                dispatch(addTaskAC(res.data.data.item))
            } else {
                handleAppError(res.data, dispatch)
            }

        })
        .catch(err => {
            handleServerError(err, dispatch)
        })
}

export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(appStatusAC("loading"))
    dispatch(updateTaskStatusAC(todoId, taskId, "loading"))
    taskApi.removeTask(todoId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(appStatusAC("idle"))
                dispatch(removeTaskAC(todoId, taskId))
            } else {
                handleAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            dispatch(updateTaskStatusAC(todoId, taskId, "failed"))
            handleServerError(err, dispatch)
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateTaskType, todolistId: string) =>
    (dispatch: ThunkDispatch, getState: () => AppStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        dispatch(appStatusAC("loading"))
        taskApi.updateTask(taskId, apiModel, todolistId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                    dispatch(appStatusAC("idle"))
                } else {
                    handleAppError(res.data, dispatch)
                }
            })
            .catch(err => {
                handleServerError(err, dispatch)
            })
    }

type ThunkDispatch = Dispatch<ActionsType | ReturnType<typeof appStatusAC> | ReturnType<typeof appErrorAC>>