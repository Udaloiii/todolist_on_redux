import {Task} from "../task/Task.tsx";
import style from './todolist.module.scss'
import {AddItemForm} from "../addItemForm/AddItemForm.tsx";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    tasks: TasksType[]
    addTask: () => void
    removeTask: (taskId: string) => void
}
export const Todolist = ({tasks, addTask, removeTask}: TodolistPropsType) => {
    return (
        <div className={style.box}>
            <h3 className={style.title}>Title</h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks.map(el => <Task key={el.id} id={el.id} title={el.title} isDone={el.isDone} removeTask={removeTask}/>)}
            </ul>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    );
};