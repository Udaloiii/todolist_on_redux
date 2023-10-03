import './App.css'
import {Todolist} from "@/components/todolist/Todolist.tsx";
import {Header} from "@/components/header/Header.tsx";
import {AddItemForm} from "@/components/addItemForm/AddItemForm.tsx";
import {useSelector} from "react-redux";
import {AppStateType, useAppCustomDispatch} from "@/state/state.ts";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    getTodolistsTC,
    removeTodolistTC
} from "@/state/reducers/todolist-reducer.ts";
import {addTasksTC, removeTaskTC, updateTaskTC} from "@/state/reducers/task-reducer.ts";
import {useCallback, useEffect} from "react";
import {TaskFromBack, TaskStatuses} from "@/api/mainApi.ts";


export type FiltersType = "all" | "active" | "completed"
export type TodolistsType = {
    id: string
    title: string
    filter: FiltersType
}
export type TasksForTodolists = {
    [key: string]: TaskFromBack[]
}

function App() {
    const todolists = useSelector<AppStateType, TodolistsType[]>(state => state.todolists)
    const tasks = useSelector<AppStateType, TasksForTodolists>(state => state.tasks)
    const dispatch = useAppCustomDispatch()

    // functions for todolists
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => dispatch(removeTodolistTC(todolistId)), [])
    const changeFilter = useCallback((todoId: string, value: FiltersType) => dispatch(changeTodolistFilterAC(todoId, value)), [])
    const changeTitle = useCallback((todoId: string, newTitle: string) => dispatch(changeTodolistTitleTC(todoId, newTitle)), [])


    // functions for tasks
    const addTask = useCallback((todolistId: string, text: string) => dispatch(addTasksTC(todolistId, text)), [])

    const removeTask = useCallback((todolistId: string, taskId: string) => dispatch(removeTaskTC(todolistId, taskId)), [])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => dispatch(updateTaskTC(taskId, {status}, todolistId)), [])

    const changeText = useCallback((todoId: string, taskId: string, title: string) => dispatch(updateTaskTC(taskId, {title}, todoId)), [])


    const allTodolists = todolists.map(el => {

        return <Todolist key={el.id}
                         id={el.id}
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
        dispatch(getTodolistsTC())
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
