import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice";
import browseReducer from "./browseSlice";
import gptReducer from "./gptSlice";
export const store=configureStore({
    reducer:{
        user:userReducer,
        browse:browseReducer,
        gpt:gptReducer,
    }
});

export default store;