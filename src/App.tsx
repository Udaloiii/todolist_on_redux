import './App.css'
import {useState} from "react";
import {Todolist} from "./components/todolist/Todolist.tsx";

function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS/TS', isDone: false}
    ])

    return (
        <>
            <Todolist tasks = {tasks}/>
            <Todolist tasks = {tasks}/>
            <Todolist tasks = {tasks}/>
        </>
    )
}

export default App
