import { createSlice, nanoid } from "@reduxjs/toolkit";

const todoInitialState = {
    todos: [
        {
            id: nanoid(),
            description: "My Todo", 
            isFinished: false,
        },
    ],
}

const todoSlice = createSlice({
    name: "todos",
    initialState: todoInitialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                description: action.payload.description,
                isFinished: false,
            }
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => {
                return todo.id != action.payload.id;
            });
        },
        updateTodo: (state, action) => {
            const index = state.todos.findIndex((todo)=> {
                return todo.id === action.payload.id;
            });
            state.todos[index].description = action.payload.description;
        },
        toggleFinish: (state, action) => {
            const index = state.todos.findIndex((todo)=> {
                return todo.id == action.payload.id;
            });
            state.todos[index].isFinished = !state.todos[index].isFinished;
        },
    },
});

export const {addTodo, removeTodo, toggleFinish, updateTodo} = todoSlice.actions;
export default todoSlice.reducer;