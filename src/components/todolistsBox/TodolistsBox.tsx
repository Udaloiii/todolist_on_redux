import style from './todolistsBox.module.scss'
import {useCallback, useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppCustomDispatch} from "@/state/state.ts";
import {FiltersType, TasksForTodolists, TodolistsType} from "@/App.tsx";
import {Todolist} from "@/components/todolist/Todolist.tsx";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, getTodolistsTC,
    removeTodolistTC
} from "@/state/reducers/todolist-reducer.ts";
import {addTasksTC, removeTaskTC, updateTaskTC} from "@/state/reducers/task-reducer.ts";
import {TaskStatuses} from "@/api/mainApi.ts";
import {AddItemForm} from "@/components/addItemForm/AddItemForm.tsx";
import {Navigate} from "react-router-dom";

export const TodolistsBox = () => {
    const todolists = useSelector<AppStateType, TodolistsType[]>(state => state.todolists)
    const tasks = useSelector<AppStateType, TasksForTodolists>(state => state.tasks)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppCustomDispatch()

    // functions for todolists
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => dispatch(removeTodolistTC(todolistId)), [])
    const changeFilter = useCallback((todoId: string, value: FiltersType) => dispatch(changeTodolistFilterAC(todoId, value)), [])
    const changeTitle = useCallback((todoId: string, newTitle: string) => dispatch(changeTodolistTitleTC(todoId, newTitle)), [])


    // functions for tasks
    const addTask = useCallback((todolistId: string, text: string) => dispatch(addTasksTC(todolistId, text)), [])

    const removeTask = useCallback((todolistId: string, taskId: string) => dispatch(removeTaskTC(todolistId, taskId)), [])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => dispatch(updateTaskTC(taskId, {status}, todolistId)), [])

    const changeText = useCallback((todoId: string, taskId: string, title: string) => dispatch(updateTaskTC(taskId, {title}, todoId)), [])

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(getTodolistsTC())
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }
    return (
        <div>
            <AddItemForm className={style.formForTodo} addItem={addTodolist}/>
            <div className={style.wrapper}>{todolists.map(todo => {
                return <Todolist key={todo.id}
                                 id={todo.id}
                                 title={todo.title}
                                 status={todo.todolistStatus}
                                 tasks={tasks[todo.id]}
                                 addTask={addTask}
                                 removeTask={removeTask}
                                 changeTaskStatus={changeTaskStatus}
                                 changeFilter={changeFilter}
                                 filter={todo.filter}
                                 removeTodolist={removeTodolist}
                                 changeTitle={changeTitle}
                                 changeText={changeText}
                />
            })}</div>
        </div>
    );
};