import {TasksForTodolists} from "@/App.tsx";
import {addTodolistAC, removeTodolistAC, SetTodolistsType} from "@/state/reducers/todolist-reducer.ts";
import {taskApi, TaskFromBack, UpdateDomainTaskModelType} from "@/api/mainApi.ts";
import {Dispatch} from "redux";
import {AppStateType} from "@/state/state.ts";

const initialState: TasksForTodolists = {}

// types for action
type SetTasksType = {
    type: 'SET-TASKS'
    tasks: TaskFromBack[]
    todoId: string
}
type AddTaskType = {
    type: 'ADD-TASK'
    // todoId: string
    // title: string
    task: TaskFromBack
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
    | SetTodolistsType
    | SetTasksType
    | ReturnType<typeof updateTaskAC>
export const taskReducer = (state = initialState, action: ActionsType): TasksForTodolists => {
    switch (action.type) {
        case "SET-TODOLISTS":
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState

        case "SET-TASKS":
            return {...state, [action.todoId]: action.tasks}

        case 'ADD-TASK':
            // let newTask: TasksType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}

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

        case 'UPDATE-TASK':
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

        default:
            return state
    }
}


// action creators

export const setTasksAC = (todoId: string, tasks: TaskFromBack[]) => {
    return {type: 'SET-TASKS', tasks, todoId} as const
}
// export const addTaskAC = (todoId: string, title: string) => {
//     return {type: 'ADD-TASK', todoId, title} as const
// }
export const addTaskAC = (task: TaskFromBack) => {
    return {type: 'ADD-TASK', task} as const
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

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
    type: 'UPDATE-TASK',
    model,
    todolistId,
    taskId
} as const)

// Thunks

export const getTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    taskApi.getTasks(todoId)
        .then(res => {
            dispatch(setTasksAC(todoId, res.data.items))
        })
}

export const addTasksTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    taskApi.addTask(todoId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
    taskApi.removeTask(todoId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todoId, taskId))
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: ThunkDispatch, getState: () => AppStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }
        console.log(getState().tasks)

        const apiModel: UpdateDomainTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        taskApi.updateTask(taskId, apiModel, todolistId)
            .then(() => {
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
            })
    }

type ThunkDispatch = Dispatch<ActionsType>