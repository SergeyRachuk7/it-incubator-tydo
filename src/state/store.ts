
import { createStore } from 'redux';
import { combineReducers } from "redux";
import { todoListsReducer } from './todoists-reducer';
import { tasksReducer } from './tasks-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer, 
    todolists: todoListsReducer
}); 

export const store = createStore(rootReducer); 
export type AppRootState = ReturnType<typeof rootReducer>

// @ts-expect-error
window.store = store;