import {TasksType} from "../todolist/Todolist.tsx";
import style from './task.module.scss'
import React, {ChangeEvent, useCallback} from "react";
import {ChangeableSpan} from "../changeableSpan/ChangeableSpan.tsx";
import {TaskStatuses} from "@/api/mainApi.ts";
import {AppStatusType} from "@/state/reducers/app-reducer.ts";

type TasksPropsType = TasksType & {
    id: string
    todoId: string
    removeTask: (todoId: string, taskId: string) => void
    changeTaskStatus: (todoId: string, id: string, status: TaskStatuses) => void
    changeText: (newTitle: string) => void
    todoDisabled: boolean
    taskStatus: AppStatusType
}
export const Task = React.memo(({
                                    id,
                                    todoId,
                                    isDone,
                                    title,
                                    removeTask,
                                    changeTaskStatus,
                                    changeText,
                                    todoDisabled,
                                    taskStatus
                                }: TasksPropsType) => {
    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.currentTarget.checked
        changeTaskStatus(todoId, id, checked ? TaskStatuses.Completed : TaskStatuses.New)
    }, [todoId, id])
    const removeTaskHandler = useCallback(() => {
        removeTask(todoId, id)
    }, [todoId, id])
    const changeTextHandler = useCallback((newTitle: string) => changeText(newTitle), [])

    const disableStyle = taskStatus === "loading" ? style.disabled : ""
    const isDoneStyle = isDone ? style.isDone : ''

    return (
        <li className={`${style.wrapper} ${isDoneStyle} ${disableStyle}`} key={id}>
            <input className={style.checkBox} type="checkbox" checked={isDone} onChange={changeTaskStatusHandler}
                   disabled={todoDisabled || taskStatus === "loading"}/>
            <ChangeableSpan text={title} changeText={changeTextHandler} todoDisabled={todoDisabled}
                            taskDisabled={taskStatus === "loading"}/>
            <button className={style.button} onClick={removeTaskHandler} disabled={todoDisabled || taskStatus === "loading"}>x
            </button>
        </li>
    )
})