import './App.css'
import {useState} from "react";
import {TasksType, Todolist} from "./components/todolist/Todolist.tsx";
import {AddItemForm} from "./components/addItemForm/AddItemForm.tsx";
import {v1} from "uuid";

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
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "Movies", filter: "all"}
    ])


    const [tasks, setTasks] = useState<TasksForTodolists>({
            [todolistId1]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'JS/TS', isDone: false}
            ],
            [todolistId2]: [
                {id: v1(), title: 'Hulk', isDone: true},
                {id: v1(), title: 'Tor', isDone: true},
                {id: v1(), title: 'Batman', isDone: false}
            ]
        }
    )

    // const [tasks, setTasks] = useState<TasksType[]>([
    //     {id: v1(), title: 'HTML', isDone: true},
    //     {id: v1(), title: 'CSS', isDone: true},
    //     {id: v1(), title: 'JS/TS', isDone: false}
    // ])


    // functions for todolists
    function addTodolist(title: string) {
        let todoId = v1()
        let newTodolist: TodolistsType = {id: todoId, title: title, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todoId]: []})
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
        setTasks(tasks)
    }


    // functions for tasks
    function addTask(todolistId: string, text: string) {
        let newTask: TasksType = {id: v1(), title: text, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId],]})
    }

    function removeTask(todolistId: string, taskId: string) {
        // setTasks(tasks.filter(el => el.id !== taskId))
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }

    function changeTaskStatus(todolistId: string, taskId: string, newValue: boolean) {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: newValue} : el)
        })
    }


    function changeFilter(todoId: string, value: FiltersType) {
        setTodolists(todolists.map(el => el.id === todoId ? {...el, filter: value} : el))
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
        />
    })
    return (
        <div>
            <AddItemForm className="formForApp" addItem={addTodolist}/>
            <div className="box">
                {allTodolists}
            </div>
        </div>
    )
}

export default App
