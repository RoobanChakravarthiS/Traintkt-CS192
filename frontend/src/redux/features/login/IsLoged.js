import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    islogged: false
}
const isLoggedSlice = createSlice({
    name: 'islogged',
    initialState: initialState,
    reducers:{
        changeLoginStatus: (state,action) =>{
           state.islogged = action.payload
        }
    }
})

export const { changeLoginStatus }   = isLoggedSlice.actions 

export default isLoggedSlice.reducer; 
