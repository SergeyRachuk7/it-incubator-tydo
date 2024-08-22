import { useState } from "react";
import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { todolistId1, todolistId2 } from "../id-utils";

export function useTasks() {
  let [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "HTMLCSS", isDone: true },
      { id: v1(), title: "JS", isDone: true }],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "Milk", isDone: true },]
  });


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

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    let todolistTasks = tasksObj[todolistId];
    let task = todolistTasks.find(t => t.id === id);

    if (task) {
      task.title = newTitle
      setTasks({ ...tasksObj });
    }
  }

  function completelyRemoveTasksForTodolist(id: string) {
    delete tasksObj[id];
    setTasks({ ...tasksObj })
  }

  function addStateForNewTodoList(newTodolistId: string) {
    setTasks({
      ...tasksObj,
      [newTodolistId]: []
    })
  }


  return {
    tasksObj,
    removeTask,
    addTask,
    changeStatus,
    changeTaskTitle,
    completelyRemoveTasksForTodolist,
    addStateForNewTodoList
  }
}
