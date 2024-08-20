import React from "react"
import { Provider } from "react-redux"
import { CombinedState, combineReducers, createStore } from "redux"
import { v1 } from "uuid"
import AppWithRedux from "../AppWithRedux"
import { AppRootState, store } from "../state/store"
import { tasksReducer } from "../state/tasks-reducer"
import { todoListsReducer } from "../state/todoists-reducer"


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoListsReducer
})

const initialGlobalState = {
  todolists: [
    { id: "todolistId1", title: "What to learn", filter: "all" },
    { id: "todolistId2", title: "What to buy", filter: "all" },
  ],
  tasks: {
    ["todolistId1"]: [
      { id: v1(), title: "HTMLCSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
    ],
    ["todolistId2"]: [
      { id: v1(), title: "Milk ", isDone: true },
      { id: v1(), title: "React Book", isDone: true },
    ]
  }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);


export const ReduxStoreProviderDecorator = (storyFn: any) => (
  <Provider store={storyBookStore}> {storyFn()}</Provider >)















// type TodolistType = {
//   id: string;
//   title: string;
//   filter: string;
// };

// type TaskType = {
//   id: string;
//   title: string;
//   isDone: boolean;
// };

// type TasksStateType = {
//   [key: string]: TaskType[];
// };

// type AppRootState = {
//   todolists: TodolistType[];
//   tasks: TasksStateType;
// };

// const rootReducer = combineReducers({
//   tasks: tasksReducer,
//   todolists: todoListsReducer
// })

// const initialGlobalState: AppRootState = {
//   todolists: [
//     { id: "todolistId1", title: "What to learn", filter: "all" },
//     { id: "todolistId2", title: "What to buy", filter: "all" },
//   ],
//   tasks: {
//     todolistId1: [
//       { id: "1", title: "HTMLCSS", isDone: true },
//       { id: "2", title: "JS", isDone: true },
//     ],
//     todolistId2: [
//       { id: "1", title: "Milk", isDone: true },
//       { id: "2", title: "React Book", isDone: true },
//     ],
//   },
// };

// export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);

// export const ReduxStoreProviderDecorator = (storyFn: any) => (
//   <Provider store={storyBookStore}>{storyFn()}</Provider>
// );











