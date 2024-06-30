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

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTask = tasks.filter(t => t.id !== id);
    tasksObj[todolistId] = filteredTask;

    setTasks({ ...tasksObj });
  }


  function addTask(title: string, todolistId: string) {
    let task = {
      id: v1(),
      title: title,
      isDone: false
    };
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone
      setTasks({ ...tasksObj });
    }
  }

  function changeFilter(value: FilterValuesType, todolistid: string) {
    let todolist = todolists.find(tl => tl.id === todolistid);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {
      id: todolistId1, title: "What to learn", filter: "active"
    },
    { id: todolistId2, title: "What to buy", filter: "completed" },
  ]);

  let removeTodoList = (todolistId: string) => {
    let filteredTodoList = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodoList);
    delete tasksObj[todolistId];
    setTasks(tasksObj);
  }

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: "HTMLCSS", isDone: true },
      { id: v1(), title: "JS", isDone: false },
      { id: v1(), title: "REACT JS", isDone: false },
      { id: v1(), title: "REAST API", isDone: false },
      { id: v1(), title: "CraphQL", isDone: false }],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "Milk", isDone: false },]
  });





  return (

    <div className="App">
      {
        todolists.map((tl) => {

          let taskForTodolist = tasksObj[tl.id];

          if (tl.filter === "active") {
            taskForTodolist = taskForTodolist.filter(t => t.isDone === true)
          }

          if (tl.filter === "completed") {
            taskForTodolist = taskForTodolist.filter(t => t.isDone === false)
          }



          return <Todolist key={tl.id} id={tl.id} title={tl.title} tasks={taskForTodolist} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}
            changeTaskStatus={changeStatus} filter={tl.filter} removeTodoList={removeTodoList} />

        })
      }

      <input type="checkbox" />
      <input type="date" />
      <input placeholder='it incubator' />
    </div>
  );
}





export default App;
