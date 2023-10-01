import {combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "@/state/reducers/task-reducer.ts";
import {todolistReducer} from "@/state/reducers/todolist-reducer.ts";


// combineReducers - это хелпер функция от Redux, которая позволяет объединить несколько редьюсеров в один редьюсер.
const mainReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
})

export const store = legacy_createStore(mainReducer)

export type AppStateType = ReturnType<typeof mainReducer>
