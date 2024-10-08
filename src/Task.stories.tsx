import React from "react"
import { AddItemForm } from "./AdditemForm/AddItemForm"
import { action } from '@storybook/addon-actions';
import { Task } from "./Task";

export default {
  title: "Task Component",
  component: Task
}

const changeTaskStatusCallback = action("Status changed");
const changeTaskTitleCallback = action("Status title changed");
const removeTaskCallback = action("Task removed");

export const TaskBaseExample = () => {
  return <>
    <Task
      task={{ id: "1", isDone: true, title: "CSS" }}
      changeTaskStatus={changeTaskStatusCallback}
      changeTaskTitle={changeTaskTitleCallback}
      removeTask={removeTaskCallback}
      todolistId={"todolistId1"}
    />
    <Task
      task={{ id: "2", isDone: false, title: "JS" }}
      changeTaskStatus={changeTaskStatusCallback}
      changeTaskTitle={changeTaskTitleCallback}
      removeTask={removeTaskCallback} todolistId={"todolistId2"}
    />
  </>
} 
