import {Task} from "../task/Task.tsx";
import style from './todolist.module.scss'
import {AddItemForm} from "../addItemForm/AddItemForm.tsx";
import {FiltersType} from "../../App.tsx";
import {ChangeableSpan} from "../changeableSpan/ChangeableSpan.tsx";
import {useState} from "react";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    id: string
    title: string
    tasks: TasksType[]
    addTask: (todolistId: string, text: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, id: string, newValue: boolean) => void
    changeFilter: (todoId: string, value: FiltersType) => void
    filter: FiltersType
    removeTodolist: (todoId: string) => void
    changeTitle: (todoId: string, newTitle: string) => void
    changeText: (todoId: string, taskId: string, newTitle: string) => void
}
export const Todolist = ({
                             id,
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

    const addTaskHandler = (text: string) => addTask(id, text)
    const removeTodolistHandler = () => removeTodolist(id)

    const changeTitleHandler = (newTitle: string) => changeTitle(id, newTitle)

    const [showDeleteButton, setShowDeleteButton] = useState(true) // чтобы значок "удалить" убрать, когда включается input

    return (
        <div className={style.box}>
            <h3 className={style.changeableSpanBox}>
                <ChangeableSpan className={style.title} text={title} changeText={changeTitleHandler}
                                setShowButton={setShowDeleteButton}/>
                {showDeleteButton &&
                    <button className={style.changeableSpanButton} onClick={removeTodolistHandler}>x</button>}

            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {tasks?.map(el => {
                    const changeTextHandler = (newTitle: string) => changeText(id, el.id, newTitle)
                    return (<Task key={el.id} id={el.id} todoId={id} title={el.title} isDone={el.isDone}
                                  removeTask={removeTask} changeTaskStatus={changeTaskStatus}
                                  changeText={changeTextHandler}/>)
                })}
            </ul>
            <div className={style.buttonsBlock}>
                <button className={`${style.button} ${filter === 'all' && style.activeButton}`}
                        onClick={() => changeFilter(id, 'all')}>All
                </button>
                <button className={`${style.button} ${filter === 'active' && style.activeButton}`}
                        onClick={() => changeFilter(id, 'active')}>Active
                </button>
                <button className={`${style.button} ${filter === 'completed' && style.activeButton}`}
                        onClick={() => changeFilter(id, 'completed')}>Completed
                </button>
            </div>
        </div>
    );
};