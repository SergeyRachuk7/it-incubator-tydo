

import React, { useReducer, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { addTodolistAC, changeTodolistTitleAC, removeTodolistAC, todoListsReducer, сhangeTodolisFilterAC } from './state/todoists-reducer';
import { userReducer } from './state/user-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWitchReducers() {
  let todolistId1 = v1();
  let todolistId2 = v1();


  let [todolists, dispatchTodolistsReducer] = useReducer(todoListsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);


  let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: "HTMLCSS", isDone: true },
      { id: v1(), title: "JS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk ", isDone: true },
      { id: v1(), title: "React Book", isDone: true },
    ]
  });

  // const todolist = useSelector < AppRootStateType, Array<TolilistType>

  const dispatch = useDispatch();

  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId);
    dispatchToTasksReducer(action);
  }

  function addTask(title: string, todolistId: string) {
    dispatchToTasksReducer(addTaskAC(title, todolistId));
  }


  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatchToTasksReducer(changeTaskStatusAC(id, isDone, todolistId));
  }


  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todolistId));
  }


  function changeFilter(value: FilterValuesType, todolistid: string) {
    сhangeTodolisFilterAC(value, todolistid)
  }


  let removeTodoList = (id: string) => {
    const action = removeTodolistAC(id);
    dispatchToTasksReducer(action);
    dispatchTodolistsReducer(action);
  }


  function changeTodoListTitle(id: string, title: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatchTodolistsReducer(action);
  }


  function addTodoList(title: string) {
    const action = addTodolistAC(title);
    dispatchToTasksReducer(action);
    dispatchTodolistsReducer(action);
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
              let allTodolistTasks = tasks[tl.id]
              let taskForTodolist = allTodolistTasks;
              if (tl.filter === "active") {
                taskForTodolist = allTodolistTasks.filter(t => !t.isDone);
              }
              if (tl.filter === "completed") {
                taskForTodolist = allTodolistTasks.filter(t => t.isDone);
              }

              return <Grid item>
                <Paper style={{ padding: "10px" }}>
                  <Todolist key={tl.id} id={tl.id} title={tl.title}
                    tasks={taskForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
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


// export default AppWitchReducers;