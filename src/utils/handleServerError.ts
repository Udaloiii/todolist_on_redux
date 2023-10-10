import {appErrorAC, appStatusAC} from "@/state/reducers/app-reducer.ts";
import {Dispatch} from "redux";

export const handleServerError = (error: { message: string }, dispatch: Dispatch<ErrorDispatchType>) => {
    dispatch(appStatusAC("failed"))
    dispatch(appErrorAC(error.message))
}

export type ErrorDispatchType =  ReturnType<typeof appStatusAC> | ReturnType<typeof appErrorAC>