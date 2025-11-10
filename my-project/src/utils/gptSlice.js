import { createSlice } from "@reduxjs/toolkit";

const gptSlice=createSlice(
    {
        name:"gpt",
        initialState:{
            gptResults:[],
        },
        reducers:{
            addGptResults:(state,actions)=>{
                state.gptResults=actions.payload;
            }
        }
    }
);

export const{addGptResults}=gptSlice.actions;
console.log(gptSlice);
export default gptSlice.reducer;