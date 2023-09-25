import {TasksType} from "../todolist/Todolist.tsx";
import style from './task.module.scss'

export const Task = ({id, isDone, title}: TasksType) => {
    return (
        <li className={style.wrapper} key={id}>
            <input type="checkbox" checked={isDone}/>
            <span className={style.text}>{title}</span>
            <button className={style.button}>x</button>
        </li>
    );
};