import {Dispatch} from "redux";
import {authApi} from "@/api/mainApi.ts";
import {FormikValuesType} from "@/components/login/Login.tsx";
import {appInitializedAC, appStatusAC} from "@/state/reducers/app-reducer.ts";
import {handleAppError} from "@/utils/handleAppError.ts";
import {handleServerError} from "@/utils/handleServerError.ts";

export type AuthStateType = {
    isLoggedIn: boolean
}
const initialState: AuthStateType = {
    isLoggedIn: false
}

type ActionType = ReturnType<typeof logInAC>
export const authReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'LOG-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

// action creators
export const logInAC = (isLoggedIn: boolean) => {
    return {type: "LOG-IN", isLoggedIn} as const
}

// export const logOutAC = (isLoggedIn: boolean) => {
//     return {type: "LOG-OUT", isLoggedIn} as const
// }

// thunks

export const authMeTC = () => (dispatch: Dispatch) => {
    dispatch(appStatusAC("loading"))
    authApi.authMe()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(appInitializedAC(true))
                dispatch(logInAC(true))
                dispatch(appStatusAC("succeeded"))
            } else {
                dispatch(appInitializedAC(true))
                handleAppError(res.data,dispatch)
                dispatch(logInAC(false))
            }
        })
        .catch(err => {
            dispatch(appInitializedAC(true))
            handleServerError(err, dispatch)
            dispatch(logInAC(false))
        })
}
export const logInTC = (data: FormikValuesType) => (dispatch: Dispatch) => {
    dispatch(appStatusAC("loading"))
    authApi.logIn(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(logInAC(true))
                dispatch(appStatusAC("succeeded"))
            } else {
                handleAppError(res.data,dispatch)
            }
        })
        .catch(err => {
            handleServerError(err, dispatch)
        })
}
export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(appStatusAC("loading"))
    authApi.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(logInAC(false))
                dispatch(appStatusAC("succeeded"))
            } else {
                handleAppError(res.data,dispatch)
            }
        })
        .catch(err => {
            handleServerError(err, dispatch)
        })
}