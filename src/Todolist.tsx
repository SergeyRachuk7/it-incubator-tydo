
import { CheckBox, Delete } from "@mui/icons-material";
import { Button, Checkbox, IconButton } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddItemForm } from "./AddItemForm";
import { TasksStateType, TodolistType, FilterValuesType } from "./AppWithRedux";


import { EditableleSpan } from "./EditableSpan";
import { AppRootState } from "./state/store";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";


export type TaskType = {
  id: string
  title: string
  isDone: boolean
};

type PropsType = {
  id: string
  title: string;
  // tasks: Array<TaskType>;
  // removeTask: (id: string, todolistId1: string) => void;
  changeFilter: (value: FilterValuesType, todolistid: string) => void;
  // addTask: (title: string, todolistId1: string) => void;
  // changeTaskStatus: (id: string, isDone: boolean, todolistId1: string) => void;
  // changeTaskTitle: (id: string, newTitle: string, todolistId1: string) => void;
  filter: FilterValuesType
  removeTodoList: (id: string) => void
  changeTodoListTitle: (id: string, newTitle: string) => void
};

export function Todolist(props: PropsType) {

  const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
  const dispatch = useDispatch();

  const onAllClickHandler = () => {
    props.changeFilter("all", props.id);
  };

  const onActiveClickHandler = () => {
    props.changeFilter("active", props.id);
  };
  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.id);
  };

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  }

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle);
  }

  // const addTask = (title: string) => {
  //   props.addTask(title, props.id,);
  // }


  let allTodolistTasks = tasks;
  let taskForTodolist = allTodolistTasks;
  if (props.filter === "active") {
    taskForTodolist = allTodolistTasks.filter(t => t.isDone === false);
  }
  if (props.filter === "completed") {
    taskForTodolist = allTodolistTasks.filter(t => t.isDone === true);
  }

  return (
    <div>
      <h3>{props.title}
        <EditableleSpan title={props.title} onChange={changeTodoListTitle} />
        <IconButton onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={(title) => {
        dispatch(addTaskAC(title, props.id));
      }} />
      <ul>
        {
          taskForTodolist.map(t => {
            const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id));
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              let newIsDoneValue = e.currentTarget.checked;
              dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id));
            }
            const onChangeTitleHandler = (newValue: string) => {
              dispatch(changeTaskTitleAC(t.id, newValue, props.id));
            };


            return (
              <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox
                  onChange={onChangeHandler}
                  checked={t.isDone}
                />
                <EditableleSpan title={t.title}
                  onChange={(value) => { alert(value) }} />
                <IconButton onClick={onClickHandler}>
                  <Delete />
                </IconButton>
              </li>
            );
          })}
      </ul>
      <Button variant={props.filter === "all" ? "outlined" : "text"}
        onClick={onAllClickHandler}>All
      </Button >
      <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"} onClick={onActiveClickHandler}>Active</Button>
      <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"} onClick={onCompletedClickHandler}>Completed</Button>
    </div >
  );
}

