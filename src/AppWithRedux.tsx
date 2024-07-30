
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
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolist)


  function changeFilter(value: FilterValuesType, todolistid: string) {
    const action = сhangeTodolisFilterAC(value, todolistid);
    dispatch(action);
  }

  function removeTodoList(id: string) {
    const action = removeTodolistAC(id);
    dispatch(action)
  }


  function changeTodoListTitle(id: string, title: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatch(action);
  }


  function addTodoList(title: string) {
    const action = addTodolistAC(title);
    dispatch(action);
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
              // let allTodolistTasks = tasks[tl.id];
              // let taskForTodolist = allTodolistTasks;
              // if (tl.filter === "active") {
              //   taskForTodolist = allTodolistTasks.filter(t => t.isDone === false);
              // }
              // if (tl.filter === "completed") {
              //   taskForTodolist = allTodolistTasks.filter(t => t.isDone === true);
              // }
              return <Grid item>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    // tasks={taskForTodolist}
                    // removeTask={removeTask}
                    changeFilter={changeFilter}
                    // addTask={addTask}
                    // changeTaskStatus={changeStatus}
                    // changeTaskTitle={changeTaskTitle}
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