
import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
export type FilterValuesType = "all" | "completed" | "active";

type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TaskStateType = {
  [key: string]: Array<TaskType>
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

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    let todolistTasks = tasksObj[todolistId];

    let task = todolistTasks.find(t => t.id === id);

    if (task) {
      task.title = newTitle
      setTasks({ ...tasksObj });
    }
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
      id: todolistId1, title: "What to learn", filter: "all"
    },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let removeTodoList = (todolistId: string) => {
    let filteredTodoList = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodoList);
    delete tasksObj[todolistId];
    setTasks(tasksObj);
  }


  function changeTodoListTitle(id: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === id)
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists])
    }
  }

  let [tasksObj, setTasks] = useState<TaskStateType>({
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


  function addTodoList(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: "all",
      title: title

    }
    setTodolists([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    })
  }


  return (

    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            News
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={10}>
          {
            todolists.map((tl) => {

              let taskForTodolist = tasksObj[tl.id];

              if (tl.filter === "active") {
                taskForTodolist = taskForTodolist.filter(t => t.isDone === true)
              }

              if (tl.filter === "completed") {
                taskForTodolist = taskForTodolist.filter(t => t.isDone === false)
              }

              return <Grid item>
                <Paper style={{ padding: "10px" }}>
                  < Todolist key={tl.id} id={tl.id} title={tl.title}
                    tasks={taskForTodolist} removeTask={removeTask}
                    changeFilter={changeFilter} addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter} removeTodoList={removeTodoList} changeTodoListTitle={changeTodoListTitle} />
                </Paper>
              </Grid>
            })
          }

        </Grid>




      </Container >

    </div >
  );
}





export default App;