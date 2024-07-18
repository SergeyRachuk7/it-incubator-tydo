import { FilterValuesType } from './../App';
import { title } from "process"
import { v1 } from "uuid"
import { TodolistType } from "../App"

// type ActionType = { 
//     type: string
//     [key: string]: any
// } 

 export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTotodlistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTotodlistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}
export type ChangeTotodlistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodoListActionType | AddTotodlistActionType | ChangeTotodlistTitleActionType | ChangeTotodlistFilterActionType
 
export const todoListsReducer = (state: Array<TodolistType>, action: ActionsType) : Array<TodolistType>=> {
    switch(action.type) {
            case "REMOVE-TODOLIST": {
                return state.filter(tl => tl.id != action.id)                       
            }    
            case "ADD-TODOLIST": {
                return [...state, {
                    id: v1(), 
                    title: action.title,
                    filter: "all"
                }]
            } 

            case "CHANGE-TODOLIST-TITLE": { 
                    const todolist = state.find(tl => tl.id === action.id)
                    if (todolist) {
                    todolist.title = action.title;                 
      }     
           return [...state]                                       
   }    
    
            case "CHANGE-TODOLIST-FILTER": { 
                    const todolist = state.find(tl => tl.id === action.id)
                    if (todolist) {
                    todolist.filter = action.filter;
    } 
         return [...state]                                       
  }
                  
        default:    
            throw new Error("I don't understend this action type") 
    }
}  

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
      return {type: "REMOVE-TODOLIST", id: todolistId}  
}

export const AddTodolistAC = (title: string): AddTotodlistActionType => {
      return {type: "ADD-TODOLIST", title: title}  
} 

export const ChangeTodolistTitleAC = (id:string, title: string): ChangeTotodlistTitleActionType => {
      return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}  
}


export const ChangeTodolisFilterAC = (id: string, filter: FilterValuesType): ChangeTotodlistFilterActionType => {
      return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}  
}
