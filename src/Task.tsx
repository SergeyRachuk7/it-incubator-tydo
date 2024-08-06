import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, useCallback } from "react";
import { EditableleSpan } from "./EditableSpan";
import { TaskType } from "./Todolist";

export type TaskPropsType = {
  changeTaskStatus: (id: string, isDone: boolean, todolistId1: string) => void;
  changeTaskTitle: (id: string, newTitle: string, todolistId1: string) => void;
  removeTask: (id: string, todolistId1: string) => void;
  task: TaskType
  todolistId: string
}


export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = () => props.removeTask(props.task.id, props.todolistId);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    // dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id)); 
  }
  const onChangeTitleHandler = useCallback((newValue: string) => {
    props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    // dispatch(changeTaskTitleAC(t.id, newValue, props.id));
  }, [props.task.id, props.changeTaskTitle, props.todolistId]);

  return <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
    <Checkbox
      onChange={onChangeHandler}
      color="primary"
      checked={props.task.isDone}
    />
    <EditableleSpan value={props.task.title}
      onChange={onChangeTitleHandler} />
    <IconButton onClick={onClickHandler}>
      <Delete />
    </IconButton>
  </li>
})