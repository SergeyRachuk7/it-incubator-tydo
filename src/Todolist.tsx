
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { AddItemForm } from "./AddItemFrom";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
};

type PropsType = {
  id: string
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId1: string) => void;
  changeFilter: (value: FilterValuesType, todolistid: string) => void;
  addTask: (title: string, todolistId1: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId1: string) => void;
  filter: FilterValuesType
  removeTodoList: (todolistId1: string) => void
};

export function Todolist(props: PropsType) {

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

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  }


  return (
    <div>
      <h3>{props.title}
        <button onClick={removeTodoList}>delete</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(t.id, props.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
          };
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <span>{t.title}</span>
              <button onClick={onClickHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <button className={props.filter === "all" ? "active-filter" : ""}
        onClick={onAllClickHandler} > All</button >
      <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
      <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
    </div >
  );
}


