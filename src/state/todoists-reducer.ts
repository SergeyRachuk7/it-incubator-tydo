import { FilterValuesType, TodolistType } from '../AppWithRedux/AppWithRedux';
import { v1 } from "uuid"


 export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTotodlistActionType = {
    type: 'ADD-TODOLIST',
    title: string 
    todolistId: string
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
 
export  let todolistId1 = v1();
export  let todolistId2 = v1();


const initialState: Array<TodolistType>  = [ 
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
]

export const todoListsReducer = (state: Array<TodolistType> = initialState, action: ActionsType) : Array<TodolistType> => {
    switch(action.type) {
            case "REMOVE-TODOLIST": {
                return state.filter(tl => tl.id !== action.id)                       
            } 
            
         case "ADD-TODOLIST": {
                return [ {
                    id: action.todolistId, 
                    title: action.title,
                    filter: "all"
                }, ...state,]
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
            return state; 
    }
}  

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
      return {type: "REMOVE-TODOLIST", id: todolistId}  
}

export const addTodolistAC = (title: string): AddTotodlistActionType => {
      return {type: "ADD-TODOLIST", title, todolistId: v1()}  
} 

export const changeTodolistTitleAC = (id:string, title: string): ChangeTotodlistTitleActionType => {
      return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}  
}

export const сhangeTodolisFilterAC = (filter: FilterValuesType, todolistId: string,  ): ChangeTotodlistFilterActionType => {
      return {type: "CHANGE-TODOLIST-FILTER", filter: filter, id: todolistId}  
}