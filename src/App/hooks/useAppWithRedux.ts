import { FilterValuesType } from './../../AppWithRedux/AppWithRedux'; 
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../../state/tasks-reducer';
import  { useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../../state/store';
import { TasksStateType, TodolistType } from '../../AppWithRedux/AppWithRedux';
import { addTodolistAC, changeTodolistTitleAC, removeTodolistAC, сhangeTodolisFilterAC } from '../../state/todoists-reducer';


export const useAppWithRedux = () => {    
  const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
  const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks);
  const dispatch = useDispatch();
  

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


  return {
    todolists,
    tasks, 
    addTodoList,    
    changeFilter,
    changeStatus,
    removeTask,
    addTask,
    removeTodoList,
    changeTaskTitle,
    changeTodoListTitle
  }
}