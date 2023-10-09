import {Task} from "../task/Task.tsx";
import style from './todolist.module.scss'
import {AddItemForm} from "../addItemForm/AddItemForm.tsx";
import {FiltersType} from "../../App.tsx";
import {ChangeableSpan} from "../changeableSpan/ChangeableSpan.tsx";
import React, {useCallback, useEffect, useState} from "react";
import {getTasksTC} from "@/state/reducers/task-reducer.ts";
import {useAppCustomDispatch} from "@/state/state.ts";
import {TaskFromBack, TaskStatuses} from "@/api/mainApi.ts";
import {AppStatusType} from "@/state/reducers/app-reducer.ts";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    id: string
    title: string
    status: AppStatusType
    tasks: Array<TaskFromBack & { statusTask: AppStatusType }>
    addTask: (todolistId: string, text: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    changeFilter: (todoId: string, value: FiltersType) => void
    filter: FiltersType
    removeTodolist: (todoId: string) => void
    changeTitle: (todoId: string, newTitle: string) => void
    changeText: (todoId: string, taskId: string, newTitle: string) => void
}
export const Todolist = React.memo(({
                                        id,
                                        status,
                                        tasks,
                                        title,
                                        addTask,
                                        removeTask,
                                        changeTaskStatus,
                                        changeFilter,
                                        filter,
                                        removeTodolist,
                                        changeTitle,
                                        changeText
                                    }: TodolistPropsType) => {

    const dispatch = useAppCustomDispatch()

    // functions
    const addTaskHandler = useCallback((text: string) => addTask(id, text), [addTask, id])
    const removeTodolistHandler = useCallback(() => removeTodolist(id), [removeTodolist, id])
    const changeTitleHandler = useCallback((newTitle: string) => changeTitle(id, newTitle), [changeTitle, id])
    const changeFilterHandler = useCallback((value: FiltersType) => changeFilter(id, value), [changeFilter, id])

    const [showDeleteButton, setShowDeleteButton] = useState(true) // чтобы значок "удалить" убрать, когда включается input


    let filteredTask = tasks
    if (filter === "active") {
        filteredTask = tasks.filter(el => el.status !== TaskStatuses.Completed)
    }
    if (filter === "completed") {
        filteredTask = tasks.filter(el => el.status === TaskStatuses.Completed)
    }

    useEffect(() => {
        dispatch(getTasksTC(id))
    }, [])

    const todoDisabled = status === "loading"

    return (
        <div className={style.box}>
            <div className={style.main}>
                <h3 className={style.changeableSpanBox}>
                    <ChangeableSpan className={style.title} text={title} changeText={changeTitleHandler}
                                    setShowButton={setShowDeleteButton} todoDisabled={todoDisabled}/>
                    {showDeleteButton &&
                        <button className={style.changeableSpanButton} onClick={removeTodolistHandler}>x</button>}

                </h3>
                <AddItemForm addItem={addTaskHandler} todoDisabled={todoDisabled}/>
                <ul>
                    {filteredTask?.map(el => {
                        const changeTextHandler = (newTitle: string) => changeText(id, el.id, newTitle)
                        return (
                            <Task key={el.id} id={el.id} todoId={id} title={el.title} isDone={el.status === 2}
                                  removeTask={removeTask} changeTaskStatus={changeTaskStatus}
                                  changeText={changeTextHandler} todoDisabled={todoDisabled} taskStatus = {el.statusTask}/>
                        )
                    })}
                </ul>
            </div>
            <div className={style.buttonsBlock}>
                <button className={`${style.button} ${filter === 'all' && style.activeButton}`}
                        onClick={() => changeFilterHandler('all')}>All
                </button>
                <button className={`${style.button} ${filter === 'active' && style.activeButton}`}
                        onClick={() => changeFilterHandler('active')}>Active
                </button>
                <button className={`${style.button} ${filter === 'completed' && style.activeButton}`}
                        onClick={() => changeFilterHandler('completed')}>Completed
                </button>
            </div>
        </div>
    )
})