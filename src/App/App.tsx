
import { TaskType, Todolist } from '../Todolist';
import { AddItemForm } from '../AdditemForm/AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useTasks } from './hooks/useTasks';
import { useTodolists } from './hooks/useTodolists';
export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}



function App() {
  const {
    tasksObj,
    removeTask,
    addTask,
    changeStatus,
    changeTaskTitle,
    completelyRemoveTasksForTodolist,
    addStateForNewTodoList } = useTasks()

  let { todolists,
    changeFilter,
    removeTodoList,
    changeTodoListTitle,
    addTodoList
  } = useTodolists(completelyRemoveTasksForTodolist, addStateForNewTodoList)



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
                  < Todolist key={tl.id}
                    id={tl.id}
                    title={tl.title}
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


export default App;