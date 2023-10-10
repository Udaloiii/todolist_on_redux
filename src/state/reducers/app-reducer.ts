export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppErrorType = string | null

export type InitialStateType = {
    status: AppStatusType
    error: AppErrorType
    isInitialized: boolean
}
const initialState: InitialStateType = {
    status: 'loading',
    error: null,
    isInitialized: false
}

type ActionType = ReturnType<typeof appStatusAC> | ReturnType<typeof appErrorAC> | ReturnType<typeof appInitializedAC>
export const appReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET-APP-STATUS':
            return {...state, status: action.status}
        case 'SET-APP-ERROR' :
            return {...state, error: action.error}
        case 'SET-APP-INITIALIZED' :
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

// action creators

export const appStatusAC = (status: AppStatusType) => {
    return {type: 'SET-APP-STATUS', status} as const
}

export const appErrorAC = (error: AppErrorType) => {
    return {type: 'SET-APP-ERROR', error} as const
}

export const appInitializedAC = (isInitialized: boolean) => {
    return {type: 'SET-APP-INITIALIZED', isInitialized} as const
}