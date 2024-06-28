import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
export type FilterValuesType = "all" | "completed" | "active";

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTMLCSS", isDone: true },
    { id: v1(), title: "JS", isDone: false },
    { id: v1(), title: "REACT JS", isDone: false },
    { id: v1(), title: "REAST API", isDone: false },
    { id: v1(), title: "CraphQL", isDone: false },
  ]
  )
  let [filter, setFilter] = useState<FilterValuesType>("all")


  function removeTask(id: string) {
    let filteredTask = tasks.filter(t => t.id !== id)
    setTasks((filteredTask))
  }

  function addTask(title: string) {
    let task = {
      id: v1(),
      title: title,
      isDone: false // припустимо, що нове завдання ще не виконане
    };
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
  }


  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone
    }
    setTasks([...tasks]);
  }


  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }



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
      <Todolist title={"What to learn"} tasks={taskForTodolist} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}
        changeTaskStatus={changeStatus} filter={filter} />
    </div>
  );
}





export default App;
