import {TasksType} from "../todolist/Todolist.tsx";
import style from './task.module.scss'
import React, {ChangeEvent, useCallback} from "react";
import {ChangeableSpan} from "../changeableSpan/ChangeableSpan.tsx";

type TasksPropsType = TasksType & {
    id: string
    todoId: string
    removeTask: (todoId: string, taskId: string) => void
    changeTaskStatus: (todoId: string, id: string, newValue: boolean) => void
    changeText: (newTitle: string) => void
}
export const Task = React.memo(({
                                    id,
                                    todoId,
                                    isDone,
                                    title,
                                    removeTask,
                                    changeTaskStatus,
                                    changeText
                                }: TasksPropsType) => {
    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todoId, id, e.currentTarget.checked), [todoId, id])
    const removeTaskHandler = useCallback(() => removeTask(todoId, id), [todoId, id])
    const changeTextHandler = useCallback(() => changeText, [])
    const isDoneStyle = isDone ? style.isDone : ''

    return (
        <li className={`${style.wrapper} ${isDoneStyle}`} key={id}>
            <input className={style.checkBox} type="checkbox" checked={isDone} onChange={changeTaskStatusHandler}/>
            <ChangeableSpan text={title} changeText={changeTextHandler}/>
            <button className={style.button} onClick={removeTaskHandler}>x</button>
        </li>
    )
})