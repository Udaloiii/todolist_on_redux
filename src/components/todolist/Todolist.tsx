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
            <h3 className={style.title}>Title</h3>
            <div className={style.addItemBlock}>
                <input type="text" placeholder={'enter text'}/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(el => <Task key={el.id} id={el.id} title={el.title} isDone={el.isDone}/>)}
            </ul>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    );
};