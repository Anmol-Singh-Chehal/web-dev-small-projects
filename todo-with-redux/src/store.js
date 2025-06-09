import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import updateReducer from "./features/updateSlice";
import todoReducer from "./features/todoSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        updateProfile: updateReducer,
        todos: todoReducer,
    },
});

export default store;