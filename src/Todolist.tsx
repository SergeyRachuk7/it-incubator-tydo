
import { CheckBox, Delete } from "@mui/icons-material";
import { Button, Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddItemForm } from "./AddItemForm";
import { TasksStateType, TodolistType, FilterValuesType } from "./AppWithRedux";


import { EditableleSpan } from "./EditableSpan";
import { AppRootState } from "./state/store";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import { todolistId1 } from "./state/todoists-reducer";
import { Task } from "./Task";


export type TaskType = {
  id: string
  title: string
  isDone: boolean
};

type PropsType = {
  id: string
  title: string;
  tasks: Array<TaskType>;
  changeFilter: (value: FilterValuesType, todolistid: string) => void;
  addTask: (title: string, todolistId1: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId1: string) => void;
  changeTaskTitle: (id: string, newTitle: string, todolistId1: string) => void;
  removeTask: (id: string, todolistId1: string) => void;
  removeTodoList: (id: string) => void
  changeTodoListTitle: (id: string, newTitle: string) => void
  filter: FilterValuesType

};

export const Todolist = React.memo(function (props: PropsType) {
  console.log("Todolist is called");
  const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
  const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
  const dispatch = useDispatch();



  const onAllClickHandler = useCallback(() => {
    props.changeFilter("all", props.id);
  }, [props.changeFilter, props.id])

  const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
  const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);
  const removeTodoList = useCallback(() => props.removeTodoList(props.id), [props.removeTodoList, props.id])
  const changeTodoListTitle = useCallback((newTitle: string) => props.changeTodoListTitle(props.id, newTitle), [props.changeTodoListTitle, props.id])


  const addTask = useCallback((title: string) => {
    props.addTask(title, props.id,);
  }, [props.addTask, props.id]);


  let taskForTodolist = props.tasks;

  if (props.filter === "active") {
    taskForTodolist = props.tasks.filter(t => t.isDone === false);
  }
  if (props.filter === "completed") {
    taskForTodolist = props.tasks.filter(t => t.isDone === true);
  }

  return (
    <div>
      <h3>
        <EditableleSpan value={props.title} onChange={changeTodoListTitle} />
        <IconButton onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {
          props.tasks.map(t => <Task
            task={t}
            changeTaskStatus={props.changeTaskStatus}
            changeTaskTitle={props.changeTaskTitle}
            removeTask={props.removeTask} todolistId={props.id} key={t.id}
          />
          )
        }
      </ul>
      <Button variant={props.filter === "all" ? "outlined" : "text"}
        onClick={onAllClickHandler}>All
      </Button >
      <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"} onClick={onActiveClickHandler}>Active</Button>
      <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"} onClick={onCompletedClickHandler}>Completed</Button>
    </div >
  );
}
)





