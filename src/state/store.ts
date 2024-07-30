import { createStore } from 'redux';
// import { store } from './store';
import { combineReducers, } from "redux"
import { todoListsReducer } from './todoists-reducer';
import { tasksReducer } from './tasks-reducer';

const rootReducer = combineReducers({
    todolist :todoListsReducer, 
    tasks: tasksReducer, 
}) 

 export type AppRootState = ReturnType<typeof rootReducer>
 
 export const store = createStore(rootReducer); 


// @ts-expect-error
window.store = store;