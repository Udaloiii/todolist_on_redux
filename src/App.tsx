import './App.css'
import {TasksType, Todolist} from "@/components/todolist/Todolist.tsx";
import {Header} from "@/components/header/Header.tsx";
import {AddItemForm} from "@/components/addItemForm/AddItemForm.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "@/state/state.ts";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC
} from "@/state/reducers/todolist-reducer.ts";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "@/state/reducers/task-reducer.ts";
import {useCallback, useEffect} from "react";
import {todolistApi} from "@/api/mainApi.ts";


export type FiltersType = "all" | "active" | "completed"
export type TodolistsType = {
    id: string
    title: string
    filter: FiltersType
}
export type TasksForTodolists = {
    [key: string]: TasksType []
}

function App() {
    const todolists = useSelector<AppStateType, TodolistsType[]>(state => state.todolists)
    const tasks = useSelector<AppStateType, TasksForTodolists>(state => state.tasks)
    const dispatch = useDispatch()

    // functions for todolists
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => dispatch(removeTodolistAC(todolistId)), [])

    const changeFilter = useCallback((todoId: string, value: FiltersType) => dispatch(changeTodolistFilterAC(todoId, value)), [])


    // functions for tasks
    const addTask = useCallback((todolistId: string, text: string) => dispatch(addTaskAC(todolistId, text)), [])

    const removeTask = useCallback((todolistId: string, taskId: string) => dispatch(removeTaskAC(todolistId, taskId)), [])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, newValue: boolean) => dispatch(changeTaskStatusAC(todolistId, taskId, newValue)), [])


    const changeTitle = useCallback((todoId: string, newTitle: string) => dispatch(changeTodolistTitleAC(todoId, newTitle)), [])

    const changeText = useCallback((todoId: string, taskId: string, newTitle: string) => dispatch(changeTaskTitleAC(todoId, taskId, newTitle)), [])


    const allTodolists = todolists.map(el => {

        return <Todolist key={el.id} id={el.id}
                         title={el.title}
                         tasks={tasks[el.id]}
                         addTask={addTask}
                         removeTask={removeTask}
                         changeTaskStatus={changeTaskStatus}
                         changeFilter={changeFilter}
                         filter={el.filter}
                         removeTodolist={removeTodolist}
                         changeTitle={changeTitle}
                         changeText={changeText}
        />
    })

    useEffect(() => {
        todolistApi.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }, [])

    return (
        <div>
            <Header/>
            <AddItemForm className="formForApp" addItem={addTodolist}/>
            <div className="box">
                {allTodolists}
            </div>
        </div>
    )
}

export default App
