import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        user:[],
        lan:"en",
    },
    reducers:{
        addUser:(state,action)=>{
            state.user=action.payload;
        },
        removeUser:(state)=>{
            state.user=null;
        },
        addLanguage:(state,action)=>{
            state.lan=action.payload;
        }
    }
})
export const {addUser,removeUser,addLanguage}=userSlice.actions;
export default userSlice.reducer;