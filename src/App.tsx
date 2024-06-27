import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
export type FilterValuesType = "all" | "completed" | "active";

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "JS", isDone: false },
    { id: v1(), title: "REACT", isDone: true },
    { id: v1(), title: "REACT", isDone: true },
    { id: v1(), title: "REDUX", isDone: false },
  ]
  )
  console.log(tasks);

  function removeTask(id: string) {
    let filteredTask = tasks.filter(t => t.id !== id)
    setTasks((filteredTask))
  }

  function addTask(title: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false
    }
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let [filter, setFilter] = useState<FilterValuesType>("active")


  let taskForTodolist = tasks;
  if (filter === "completed") {
    taskForTodolist = tasks.filter(t => t.isDone === true)
  }

  if (filter === "active") {
    taskForTodolist = tasks.filter(t => t.isDone === false)
  }


  return (

    <div className="App">
      <input type="checkbox" />
      <input type="date" />
      <input placeholder='it incubator' />
      <Todolist title={"What to learn"} tasks={taskForTodolist} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask} />
    </div>
  );
}





export default App;
