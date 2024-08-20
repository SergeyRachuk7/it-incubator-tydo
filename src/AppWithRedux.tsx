
import React, { useCallback, useReducer, useState } from 'react';
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
import { AppRootState } from './state/store';
export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {


  // let todolistId1 = v1();
  // let todolistId2 = v1();

  const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
  const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks);
  const dispatch = useDispatch();
  console.log(todolists);



  const removeTask = useCallback(function (title: string, todolistId: string) {
    const action = removeTaskAC(title, todolistId);
    dispatch(action)
  }, [dispatch]);


  const addTask = useCallback(function (title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId);
    dispatch(action);
  }, [dispatch]);


  const changeFilter = useCallback(function (value: FilterValuesType, todolistid: string) {
    const action = сhangeTodolisFilterAC(value, todolistid);
    dispatch(action);
  }, [dispatch]);

  const removeTodoList = useCallback(function (id: string) {
    const action = removeTodolistAC(id);
    dispatch(action)
  }, [dispatch])

  const changeTodoListTitle = useCallback(function (id: string, title: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatch(action);
  }, [dispatch])

  const changeStatus = useCallback(function (id: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(id, isDone, todolistId)
    dispatch(action);
  }, [dispatch])


  const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
    const action = changeTaskTitleAC(id, newTitle, todolistId);
    dispatch(action);
  }, [dispatch])


  const addTodoList = useCallback(function (title: string) {
    const action = addTodolistAC(title);
    console.log(action);
    dispatch(action);
  }, [dispatch]);



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
            todolists.map(tl => {
              let allTodolistTasks = tasks[tl.id];
              let taskForTodolist = allTodolistTasks;

              return <Grid item key={tl.id}>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={taskForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle} />
                </Paper>
              </Grid>
            })
          }

        </Grid>

      </Container >
    </div >
  );
}

export default AppWithRedux;  