import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
export type FilterValuesType = "all" | "completed" | "active";

type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {



  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTMLCSS", isDone: true },
    { id: v1(), title: "JS", isDone: false },
    { id: v1(), title: "REACT JS", isDone: false },
    { id: v1(), title: "REAST API", isDone: false },
    { id: v1(), title: "CraphQL", isDone: false },
  ]
  )
  // let [filter, setFilter] = useState<FilterValuesType>("all")


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

  function changeFilter(value: FilterValuesType, todolistid: string) {
    let todolist = todolists.find(tl => tl.id === todolistid);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {
      id: v1(), title: "What to learn", filter: "active"
    },
    { id: v1(), title: "What to buy", filter: "completed" },
  ]);

  return (

    <div className="App">
      {
        todolists.map((tl) => {

          let taskForTodolist = tasks;
          if (tl.filter === "active") {
            taskForTodolist = tasks.filter(t => t.isDone === true)
          }

          if (tl.filter === "completed") {
            taskForTodolist = tasks.filter(t => t.isDone === false)
          }



          return <Todolist key={tl.id} id={tl.id} title={tl.title} tasks={taskForTodolist} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}
            changeTaskStatus={changeStatus} filter={tl.filter} />

        })
      }

      <input type="checkbox" />
      <input type="date" />
      <input placeholder='it incubator' />
    </div>
  );
}





export default App;
