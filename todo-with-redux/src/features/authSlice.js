import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
    user: {},
}

export const authSlice = createSlice({
    name: "auth",
    initialState: authInitialState,
    reducers: {
        logIn: (state, action) => {
            state.email = action.payload.email,
            state.password = action.payload.password,
            state.loggedIn = true
        },
        
        logOut: (state) => {
            state.loggedIn = false;
        },
    }
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer; 