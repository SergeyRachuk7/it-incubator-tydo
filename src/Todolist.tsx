
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType, todolistid: string) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValuesType
};

export function Todolist(props: PropsType) {
  // const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  let [title, setTitle] = useState("")

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const addTask = () => {
    if (title.trim() !== "") {
      props.addTask(title.trim());
      setTitle("");
    } else {
      setError("Title is  required");
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      addTask();
    }
  };

  const onAllClickHandler = () => {
    props.changeFilter("all", props.id);
  };
  const onActiveClickHandler = () => {
    props.changeFilter("active", props.id);
  };
  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.id);
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+ New Task</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(t.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked);
          };
          const onRemoveHandler = () => {
            props.removeTask(t.id);
          };
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
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