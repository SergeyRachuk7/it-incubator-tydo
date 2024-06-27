import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}


type PropsType = {
  title: string,
  // tasks1: Array<[id: number, title: string, isDone: boolean]>,     
  tasks: Array<TaskType>
  removeTask: (id: string) => any
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
}


export function Todolist(props: PropsType) {
  const [newTaskTitle, setnewTaskTitle] = useState("")


  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setnewTaskTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      props.addTask(newTaskTitle);
      setnewTaskTitle("")
    }
  }

  const addTask = () => {
    props.addTask(newTaskTitle);
    setnewTaskTitle("");
  }

  const onAllClickHadler = () => { props.changeFilter("all") }
  const onAllClickHadlerActive = () => { props.changeFilter("active") }
  const onCompletedClickHadler = () => { props.changeFilter("completed") }



  return <div>
    <h3>{props.title}</h3>
    <input value={newTaskTitle}
      onChange={onNewTitleChangeHandler}
      onKeyPress={onKeyPressHandler}
    />

    <button onClick={addTask}>+New Task</button>
    <div>
      <ul>
        {
          props.tasks.map(t => {
            const onRemoveHandler = () => {
              props.removeTask(t.id)
            }


            return <li key={t.id}> <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          })
        }
      </ul>

    </div>

    <button onClick={onAllClickHadler}>All</button>
    <button onClick={onAllClickHadlerActive}>Active</button>
    <button onClick={onCompletedClickHadler}>Completed</button>
  </div >
} 
