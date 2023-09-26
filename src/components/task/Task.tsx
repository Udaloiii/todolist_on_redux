import {TasksType} from "../todolist/Todolist.tsx";
import style from './task.module.scss'

type TasksPropsType = TasksType & {
    removeTask: (taskId: number) => void
}
export const Task = ({id, isDone, title, removeTask}: TasksPropsType) => {
    const removeTaskHandler = () => removeTask(id)
    return (
        <li className={style.wrapper} key={id}>
            <input type="checkbox" checked={isDone}/>
            <span className={style.text}>{title}</span>
            <button className={style.button} onClick={removeTaskHandler}>x</button>
        </li>
    );
};