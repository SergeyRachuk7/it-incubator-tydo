

import { v1 } from 'uuid';
import { TasksStateType } from '../AppWithRedux/AppWithRedux';
import { AddTotodlistActionType, RemoveTodoListActionType, todolistId1, todolistId2 } from './todoists-reducer';

export type RemoveTaskActionType = {  
    type: "REMOVE-TASK", 
    todolistId: string 
    taskId: string
} 

export type  AddTaskActionType = { 
    type: "ADD-TASK",
    title: string 
    todolistId: string   
} 

export type ChangeTaskStatusActionType = { 
    type: "CHANGE-TASK-STATUS",
    taskId: string 
    todolistId: string
    isDone: boolean   
} 

export type ChangeTaskTitleActionType = { 
    type: "CHANGE-TASK-TITLE",
    taskId: string 
    todolistId: string
    title: string   
} 




type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTotodlistActionType | RemoveTodoListActionType;

const initialState: TasksStateType = {
      [todolistId1]: [
      { id: v1(), title: "HTMLCSS", isDone: true },
      { id: v1(), title: "JS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk ", isDone: true },
      { id: v1(), title: "React Book", isDone: true },
    ]
}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {  
       case "REMOVE-TASK": { 
             const stateCopy = {...state};   
             const tasks = state[action.todolistId]; 
             const filteredTasks = tasks.filter(t => t.id !== action.taskId)
             stateCopy[action.todolistId] = filteredTasks;   
             return  stateCopy;
        }
       case "ADD-TASK": {    
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];  
            const newTask = {id: v1(), title: action.title, isDone: false }
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;        
            return  stateCopy    
        } 
       case "CHANGE-TASK-STATUS": {  
            let  todoListTasks = state[action.todolistId];
            state[action.todolistId] = todoListTasks
              .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t);                         
              return ({...state});         
        }   
       case "CHANGE-TASK-TITLE": {  
            let  todoListTasks = state[action.todolistId];
            state[action.todolistId] = todoListTasks
              .map(t => t.id === action.taskId ? {...t, title: action.title} : t); 
                return({...state})    
        }    
       case "ADD-TODOLIST" : { 
             return {
                ...state, 
                  [action.todolistId] : []  
             }    
             
        }   
       case "REMOVE-TODOLIST" : {
            const stateCopy = {...state};
            delete stateCopy[action.id]         
            return stateCopy;
       }                    
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string ): RemoveTaskActionType => {
    return { type: "REMOVE-TASK",  todolistId, taskId }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: "ADD-TASK", title, todolistId }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: "CHANGE-TASK-STATUS", isDone, todolistId, taskId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: "CHANGE-TASK-TITLE", title, todolistId, taskId}
}





