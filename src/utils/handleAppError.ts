import {appErrorAC, appStatusAC} from "@/state/reducers/app-reducer.ts";
import {Dispatch} from "redux";
import {MainResponseType} from "@/api/mainApi.ts";
import {ErrorDispatchType} from "@/utils/handleServerError.ts";

export const handleAppError = <T>(data: MainResponseType<T>, dispatch: Dispatch<ErrorDispatchType>) => {
    if (data.messages.length) {
        dispatch(appErrorAC(data.messages[0]))
    } else {
        dispatch(appErrorAC("Some error"))
    }
    dispatch(appStatusAC("failed"))
}