import {Task} from "../task/Task.tsx";
import style from './todolist.module.scss'

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    tasks: TasksType[]
}
export const Todolist = ({tasks}: TodolistPropsType) => {
    return (
        <div className={style.box}>
            <h3>Title</h3>
            <input type="text"/>
            <button>+</button>
            <ul>
                {tasks.map(el => <Task key={el.id} id={el.id} title={el.title} isDone={el.isDone}/>)}
            </ul>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    );
};