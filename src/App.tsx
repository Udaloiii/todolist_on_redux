import './App.css'
import {useState} from "react";
import {TasksType, Todolist} from "./components/todolist/Todolist.tsx";
import {AddItemForm} from "./components/addItemForm/AddItemForm.tsx";

function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS/TS', isDone: false}
    ])

    // functions for tasks
    function addTask() {
        let newTask: TasksType = {id: tasks.length + 1, title: 'title', isDone: false}
        setTasks([newTask, ...tasks])
    }

    function removeTask(taskId: number) {
        setTasks(tasks.filter(el => el.id !== taskId))
    }

    return (
        <div>
            <AddItemForm className="formForApp"/>
            <div className="box">
                <Todolist tasks={tasks} addTask={addTask} removeTask={removeTask}/>
                {/*<Todolist tasks={tasks} addTask={addTask}/>*/}
                {/*<Todolist tasks={tasks} addTask={addTask}/>*/}
            </div>
        </div>
    )
}

export default App
