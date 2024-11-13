import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    name:"",
    id: "",
    email: ""
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateId: (state, action) => {
            state.id = action.payload;
        },
        updateUserName: (state, action) => {
            state.username = action.payload;
        },
        updateName: (state, action) => {
            state.name = action.payload;
        },
        updateEmail: (state, action) => {
            state.email = action.payload;
        }
    }
});

export const { updateId, updateName, updateEmail, updateUserName } = userSlice.actions;

export default userSlice.reducer;
