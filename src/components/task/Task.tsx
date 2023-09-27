import {TasksType} from "../todolist/Todolist.tsx";
import style from './task.module.scss'
import {ChangeEvent} from "react";

type TasksPropsType = TasksType & {
    todoId: string
    removeTask: (todoId: string, taskId: string) => void
    changeTaskStatus: (todoId: string, id: string, newValue: boolean) => void
}
export const Task = ({id, todoId,isDone, title, removeTask, changeTaskStatus}: TasksPropsType) => {
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todoId, id, e.currentTarget.checked)
    const removeTaskHandler = () => removeTask(todoId, id)
    const isDoneStyle = isDone ? style.isDone : ''
    return (
        <li className={`${style.wrapper} ${isDoneStyle}`} key={id}>
            <input type="checkbox" checked={isDone} onChange={changeTaskStatusHandler}/>
            <span className={style.text}>{title}</span>
            <button className={style.button} onClick={removeTaskHandler}>x</button>
        </li>
    );
};