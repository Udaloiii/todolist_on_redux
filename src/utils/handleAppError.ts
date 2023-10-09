import {appErrorAC, appStatusAC} from "@/state/reducers/app-reducer.ts";
import {Dispatch} from "redux";
import {MainResponseType} from "@/api/mainApi.ts";

export const handleAppError = <T>(data: MainResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appErrorAC(data.messages[0]))
    } else {
        dispatch(appErrorAC("Some error"))
    }
    dispatch(appStatusAC("failed"))
}