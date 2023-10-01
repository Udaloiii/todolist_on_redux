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
    removeTodolistAC
} from "@/state/reducers/todolist-reducer.ts";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "@/state/reducers/task-reducer.ts";


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
    function addTodolist(title: string) {
        dispatch(addTodolistAC(title))
    }

    function removeTodolist(todolistId: string) {
        dispatch(removeTodolistAC(todolistId))
    }

    function changeFilter(todoId: string, value: FiltersType) {
        dispatch(changeTodolistFilterAC(todoId, value))
    }


    // functions for tasks
    function addTask(todolistId: string, text: string) {
        dispatch(addTaskAC(todolistId, text))
    }

    function removeTask(todolistId: string, taskId: string) {
        dispatch(removeTaskAC(todolistId, taskId))
    }

    function changeTaskStatus(todolistId: string, taskId: string, newValue: boolean) {
        dispatch(changeTaskStatusAC(todolistId, taskId, newValue))
    }


    function changeTitle(todoId: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(todoId, newTitle))
    }

    function changeText(todoId: string, taskId: string, newTitle: string) {
        dispatch(changeTaskTitleAC(todoId, taskId, newTitle))
    }


    const allTodolists = todolists.map(el => {
        let filteredTask = tasks[el.id]
        el.filter === "active" ? filteredTask = filteredTask.filter(el => !el.isDone) :
            el.filter === "completed" ? filteredTask = filteredTask.filter(el => el.isDone) :
                filteredTask

        return <Todolist key={el.id} id={el.id} title={el.title} tasks={filteredTask} addTask={addTask}
                         removeTask={removeTask}
                         changeTaskStatus={changeTaskStatus}
                         changeFilter={changeFilter}
                         filter={el.filter}
                         removeTodolist={removeTodolist}
                         changeTitle={changeTitle}
                         changeText={changeText}
        />
    })

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
