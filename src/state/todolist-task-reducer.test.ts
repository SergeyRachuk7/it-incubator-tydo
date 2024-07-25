import { tasksReducer } from './tasks-reducer';
import { addTodolistAC, todoListsReducer } from './todoists-reducer';
import { TasksStateType, TodolistType } from './../App';

test("ids should be equals", () => {
    const startTaskState : TasksStateType = {}  
    const startTodolistState: Array<TodolistType> = []

    const action = addTodolistAC('new todolist'); 
    const endTaskState = tasksReducer(startTaskState, action)
    const endTodolistState = todoListsReducer(startTodolistState, action)

    const keys = Object.keys(endTaskState); 
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistState[0].id; 

    expect(idFromTasks).toBe(action.todolistId); 
    expect(idFromTodolists).toBe(action.todolistId);  
});
