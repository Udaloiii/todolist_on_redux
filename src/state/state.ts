import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "@/state/reducers/task-reducer.ts";
import {todolistReducer} from "@/state/reducers/todolist-reducer.ts";
import {useDispatch} from "react-redux";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {appReducer} from "@/state/reducers/app-reducer.ts";
import {authReducer} from "@/state/reducers/auth-reducer.ts";


// combineReducers - это хелпер функция от Redux, которая позволяет объединить несколько редьюсеров в один редьюсер.
const mainReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app: appReducer,
    auth: authReducer
})
export const store = legacy_createStore(mainReducer, applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof mainReducer>

export type AppThunkDispatch = ThunkDispatch<AppStateType, any, AnyAction>
export const useAppCustomDispatch = () => useDispatch<AppThunkDispatch>();