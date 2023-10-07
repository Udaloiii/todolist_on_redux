import {TasksType} from "../todolist/Todolist.tsx";
import style from './task.module.scss'
import React, {ChangeEvent, useCallback} from "react";
import {ChangeableSpan} from "../changeableSpan/ChangeableSpan.tsx";
import {TaskStatuses} from "@/api/mainApi.ts";

type TasksPropsType = TasksType & {
    id: string
    todoId: string
    removeTask: (todoId: string, taskId: string) => void
    changeTaskStatus: (todoId: string, id: string, status: TaskStatuses) => void
    changeText: (newTitle: string) => void
    todoDisabled: boolean
}
export const Task = React.memo(({
                                    id,
                                    todoId,
                                    isDone,
                                    title,
                                    removeTask,
                                    changeTaskStatus,
                                    changeText,
                                    todoDisabled
                                }: TasksPropsType) => {
    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.currentTarget.checked
        changeTaskStatus(todoId, id, checked ? TaskStatuses.Completed : TaskStatuses.New)
    }, [todoId, id])
    const removeTaskHandler = useCallback(() => removeTask(todoId, id), [todoId, id])
    const changeTextHandler = useCallback((newTitle: string) => changeText(newTitle), [])
    const isDoneStyle = isDone ? style.isDone : ''

    return (
        <li className={`${style.wrapper} ${isDoneStyle}`} key={id}>
            <input className={style.checkBox} type="checkbox" checked={isDone} onChange={changeTaskStatusHandler} disabled={todoDisabled}/>
            <ChangeableSpan text={title} changeText={changeTextHandler}/>
            <button className={style.button} onClick={removeTaskHandler} disabled={todoDisabled}>x</button>
        </li>
    )
})